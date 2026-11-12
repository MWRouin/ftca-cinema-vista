/**
 * Public base path of the deployed site: "/" on the custom domain. Set
 * `NEXT_PUBLIC_BASE_PATH` (and `basePath` in next.config.mjs) only if the site
 * is ever served from a sub-path.
 */
const raw: string = process.env.NEXT_PUBLIC_BASE_PATH ?? "/";

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
