import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import "@/fonts";
import "@/index.css";
import { Layout } from "@/components/Layout";
import { ThemeProvider } from "@/components/ThemeProvider";
import { InlineScript } from "@/components/InlineScript";
import { JsonLd } from "@/components/JsonLd";
import { SUPPORTED_LOCALES, dirForLocale, isLocale } from "@/i18n/config";
import { I18nProvider } from "@/i18n/provider";
import { SITE_JSON_LD } from "@/lib/metadata/page-seo";
import { SITE_METADATA, SITE_VIEWPORT } from "@/lib/metadata/next-metadata";
import { THEME_SCRIPT } from "@/lib/theme-script";
import { CRITICAL_FONT_URLS } from "@/lib/critical-fonts";

export const dynamicParams = false;

// Site-wide head data; each page adds its own through generateMetadata.
export const metadata = SITE_METADATA;
export const viewport = SITE_VIEWPORT;

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

  // data-scroll-behavior tells Next that the page uses `scroll-behavior: smooth`
  // (index.css), so it can switch it off while it scrolls to the top on a
  // navigation; otherwise that scroll is animated and stops short of the top.
  return (
    <html lang={locale} dir={dirForLocale(locale)} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {CRITICAL_FONT_URLS.map((href) => (
          <link key={href} rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href={href} />
        ))}
        <InlineScript code={THEME_SCRIPT} />
      </head>
      <body>
        <JsonLd nodes={SITE_JSON_LD} />
        <ThemeProvider>
          <I18nProvider locale={locale}>
            <Layout>{children}</Layout>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
