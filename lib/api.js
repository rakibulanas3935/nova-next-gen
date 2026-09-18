import "server-only";
import { cookies } from "next/headers";

export const API_URL = (process.env.API_URL || "http://localhost:3000/api/v1").replace(/\/$/, "");
export const TOKEN_COOKIE = "ds_token";

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

async function readToken() {
  try {
    const store = await cookies();
    return store.get(TOKEN_COOKIE)?.value || null;
  } catch {
    return null;
  }
}

/**
 * Server-side fetch against the Express API.
 *
 * - Public reads are cached with ISR (`revalidate` seconds, tag-based
 *   invalidation) so a cold Render dyno never blocks a page that was
 *   rendered once.
 * - `auth: true` forwards the session cookie as a Bearer token and disables
 *   caching.
 * - Throws ApiError on non-2xx; use `apiGet` when a null result is acceptable.
 */
export async function apiFetch(path, { auth = false, revalidate = 120, tags = [], timeout = 15000, ...init } = {}) {
  const headers = new Headers(init.headers || {});
  if (!(init.body instanceof FormData) && !headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  if (auth) {
    const token = await readToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    signal: AbortSignal.timeout(timeout),
    ...(auth || init.method && init.method !== "GET"
      ? { cache: "no-store" }
      : { next: { revalidate, tags } }),
  });

  if (res.status === 204) return null;
  const text = await res.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = { message: text };
  }
  if (!res.ok) {
    throw new ApiError(body?.message || `Request failed (${res.status})`, res.status, body);
  }
  return body;
}

/** Like apiFetch but resolves to `null` instead of throwing — for pages that
 *  should still render (with cached/static fallback) when the API is down. */
export async function apiGet(path, opts) {
  try {
    return await apiFetch(path, opts);
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.warn(`[api] ${path}: ${err.message}`);
    return null;
  }
}
