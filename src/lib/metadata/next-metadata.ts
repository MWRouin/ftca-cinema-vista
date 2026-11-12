import type { Metadata, Viewport } from "next";

import { OG_LOCALE, SUPPORTED_LOCALES, type Locale } from "@/i18n/config";

import { asLocale, staticPageSeo, type Seo } from "./page-seo";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  SITE_NAME,
  SITE_URL,
  SITE_NAME_FULL,
  TWITTER_HANDLE,
  buildPageTitle,
  hreflangAlternates,
  localizedPageUrl,
} from "./seo-constants";

/** Site-wide head data for the root layouts; pages add their own through generateMetadata. */
export const SITE_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  manifest: "/site.webmanifest",
};

export const SITE_VIEWPORT: Viewport = { themeColor: "#000000" };

const ROBOTS_INDEX =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

type NextOgType = "website" | "article" | "profile" | "video.movie";
const NEXT_OG_TYPES = new Set<string>(["website", "article", "profile", "video.movie"]);

/** hreflang map (every locale + x-default) in the shape Next's `alternates.languages` wants. */
export const languageAlternates = (pageKey: string): Record<string, string> =>
  Object.fromEntries(hreflangAlternates(pageKey).map(({ hreflang, href }) => [hreflang, href]));

/**
 * Next.js metadata for one page: title, description, canonical, hreflang,
 * Open Graph, Twitter card and author tags. `pageKey` is locale-neutral
 * ("", "movies", "movies/trip", …).
 */
export function buildMetadata(pageKey: string, locale: Locale, seo: Seo): Metadata {
  const pageUrl = localizedPageUrl(pageKey, locale);
  const title = buildPageTitle(seo.title || SITE_NAME);
  const description = seo.description || "";
  const imageUrl = seo.imageUrl || DEFAULT_OG_IMAGE;
  const imageAlt = seo.imageAlt || DEFAULT_OG_IMAGE_ALT;
  // Next only accepts current Open Graph types; anything else (the deprecated
  // "blog" used by the blog index) falls back to "website".
  const ogType = NEXT_OG_TYPES.has(seo.ogType ?? "") ? (seo.ogType as NextOgType) : "website";
  // The 1200×1200 size is only known for the default share image.
  const imageSize = imageUrl === DEFAULT_OG_IMAGE ? { width: 1200, height: 1200 } : {};

  return {
    title: { absolute: title },
    description,
    authors: [{ name: seo.author || SITE_NAME_FULL }],
    robots: seo.noindex ? "noindex, nofollow" : ROBOTS_INDEX,
    alternates: { canonical: pageUrl, languages: languageAlternates(pageKey) },
    openGraph: {
      type: ogType,
      locale: OG_LOCALE[locale],
      alternateLocale: SUPPORTED_LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      title,
      description,
      siteName: SITE_NAME,
      url: pageUrl,
      images: [{ url: imageUrl, alt: imageAlt, ...imageSize }],
      ...(seo.author && ogType === "article" ? { authors: [seo.author] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title,
      description,
      images: [imageUrl],
    },
    ...(seo.author
      ? {
          other: {
            "twitter:label1": seo.authorLabel || "Written by",
            "twitter:data1": seo.author,
          },
        }
      : {}),
  };
}

/** Metadata for a page listed in PAGE_SEO, straight from the route's `locale` param. */
export const staticMetadata = (pageKey: string, locale: string): Metadata =>
  buildMetadata(pageKey, asLocale(locale), staticPageSeo(pageKey, asLocale(locale)));
