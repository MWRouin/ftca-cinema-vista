/**
 * Public base path of the deployed site ("/" on the custom domain), shared by
 * the Vite app, the Next.js app and build scripts. Vite exposes it as
 * `import.meta.env.BASE_URL`; Next reads `NEXT_PUBLIC_BASE_PATH`. Under plain
 * Node (tsx scripts) neither exists and it falls back to "/".
 */
const raw: string =
  (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL ??
  (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_BASE_PATH : undefined) ??
  "/";

/** Always starts and ends with "/". */
export const BASE_URL: string = `/${raw.replace(/^\/+|\/+$/g, "")}/`.replace(/^\/\/$/, "/");

/** URL of a file in `public/`, e.g. publicUrl("Members/user.png"). */
export const publicUrl = (path: string): string => BASE_URL + path.replace(/^\/+/, "");

/** Resolve the `__BASE_URL__/…` placeholder used for asset paths in the JSON data. */
export function resolveAssetUrl(url: string): string;
export function resolveAssetUrl(url: string | undefined): string | undefined;
export function resolveAssetUrl(url: string | undefined): string | undefined {
  if (!url || !url.startsWith("__BASE_URL__/")) return url;
  return publicUrl(url.slice("__BASE_URL__/".length));
}
