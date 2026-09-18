import "server-only";
import { revalidateTag, revalidatePath } from "next/cache";
import { apiFetch, ApiError } from "./../api";

/** Wraps an API call so server actions always return a serialisable result. */
export async function run(fn, { tags = [], paths = [] } = {}) {
  try {
    const res = await fn();
    tags.forEach((t) => revalidateTag(t));
    paths.forEach((p) => revalidatePath(p));
    return { ok: true, message: res?.message || "Done", data: res?.data ?? null };
  } catch (err) {
    if (err instanceof ApiError) return { ok: false, message: err.message, status: err.status };
    return { ok: false, message: "Could not reach the server. Please try again." };
  }
}

export const authed = (path, init = {}) => apiFetch(path, { auth: true, timeout: 60000, ...init });

/** FormData → plain object, keeping only string fields. */
export const fields = (fd, keys) =>
  Object.fromEntries(keys.filter((k) => fd.has(k)).map((k) => [k, fd.get(k)]));
