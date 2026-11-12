import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import "@/fonts";
import "@/index.css";
import { Layout } from "@/components/Layout";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeScript } from "@/components/ThemeScript";
import { SUPPORTED_LOCALES, dirForLocale, isLocale } from "@/i18n/config";
import { I18nProvider } from "@/i18n/provider";
import { CRITICAL_FONT_URLS } from "@/lib/critical-fonts";

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

// This is a root layout (no app/layout.tsx), so it owns <html> and <body>; that
// is what lets `lang` and `dir` be correct in the static HTML of every locale.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} dir={dirForLocale(locale)} suppressHydrationWarning>
      <head>
        {CRITICAL_FONT_URLS.map((href) => (
          <link key={href} rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href={href} />
        ))}
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          <I18nProvider locale={locale}>
            <Layout>{children}</Layout>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
