import { z } from "zod";

export const createTenantFormSchema = z.object({
  tenantName: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name is required"),
  adminFirstName: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name is required"),
  adminLastName: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name is required"),
  adminEmail: z
    .string({
      required_error: "Tenant Email is required",
    })
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  adminPhoneNumber: z.string({ required_error: "Tenant Phone is required" }).regex(/^\(\d{3}\) \d{3}-\d{4}$/, {
    message: "Please enter a valid 10 digit phone number.",
  }),
});

export type CreateTenantFormSchema = z.infer<typeof createTenantFormSchema>;
