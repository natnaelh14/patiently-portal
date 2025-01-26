import { z } from "zod";

export const staffCreateAccountFormSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
    })
    .min(1, "First name is required"),
  lastName: z
    .string({
      required_error: "Last name is required",
    })
    .min(1, "Last name is required"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phoneNumber: z.string({ required_error: "Phone number is required" }).regex(/^\(\d{3}\) \d{3}-\d{4}$/, {
    message: "Please enter a valid 10 digit phone number.",
  }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "You need to select a gender.",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(10, "Password must be at least 10 characters"),
  confirmPassword: z
    .string({
      required_error: "Confirm password is required",
    })
    .min(1, "Confirm password is required"),
  userType: z.literal("STAFF"),
  roleId: z.string(),
});
export type StaffCreateAccountFormSchema = z.infer<typeof staffCreateAccountFormSchema>;

export const patientCreateAccountFormSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
    })
    .min(1, "First name is required"),
  lastName: z
    .string({
      required_error: "Last name is required",
    })
    .min(1, "Last name is required"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phoneNumber: z.string({ required_error: "Phone is required" }).regex(/^\(\d{3}\) \d{3}-\d{4}$/, {
    message: "Please enter a valid 10 digit phone number.",
  }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "You need to select a gender.",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(10, "Password must be at least 10 characters"),
  confirmPassword: z
    .string({
      required_error: "Confirm password is required",
    })
    .min(1, "Confirm password is required"),
  treatmentConsent: z.boolean().default(false).optional(),
  disclosureConsent: z.boolean().default(false).optional(),
  privacyConsent: z.boolean().default(false).optional(),
  userType: z.literal("PATIENT"),
});
export type PatientCreateAccountFormSchema = z.infer<typeof patientCreateAccountFormSchema>;

export const createAccountFormSchema = z.discriminatedUnion("userType", [
  staffCreateAccountFormSchema,
  patientCreateAccountFormSchema,
]);
export type CreateAccountFormSchema = z.infer<typeof createAccountFormSchema>;
