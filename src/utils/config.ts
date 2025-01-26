export const APP_VERSION = "1.12.0";
export const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const INACTIVE_TIMEOUT = 1000 * 60 * 10; // 10 minutes

export const getConfig: RequestInit = {
  method: "GET",
  cache: "no-store",
  headers: {
    Accept: "application/json, text/html, */*",
  },
};

export const postConfig = {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
};

export const putConfig = {
  method: "PUT",
  headers: {
    "Content-type": "application/json",
  },
};

export const deleteConfig = {
  method: "DELETE",
  headers: {
    "Content-type": "application/json",
  },
};
