import "server-only";
import { NextResponse } from "next/server";
import { apiFetch, ApiError } from "@/lib/api";
import { setSessionCookie } from "@/lib/auth";

// Forwards a JSON body to an Express auth endpoint. When the API returns a
// token we store it in an httpOnly cookie so the browser never sees it.
export async function proxyAuth(req, path, { storeToken = false } = {}) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ status: "fail", message: "Invalid request" }, { status: 400 });
  }
  try {
    const res = await apiFetch(path, { method: "POST", body: JSON.stringify(body), timeout: 45000 });
    if (storeToken && res?.token) await setSessionCookie(res.token);
    return NextResponse.json({ status: "success", message: res?.message, data: res?.data });
  } catch (err) {
    const status = err instanceof ApiError ? err.status : 502;
    const message = err instanceof ApiError ? err.message : "The server is waking up — please try again in a moment.";
    return NextResponse.json({ status: "fail", message }, { status });
  }
}
