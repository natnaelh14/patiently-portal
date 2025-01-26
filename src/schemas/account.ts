import { z } from "zod";

import { userType } from "~/schemas/user";

export const registrationSession = z.object({
  id: z.string(),
  userType: userType,
  roleId: z.string(),
  tenant: z.object({
    id: z.string(),
    name: z.string(),
    streetAddress: z.string(),
    city: z.string(),
    // state: z.string(),
    country: z.string(),
    zipcode: z.string(),
    pictureUrl: z.string().optional(),
  }),
});
export type RegistrationSession = z.infer<typeof registrationSession>;

export const account = z.object({
  id: z.string(),
});
export type Account = z.infer<typeof account>;
