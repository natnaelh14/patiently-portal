import { z } from "zod";

import { post } from "../http";

const createTenantForm = z.object({
  name: z.string(),
  streetAddress: z.string(),
  city: z.string(),
  country: z.string(),
  zipcode: z.string(),
  pictureUrl: z.string(),
});
export type CreateTenantForm = z.infer<typeof createTenantForm>;

export function createTenant(token: string) {
  const newBody = {
    name: "Tony Nate Doctors Group",
    streetAddress: "111 main Street",
    city: "Atlanta",
    country: "USA",
    zipcode: "30034",
    pictureUrl: "",
  };
  return post(`${process.env.NEXT_PUBLIC_API_URL}/tenant/register`, z.object({ authToken: z.string() }), {
    body: newBody,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
