/**
 * i18n configuration — framework-agnostic locale primitives.
 *
 * Kept free of React/i18next imports so server code and client components can
 * both use it.
 *
 * Scope today: English (default) + French, LTR only. The shape is extensible:
 * adding 'ar' is a matter of extending SUPPORTED_LOCALES and RTL_LOCALES and
 * supplying catalogs.
 */

export const SUPPORTED_LOCALES = ["en", "fr"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Fallback locale: used when "/" is visited and the browser language is
 * unsupported (or no preference is stored). Every locale — including this one —
 * is URL-prefixed (`/en`, `/fr`); "/" itself only redirects (see
 * `src/lib/locale-redirect.ts`).
 */
export const DEFAULT_LOCALE: Locale = "en";

/** localStorage key holding the user's last explicit locale choice. */
export const LOCALE_STORAGE_KEY = "ftca.locale";

/** Locales that render right-to-left. Empty for now (ar will go here). */
export const RTL_LOCALES: readonly Locale[] = [];

export function isLocale(value: string | undefined): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value ?? "");
}

export function dirForLocale(locale: Locale): "ltr" | "rtl" {
  return RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
}

/** og:locale value for a given UI locale. */
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
};

/**
 * Remove a leading locale segment (any supported locale) from a pathname,
 * returning the locale-neutral path.
 *
 * "/fr/movies" -> "/movies" · "/en" -> "/" · "/movies" -> "/movies"
 */
export function stripLocale(pathname: string): string {
  const segments = pathname.replace(/^\/+/, "").split("/");
  const first = segments[0];

  if (isLocale(first)) {
    const rest = "/" + segments.slice(1).join("/");
    return rest === "/" ? "/" : rest.replace(/\/+$/, "");
  }

  return pathname;
}

/**
 * Prefix a locale-neutral path with its locale segment, ending in a trailing
 * slash. Every locale is prefixed (including the default). The trailing slash
 * matches the canonical URLs and GitHub Pages' served form (Pages 301-redirects
 * the no-slash version), so in-app navigation and hard loads land on the same
 * URL.
 *
 * ("/movies", "fr") -> "/fr/movies/" · ("/", "en") -> "/en/"
 */
export function localizePath(path: string, locale: Locale): string {
  const neutral = path.replace(/^\/+/, "").replace(/\/+$/, "");
  return neutral ? `/${locale}/${neutral}/` : `/${locale}/`;
}
