"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

import type { Locale } from "./config";
import { createI18n } from "./instance";
import { LocaleContext, useLocale } from "./locale";
import type { Bundles } from "./resources";

export type BundlesByLocale = Record<Locale, Bundles>;

const BundlesContext = createContext<Bundles>({});

/**
 * Gives client components `useTranslation()` and `useLocale()` with the given
 * namespaces. Nested providers add to their parent's: the locale layout
 * provides `common`, each page adds its own (see `Translations` in server.tsx).
 */
export function I18nProvider({
  locale,
  bundles,
  children,
}: {
  locale: Locale;
  bundles: Bundles;
  children: ReactNode;
}) {
  const parent = useContext(BundlesContext);
  const merged = useMemo(() => ({ ...parent, ...bundles }), [parent, bundles]);
  const i18n = useMemo(() => createI18n(locale, merged), [locale, merged]);
  return (
    <BundlesContext.Provider value={merged}>
      <LocaleContext.Provider value={locale}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </LocaleContext.Provider>
    </BundlesContext.Provider>
  );
}

/**
 * For a subtree that can't know the locale on the server (the locale tree's
 * not-found): given the namespaces in every locale, uses the parent's.
 */
export function I18nProviderForParentLocale({
  bundles,
  children,
}: {
  bundles: BundlesByLocale;
  children: ReactNode;
}) {
  const locale = useLocale();
  return (
    <I18nProvider locale={locale} bundles={bundles[locale]}>
      {children}
    </I18nProvider>
  );
}
