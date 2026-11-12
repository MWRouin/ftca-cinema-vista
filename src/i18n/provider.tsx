"use client";

import { useMemo, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

import type { Locale } from "./config";
import { createI18n } from "./instance";
import { LocaleContext } from "./locale";

/** Gives client components `useTranslation()` and `useLocale()` for the route's locale. */
export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const i18n = useMemo(() => createI18n(locale), [locale]);
  return (
    <LocaleContext.Provider value={locale}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LocaleContext.Provider>
  );
}
