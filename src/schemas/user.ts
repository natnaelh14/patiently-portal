import { z } from "zod";

export const userType = z.enum(["PATIENT", "STAFF", "INTERNAL"]);
export type UserType = z.infer<typeof userType>;

const LoggedInUser = z.object({
  isLoggedIn: z.literal(true),
  userType,
  token: z.string(),
});

export type LoggedInUser = z.infer<typeof LoggedInUser>;

const LoggedOutUser = z.object({
  isLoggedIn: z.literal(false),
});

export const User = z.discriminatedUnion("isLoggedIn", [LoggedInUser, LoggedOutUser]);
export type User = z.infer<typeof User>;
