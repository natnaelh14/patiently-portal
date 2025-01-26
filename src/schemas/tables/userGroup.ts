import { z } from "zod";

export const employeeStatus = z.enum(["Active", "Inactive"]);
export type EmployeeStatus = z.infer<typeof employeeStatus>;

export const employeeRole = z.enum(["Physician", "Nurse", "Secretary", "Manager"]);
export type EmployeeRole = z.infer<typeof employeeRole>;

export const userGroupTableSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  status: employeeStatus,
  role: employeeRole,
});

export type UserGroupTableSchema = z.infer<typeof userGroupTableSchema>;

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  name: z.string().optional(),
  title: z.string().optional(),
  status: z.string().optional(),
  role: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
});

export const getTasksSchema = searchParamsSchema;

export type GetTasksSchema = z.infer<typeof getTasksSchema>;
