import type { RequestInit } from "next/dist/server/web/spec-extension/request";
import type { z } from "zod";

export class APIError {
  constructor(public message: string) {}
}

type PropsWeControl = "method" | "body";
type OurRequestInit = Omit<RequestInit, PropsWeControl>;

export type GetInit = Omit<OurRequestInit, "body" | PropsWeControl>;
export type DeleteInit = GetInit;
export interface PutInit extends Omit<RequestInit, PropsWeControl> {
  body: Record<string, unknown> | any[];
}
export interface PostInit extends Omit<RequestInit, PropsWeControl> {
  body: Record<string, unknown> | any[];
}

type _HttpResponse<T> = { success: true; data: T } | { success: false; error: APIError };
export type HttpResponse<T> = Promise<_HttpResponse<T>>;

type _ValidatedHttpResponse<T extends z.ZodTypeAny> =
  | { success: true; data: z.infer<T>; validationMessage?: string }
  | { success: false; status?: number; error: APIError };
export type ValidatedHttpResponse<T extends z.ZodTypeAny> = Promise<_ValidatedHttpResponse<T>>;
