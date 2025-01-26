import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { defaultSession } from "~/utils/session";
import type { User } from "~/schemas/user";

const sessionApiRoute = "/session";
const url = `${process.env.NEXT_PUBLIC_DOMAIN}${sessionApiRoute}`;

async function fetchJson<JSON = unknown>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return fetch(input, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    ...init,
  }).then((res) => res.json());
}

export function doLogin(token: string) {
  return fetchJson<User>(url, {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

export function doLogout(url: string) {
  return fetchJson<User>(url, {
    method: "DELETE",
  });
}

function doIncrement(url: string) {
  return fetchJson<User>(url, {
    method: "PATCH",
  });
}

export default function useSession() {
  const { data: session, isLoading } = useSWR(sessionApiRoute, fetchJson<User>, {
    fallbackData: defaultSession,
  });

  const { trigger: login } = useSWRMutation(sessionApiRoute, doLogin, {
    // the login route already provides the updated information, no need to revalidate
    revalidate: false,
  });
  const { trigger: logout } = useSWRMutation(sessionApiRoute, doLogout);
  const { trigger: increment } = useSWRMutation(sessionApiRoute, doIncrement);

  return { session, logout, login, increment, isLoading };
}
