import type { Metadata } from "next";

import { InlineScript } from "@/components/InlineScript";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { localeRedirectScript } from "@/lib/locale-redirect";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, languageAlternates } from "@/lib/metadata/next-metadata";
import { SITE_JSON_LD } from "@/lib/metadata/page-seo";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME_FULL,
  buildPageTitle,
  localizedPageUrl,
} from "@/lib/metadata/seo-constants";

/**
 * Page body for a URL without a locale prefix ("/", "/movies/", "/movies/trip/"):
 * redirects to the visitor's locale. The noscript refresh covers clients
 * without JavaScript.
 */
export function LocaleRedirect({ pageKey }: { pageKey: string }) {
  const fallback = `/${DEFAULT_LOCALE}/${pageKey ? `${pageKey}/` : ""}`;
  return (
    <>
      <InlineScript code={localeRedirectScript(pageKey)} />
      {/* "/" is what gets shared and crawled first, so it carries the site's structured data. */}
      {!pageKey && <JsonLd nodes={SITE_JSON_LD} />}
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${fallback}`} />
      </noscript>
      <p>Redirecting…</p>
    </>
  );
}

/** Metadata for a redirect page: canonical and hreflang point at the real pages. */
export function localeRedirectMetadata(pageKey: string): Metadata {
  // "/" is the site's entry point: it stays indexable and carries the full
  // site description and share card, since bots that don't run the redirect
  // read them here. Legacy deep links are noindex.
  if (!pageKey) {
    return buildMetadata("", DEFAULT_LOCALE, {
      title: SITE_NAME_FULL,
      description: DEFAULT_DESCRIPTION,
    });
  }
  return {
    title: { absolute: buildPageTitle("Redirecting…") },
    robots: "noindex, follow",
    alternates: {
      canonical: localizedPageUrl(pageKey, DEFAULT_LOCALE),
      languages: languageAlternates(pageKey),
    },
  };
}
