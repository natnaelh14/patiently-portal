import { z } from "zod";
import { fromZodError } from "zod-validation-error";

import type { DeleteInit, GetInit, PostInit, PutInit, ValidatedHttpResponse } from "~/types/http.types";
import { deleteConfig, getConfig, postConfig, putConfig } from "~/utils/config";

export class APIError {
  constructor(public message: string) {}
}
const TIMEOUT = 30_000;

const nodeEnv = process.env.NODE_ENV;

async function _validatedHttp<T extends z.ZodTypeAny>(
  path: string,
  config: RequestInit,
  responseSchema: T
): Promise<ValidatedHttpResponse<T>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const request = new Request(path, { ...config, signal: controller.signal });
    const response = await fetch(request);
    clearTimeout(timeout);

    // Handle non-200 responses
    if (!response.ok) {
      const res = (await response.json().catch(() => ({}))) as { error: APIError; status?: number } | APIError;

      if (nodeEnv !== "production") {
        console.error({
          url: response.url,
          status: response.status,
          message: response.statusText,
          response: res,
        });
      }
      if ("message" in res) {
        return { success: false, error: res };
      }
      return { success: false, status: response.status, error: res.error };
    }

    const json = (await response.json().catch(() => ({}))) as z.infer<T>;
    const data = ("data" in json ? json.data : json) as z.infer<T>;
    // Some endpoints return metadata outside the data object
    if ("metadata" in json) {
      data.metadata = json.metadata as Record<string, unknown>;
    }

    // Local dev behavior - throw an error on validation failure
    if (nodeEnv !== "production") {
      const result = responseSchema.parse(data) as z.infer<T>;
      return { success: true, data: result };
    }

    // Deployed behavior - log validation failure and return json
    const result = responseSchema.safeParse(data);
    if (!result.success) {
      console.error(fromZodError(result.error).toString());
    }
    const validationMessage = !result.success ? fromZodError(result.error).toString() : undefined;
    return {
      success: true,
      data,
      validationMessage,
    };
  } catch (error) {
    clearTimeout(timeout);
    if (error instanceof z.ZodError) {
      const message = fromZodError(error).toString();
      if (nodeEnv !== "production") {
        console.error(message);
      }
      return {
        success: false,
        error: new Error(message, { cause: error.issues }),
      };
    }

    if (nodeEnv !== "production") console.error(error);

    if (error instanceof APIError) {
      return { success: false, error };
    }

    if (error instanceof Error && error.name === "AbortError") {
      return { success: false, error: new Error("Request timed out") };
    }

    // Handle other errors
    return {
      success: false,
      error: new Error(error instanceof Error ? error.message : "Unknown error"),
    };
  }
}

// ✅ Configurations for different HTTP methods with runtime safety
export function post<T extends z.ZodTypeAny>(path: string, responseSchema: T, requestConfig?: PostInit) {
  return _validatedHttp<T>(
    path,
    {
      ...postConfig,
      ...requestConfig,
      headers: { ...postConfig.headers, ...requestConfig?.headers },
      body: JSON.stringify(requestConfig?.body),
    },
    responseSchema
  );
}

export function deleteRequest<T extends z.ZodTypeAny>(path: string, responseSchema: T, requestConfig?: DeleteInit) {
  return _validatedHttp<T>(
    path,
    {
      ...deleteConfig,
      ...requestConfig,
      headers: { ...deleteConfig.headers, ...requestConfig?.headers },
    },
    responseSchema
  );
}

export function put<T extends z.ZodTypeAny>(path: string, responseSchema: T, requestConfig?: PutInit) {
  return _validatedHttp<T>(
    path,
    {
      ...putConfig,
      ...requestConfig,
      headers: { ...putConfig.headers, ...requestConfig?.headers },
      body: JSON.stringify(requestConfig?.body),
    },
    responseSchema
  );
}

export function get<T extends z.ZodTypeAny>(path: string, responseSchema: T, requestConfig?: GetInit) {
  return _validatedHttp<T>(
    path,
    {
      ...getConfig,
      ...requestConfig,
      headers: { ...getConfig.headers, ...requestConfig?.headers },
    },
    responseSchema
  );
}
