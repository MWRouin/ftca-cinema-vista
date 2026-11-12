"use client";

import { useMemo, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

import type { Locale } from "./config";
import { createI18n } from "./instance";

/** Gives client components `useTranslation()` for the route's locale. */
export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const i18n = useMemo(() => createI18n(locale), [locale]);
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
