import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { I18nProvider } from "@/i18n/provider";
import { SUPPORTED_LOCALES, isLocale } from "@/i18n/config";

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <I18nProvider locale={locale}>{children}</I18nProvider>;
}
