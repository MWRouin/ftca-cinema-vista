import { Helmet } from "react-helmet-async";
import type { OgType } from "./metadata-types";
import { useHtmlLanguage } from "./html-lang";
import {
    SITE_NAME,
    SITE_NAME_FULL,
    DEFAULT_OG_IMAGE,
    DEFAULT_OG_IMAGE_ALT,
    DEFAULT_DESCRIPTION,
    DEFAULT_LANG,
    TWITTER_HANDLE,
    SITE_URL,
    buildPageUrl,
    buildPageTitle,
} from "./seo-constants";

interface MetaHeaderProps {
    /** Page title (without the " | FTCA Hammam‑Lif" suffix — that's appended automatically). */
    title?: string;
    description?: string;
    /** Route pathname, e.g. "events/ydour". Omit leading slash. */
    pagePathname?: string;
    /** Absolute URL — overrides pagePathname when set. */
    pageUrl?: string;
    ogType?: OgType;
    imageUrl?: string;
    imageAlt?: string;
    lang?: string;
    /** JSON-LD structured data object(s). */
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
    /** Article publish date (ISO 8601). */
    articlePublishedTime?: string;
    /** Don't index this page. */
    noindex?: boolean;
}

export default function MetaHeader({
    title,
    description = DEFAULT_DESCRIPTION,
    pageUrl,
    pagePathname,
    ogType = "website",
    imageUrl = DEFAULT_OG_IMAGE,
    imageAlt = DEFAULT_OG_IMAGE_ALT,
    lang = DEFAULT_LANG,
    jsonLd,
    articlePublishedTime,
    noindex = false,
}: MetaHeaderProps) {
    useHtmlLanguage(lang);

    const resolvedUrl = pageUrl || (pagePathname != null ? buildPageUrl(pagePathname) : SITE_URL);
    const resolvedTitle = buildPageTitle(title);
    const robots = noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    const jsonLdScripts = jsonLd
        ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((data, i) => (
            <script key={i} type="application/ld+json">
                {JSON.stringify(data)}
            </script>
        ))
        : null;

    return (
        <Helmet>
            <html lang={lang} />
            <title>{resolvedTitle}</title>
            <link rel="canonical" href={resolvedUrl} />
            <meta name="description" content={description} />
            <meta name="robots" content={robots} />

            {/* Open Graph */}
            <meta property="og:locale" content="en_US" />
            <meta property="og:title" content={resolvedTitle} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:url" content={resolvedUrl} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="1200" />
            <meta property="og:image:alt" content={imageAlt} />

            {articlePublishedTime && (
                <meta property="article:published_time" content={articlePublishedTime} />
            )}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={resolvedTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
            <meta name="twitter:site" content={TWITTER_HANDLE} />

            {/* JSON-LD */}
            {jsonLdScripts}
        </Helmet>
    );
}