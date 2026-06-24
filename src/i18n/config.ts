/**
 * i18n configuration — framework-agnostic locale primitives.
 *
 * Kept free of React/i18next imports so it can be reused by helpers, the
 * router, and (later) the build scripts.
 *
 * Scope today: English (default) + French, LTR only. Arabic + RTL are planned
 * but intentionally out of scope here — see I18N_PLAN.md. The shape below is
 * extensible: adding 'ar' is a matter of extending SUPPORTED_LOCALES and
 * RTL_LOCALES and supplying catalogs.
 */

export const SUPPORTED_LOCALES = ["en", "fr"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Fallback locale: used when "/" is visited and the browser language is
 * unsupported (or no preference is stored). Every locale — including this one —
 * is URL-prefixed (`/en`, `/fr`); "/" itself only redirects.
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

/** The locale encoded in a pathname's first segment (default if none). */
export function localeFromPath(pathname: string): Locale {
  const first = pathname.replace(/^\/+/, "").split("/")[0];
  return isLocale(first) ? first : DEFAULT_LOCALE;
}

/**
 * Prefix a locale-neutral path with its locale segment. Every locale is
 * prefixed (including the default).
 *
 * ("/movies", "fr") -> "/fr/movies" · ("/", "en") -> "/en"
 */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/**
 * Resolve the locale to use when no locale is present in the URL (i.e. on "/").
 * Priority: explicit stored choice → browser language → default fallback.
 */
export function detectPreferredLocale(): Locale {
  if (typeof window !== "undefined") {
    try {
      const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (isLocale(stored ?? undefined)) return stored as Locale;
    } catch {
      /* storage unavailable */
    }

    const candidates =
      navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language];

    for (const lang of candidates) {
      const base = lang?.toLowerCase().split(/[-_]/)[0];
      if (isLocale(base)) return base as Locale;
    }
  }

  return DEFAULT_LOCALE;
}
