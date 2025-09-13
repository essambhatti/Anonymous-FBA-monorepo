import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// ✅ Export the default NextAuth middleware
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // ✅ Redirect logged-in users away from auth pages
  if (
    token &&
    (url.pathname === "/sign-in" ||
      url.pathname === "/sign-up" ||
      url.pathname.startsWith("/verify"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ✅ Redirect not-logged-in users trying to access /dashboard
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/dashboard/:path*",
    "/verify/:path*"
  ],
};
