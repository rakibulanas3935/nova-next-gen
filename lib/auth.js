import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiFetch, TOKEN_COOKIE } from "./api";

const COOKIE_DAYS = 7;

export function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_DAYS * 24 * 60 * 60,
  };
}

export async function setSessionCookie(token) {
  const store = await cookies();
  store.set(TOKEN_COOKIE, token, cookieOptions());
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.set(TOKEN_COOKIE, "", { ...cookieOptions(), maxAge: 0 });
}

/** Current user or null. Cached per request so layouts + pages share one call. */
export const getCurrentUser = cache(async () => {
  const store = await cookies();
  if (!store.get(TOKEN_COOKIE)?.value) return null;
  try {
    const res = await apiFetch("/users/me", { auth: true, timeout: 10000 });
    return res?.data?.user || null;
  } catch {
    return null;
  }
});

/** Redirects to /login (with return path) unless a user is signed in. */
export async function requireUser(nextPath = "/members") {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  return user;
}

export async function requireAdmin() {
  const user = await requireUser("/dashboard");
  if (user.role !== "admin" || user.status !== "approved") redirect("/members");
  return user;
}
