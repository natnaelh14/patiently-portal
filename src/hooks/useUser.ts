import { fetcher } from "~/adapters/fetcher";
import useSWR from "swr";

import type { User } from "~/schemas/user";

export function useUser() {
  const {
    data: user,
    mutate: mutateUser,
    ...rest
  } = useSWR<User, Error & { status?: number }>(
    [`${process.env.NEXT_PUBLIC_DOMAIN}/session`],
    ([url]: [url: string]) => fetcher<User>(url),
    {
      revalidateOnFocus: false,
    }
  );

  return { user, mutateUser, ...rest };
}
