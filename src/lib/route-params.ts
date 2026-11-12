/**
 * Next.js hands dynamic route params over percent-encoded when they contain
 * non-ASCII characters (movie ids like "l-araignée" or "ذاكرة-رهينة"). Decode
 * them before looking anything up in the data layer.
 */
export function decodeParam(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
