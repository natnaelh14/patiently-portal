import { get } from "~/adapters/http";

import { account } from "~/schemas/account";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export function getAccount(token: string) {
  return get(`${baseUrl}/user/account-details`, account, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
