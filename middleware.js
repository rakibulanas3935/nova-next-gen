import { NextResponse } from "next/server";
import { jwtVerify } from "jose/jwt/verify";

const TOKEN_COOKIE = "ds_token";
const secret = () => new TextEncoder().encode(process.env.JWT_SECRET || "");

async function readSession(req) {
  const token = req.cookies.get(TOKEN_COOKIE)?.value;
  if (!token || !process.env.JWT_SECRET) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload; // { id, role, iat, exp }
  } catch {
    return null;
  }
}

export async function middleware(req) {
  const { pathname, search } = req.nextUrl;
  const session = await readSession(req);

  const wantsAdmin = pathname.startsWith("/dashboard");
  const wantsMember = pathname.startsWith("/members");
  const isAuthPage = pathname === "/login" || pathname === "/join";

  if ((wantsAdmin || wantsMember) && !session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    const res = NextResponse.redirect(url);
    // A stale/invalid cookie should not keep bouncing the user around.
    res.cookies.set(TOKEN_COOKIE, "", { maxAge: 0, path: "/" });
    return res;
  }

  if (wantsAdmin && session.role !== "admin") {
    return NextResponse.redirect(new URL("/members", req.url));
  }

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL(session.role === "admin" ? "/dashboard" : "/members", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/members/:path*", "/login", "/join"],
};
