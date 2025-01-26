declare const VERSION: string;
declare const BRANCH: string;
declare const COMMITHASH: string;
declare const LASTCOMMITDATETIME: string;

/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    IRON_SESSION_COOKIE_TOKEN: string;
    NEXT_PUBLIC_DOMAIN: string;
    NEXT_PUBLIC_ENVIRONMENT: "development" | "staging" | "production";
    NEXT_PUBLIC_API_URL: string;
  }
}
