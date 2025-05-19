import { env } from "$env/dynamic/public";
import { version as envVersion } from "$app/environment";

export const isDev = env.PUBLIC_NODE_ENV === "development";
export const defaultHost = env.PUBLIC_DEFAULT_HOST ?? "localhost";
export const apiBaseUrl = env.PUBLIC_API_BASE_URL ?? (isDev ? "http://localhost:5191" : "http://localhost:5191");
export const fallbackReturnUrl = env.PUBLIC_FALLBACK_RETURN_URL ?? "http://localhost:5173";
export const withCredentials = true;
export const version = envVersion ?? "0.0.0";


console.log("isDev", isDev);
console.log("apiBaseUrl", apiBaseUrl);
console.log("withCredentials", withCredentials);
console.log("version", version);
