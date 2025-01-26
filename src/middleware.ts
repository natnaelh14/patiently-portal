import { NextResponse, type NextRequest } from "next/server";
import { dashboardRoutes } from "~/constants";

import { getSession } from "~/utils/auth";

const protectedRoutes = ["/internal", "/patient", "/staff"];

export async function middleware(req: NextRequest) {
  const session = await getSession();
  const { pathname } = req.nextUrl;

  // Check if route is protected and the user is not logged in
  if (!session.isLoggedIn && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (session.isLoggedIn) {
    const { userType } = session;
    const dashboardPath = dashboardRoutes[userType];

    // Redirect user to their dashboard if accessing incorrect protected route
    if (
      (pathname.startsWith("/internal") && userType !== "INTERNAL") ||
      (pathname.startsWith("/patient") && userType !== "PATIENT") ||
      (pathname.startsWith("/staff") && userType !== "STAFF")
    ) {
      return NextResponse.redirect(new URL(dashboardPath, req.url));
    }
  }

  // If no redirects, continue to the next middleware or request handler
  return NextResponse.next();
}

// Matcher to apply middleware to protected routes
export const config = {
  matcher: ["/internal/:path*", "/patient/:path*", "/staff/:path*"],
};
