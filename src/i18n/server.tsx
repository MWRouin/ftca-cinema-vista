import type { ReactNode } from "react";

import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isLocale } from "./config";
import { I18nProvider, I18nProviderForParentLocale, type BundlesByLocale } from "./provider";
import { pickBundles, type Namespace } from "./resources";

/**
 * Server component: hands its client subtree the namespaces it uses, in the
 * route's locale only. The catalogs travel in the page's server payload, so
 * a page downloads just its own text, never the other language's or other
 * pages'. List every namespace the subtree's components use (`useTranslation`
 * and `{ ns }` lookups); in development a missing one is logged.
 */
export function Translations({
  locale,
  ns,
  children,
}: {
  locale: string;
  ns: readonly Namespace[];
  children: ReactNode;
}) {
  const lang = isLocale(locale) ? locale : DEFAULT_LOCALE;
  return (
    <I18nProvider locale={lang} bundles={pickBundles(lang, ns)}>
      {children}
    </I18nProvider>
  );
}

/** The namespaces in every locale, for a client that picks the locale itself. */
export const bundlesByLocale = (ns: readonly Namespace[]) =>
  Object.fromEntries(SUPPORTED_LOCALES.map((locale) => [locale, pickBundles(locale, ns)])) as BundlesByLocale;

/**
 * Like `Translations`, for a subtree rendered without the route's params (the
 * locale tree's not-found): it takes the locale from the parent provider.
 */
export function TranslationsForParentLocale({ ns, children }: { ns: readonly Namespace[]; children: ReactNode }) {
  return <I18nProviderForParentLocale bundles={bundlesByLocale(ns)}>{children}</I18nProviderForParentLocale>;
}
