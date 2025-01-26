import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { dashboardRoutes } from "~/constants";
import { getIronSession } from "iron-session";

import { sessionOptions } from "~/utils/session";
import type { User } from "~/schemas/user";

export async function getSession() {
  const session = await getIronSession<User>(cookies(), sessionOptions);

  return session;
}

export async function handleLoggedInUserRedirect() {
  const session = await getSession();

  if (session.isLoggedIn) {
    const redirectPath = dashboardRoutes[session.userType];
    redirect(redirectPath);
  }
}
