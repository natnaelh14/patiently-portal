import { get, post } from "~/adapters/http";
import { z } from "zod";

import { registrationSession } from "~/schemas/account";
import type { CreateAccountFormSchema } from "~/schemas/forms/createAccount";
import type { SignInFormSchema } from "~/schemas/forms/login";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export function signIn(body: SignInFormSchema) {
  return post(`${baseUrl}/auth/user/login`, z.object({ authToken: z.string() }), { body });
}

export function createAccount(body: CreateAccountFormSchema, sessionId: string) {
  return post(`${baseUrl}/auth/user/signup?sessionId=${sessionId}`, z.object({ authToken: z.string() }), { body });
}

export function getRegistrationSession(sessionId: string) {
  return get(`${baseUrl}/user/registrationSession/${sessionId}`, registrationSession);
}
