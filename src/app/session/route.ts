import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session";

import { defaultSession, sessionOptions, sleep } from "~/utils/session";
import type { LoggedInUser, User } from "~/schemas/user";

// login
export async function POST(request: NextRequest) {
  const session = await getIronSession<LoggedInUser>(cookies(), sessionOptions);
  const { token } = (await request.json()) as {
    token: string;
  };

  session.isLoggedIn = true;
  session.token = token;
  session.userType = "STAFF";
  await session.save();

  return Response.json(session);
}

export async function PATCH() {
  const session = await getIronSession<User>(cookies(), sessionOptions);

  session.updateConfig({
    ...sessionOptions,
    cookieOptions: {
      ...sessionOptions.cookieOptions,
      expires: new Date("2024-12-27T00:00:00.000Z"),
      maxAge: undefined,
    },
  });
  await session.save();

  return Response.json(session);
}

// read session
export async function GET() {
  const session = await getIronSession<User>(cookies(), sessionOptions);

  // simulate looking up the user in db
  await sleep(250);

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession);
  }

  return Response.json(session);
}

// logout
export async function DELETE() {
  const session = await getIronSession<User>(cookies(), sessionOptions);

  session.destroy();

  return Response.json(defaultSession);
}
