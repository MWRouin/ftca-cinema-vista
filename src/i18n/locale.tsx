import { createContext, useContext, useLayoutEffect, type ReactNode } from "react";
import { Link, Navigate, useLocation, type LinkProps } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  DEFAULT_LOCALE,
  detectPreferredLocale,
  dirForLocale,
  localizePath,
  type Locale,
} from "./config";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

/** Current active locale (from the route). */
export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/**
 * Establishes the active locale for a routing subtree: syncs i18next, the
 * `<html lang/dir>` attributes, and exposes the locale via context. Rendered
 * once per locale branch in the router.
 */
export function LocaleScope({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const { i18n } = useTranslation();

  // useLayoutEffect so the language is committed before the browser paints,
  // avoiding a flash of the previous locale on client-side navigation.
  useLayoutEffect(() => {
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
    document.documentElement.lang = locale;
    document.documentElement.dir = dirForLocale(locale);
  }, [i18n, locale]);

  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/**
 * Drop-in replacement for react-router's <Link> that automatically prefixes
 * the active locale. Pass locale-neutral paths (e.g. "/movies"); the current
 * locale prefix is added (default locale stays un-prefixed).
 */
export function LocalLink({ to, ...rest }: Omit<LinkProps, "to"> & { to: string }) {
  const locale = useLocale();
  return <Link to={localizePath(to, locale)} {...rest} />;
}

/**
 * Renders for any URL without a locale prefix (e.g. "/" or a legacy
 * "/movies" deep link) and redirects to the locale-prefixed equivalent,
 * choosing the locale from stored preference → browser language → default.
 * The rest of the path, query string, and hash are preserved.
 */
export function LocaleRedirect() {
  const location = useLocation();
  const target = detectPreferredLocale();
  // pathname carries no locale prefix here; localizePath adds the prefix and a
  // trailing slash so we redirect straight to the canonical (non-redirecting) form.
  return (
    <Navigate
      to={localizePath(location.pathname, target) + location.search + location.hash}
      replace
    />
  );
}
