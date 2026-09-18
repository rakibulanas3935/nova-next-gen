import { proxyAuth } from "../_proxy";
export const POST = (req) => proxyAuth(req, "/users/login", { storeToken: true });
