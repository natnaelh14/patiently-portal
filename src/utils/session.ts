import type { SessionOptions } from "iron-session";

import type { User } from "~/schemas/user";

export const defaultSession: User = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_COOKIE_TOKEN,
  cookieName: "my-patiently-app",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
