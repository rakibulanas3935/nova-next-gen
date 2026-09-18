import { proxyAuth } from "../_proxy";
export const POST = (req) => proxyAuth(req, "/users/forgot-password");
