import { useLayoutEffect } from "react";
import type { OgType } from "./metadata-types";
import { useHtmlLanguage } from "./html-lang";
import {
    SITE_NAME,
    SITE_NAME_FULL,
    DEFAULT_OG_IMAGE,
    DEFAULT_OG_IMAGE_ALT,
    DEFAULT_DESCRIPTION,
    TWITTER_HANDLE,
    buildPageUrl,
    buildPageTitle,
    PAGE_SEO_FR,
} from "./seo-constants";
import { useLocale } from "@/i18n/locale";
import {
    DEFAULT_LOCALE,
    OG_LOCALE,
    SUPPORTED_LOCALES,
    localizePath,
    stripLocale,
    type Locale,
} from "@/i18n/config";

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
    author?: string;
    authorLabel?: string;
    /** Don't index this page. */
    noindex?: boolean;
}

const MANAGED_ATTR = "data-ftca-seo";

function getCurrentPathname(): string {
    if (typeof window === "undefined") return "";

    return window.location.pathname.replace(/^\/+|\/+$/g, "");
}

function ensureSingleHeadElement<T extends HTMLElement>(
    selector: string,
    createElement: () => T,
): T {
    const existing = Array.from(document.head.querySelectorAll<T>(selector));
    const element = existing.shift() ?? createElement();

    existing.forEach((node) => node.remove());

    if (!element.isConnected) {
        document.head.appendChild(element);
    }

    return element;
}

function setMetaTag(attributeName: "name" | "property", key: string, content?: string) {
    const selector = `meta[${attributeName}="${key}"]`;

    if (!content) {
        document.head.querySelectorAll(selector).forEach((node) => node.remove());
        return;
    }

    const meta = ensureSingleHeadElement(selector, () => document.createElement("meta"));
    meta.setAttribute(attributeName, key);
    meta.setAttribute("content", content);
    meta.setAttribute(MANAGED_ATTR, "true");
}

function setCanonicalLink(href: string) {
    const link = ensureSingleHeadElement('link[rel="canonical"]', () => document.createElement("link"));
    link.setAttribute("rel", "canonical");
    link.setAttribute("href", href);
    link.setAttribute(MANAGED_ATTR, "true");
}

/**
 * Emit <link rel="alternate" hreflang="…"> for every locale plus x-default,
 * pointing at the locale-specific URL for the given locale-neutral path.
 */
function syncAlternateLinks(neutralPath: string) {
    document.head
        .querySelectorAll(`link[rel="alternate"][${MANAGED_ATTR}="hreflang"]`)
        .forEach((node) => node.remove());

    const add = (hreflang: string, href: string) => {
        const link = document.createElement("link");
        link.setAttribute("rel", "alternate");
        link.setAttribute("hreflang", hreflang);
        link.setAttribute("href", href);
        link.setAttribute(MANAGED_ATTR, "hreflang");
        document.head.appendChild(link);
    };

    SUPPORTED_LOCALES.forEach((loc) =>
        add(loc, buildPageUrl(localizePath(neutralPath, loc))),
    );
    add("x-default", buildPageUrl(localizePath(neutralPath, DEFAULT_LOCALE)));
}

function syncJsonLdScripts(jsonLd?: Record<string, unknown> | Record<string, unknown>[]) {
    document.head
        .querySelectorAll(`script[${MANAGED_ATTR}="json-ld"]`)
        .forEach((node) => node.remove());

    if (!jsonLd) return;

    const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];

    items.forEach((data) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute(MANAGED_ATTR, "json-ld");
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    });
}

export default function MetaHeader({
    title,
    description = DEFAULT_DESCRIPTION,
    pageUrl,
    pagePathname,
    ogType = "website",
    imageUrl = DEFAULT_OG_IMAGE,
    imageAlt = DEFAULT_OG_IMAGE_ALT,
    lang,
    jsonLd,
    articlePublishedTime,
    author,
    authorLabel,
    noindex = false,
}: MetaHeaderProps) {
    const locale = useLocale();
    // Explicit `lang` (e.g. an article's content language) wins; otherwise the
    // page inherits the active UI locale.
    const effectiveLang = lang ?? locale;
    useHtmlLanguage(effectiveLang);

    // Locale-neutral path (no "/fr" prefix), used to build per-locale URLs.
    const neutralPath = pagePathname ?? stripLocale("/" + getCurrentPathname());
    const ogLocaleKey: Locale = (SUPPORTED_LOCALES as readonly string[]).includes(effectiveLang)
        ? (effectiveLang as Locale)
        : locale;

    // Apply per-locale SEO overrides (currently French) for known page keys so
    // the runtime title/description match the prerendered HTML. Content pages
    // (movies/blog) aren't in the map and keep their data-driven values.
    const pageKey = neutralPath.replace(/^\/+/, "");
    const localizedSeo = locale !== DEFAULT_LOCALE ? PAGE_SEO_FR[pageKey] : undefined;
    const effectiveTitle = localizedSeo?.title ?? title;
    const effectiveDescription = localizedSeo?.description ?? description;

    const resolvedUrl = pageUrl || buildPageUrl(localizePath(neutralPath, locale));
    const resolvedTitle = buildPageTitle(effectiveTitle);
    const robots = noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    useLayoutEffect(() => {
        document.title = resolvedTitle;
        setCanonicalLink(resolvedUrl);
        syncAlternateLinks(neutralPath);

        setMetaTag("name", "description", effectiveDescription);
        setMetaTag("name", "author", author || SITE_NAME_FULL);
        setMetaTag("name", "robots", robots);

        setMetaTag("property", "og:locale", OG_LOCALE[ogLocaleKey]);
        SUPPORTED_LOCALES.filter((loc) => loc !== ogLocaleKey).forEach((loc, i) =>
            setMetaTag("property", `og:locale:alternate${i ? `:${i}` : ""}`, OG_LOCALE[loc]),
        );
        setMetaTag("property", "og:title", resolvedTitle);
        setMetaTag("property", "og:site_name", SITE_NAME);
        setMetaTag("property", "og:url", resolvedUrl);
        setMetaTag("property", "og:description", effectiveDescription);
        setMetaTag("property", "og:type", ogType);
        setMetaTag("property", "og:image", imageUrl);
        setMetaTag("property", "og:image:width", "1200");
        setMetaTag("property", "og:image:height", "1200");
        setMetaTag("property", "og:image:alt", imageAlt);
        setMetaTag("property", "article:author", ogType === "article" ? author : undefined);
        setMetaTag("property", "article:published_time", articlePublishedTime);

        setMetaTag("name", "twitter:card", "summary_large_image");
        setMetaTag("name", "twitter:title", resolvedTitle);
        setMetaTag("name", "twitter:description", effectiveDescription);
        setMetaTag("name", "twitter:image", imageUrl);
        setMetaTag("name", "twitter:site", TWITTER_HANDLE);
        setMetaTag("name", "twitter:label1", author ? (authorLabel || "Written by") : undefined);
        setMetaTag("name", "twitter:data1", author);

        syncJsonLdScripts(jsonLd);
    }, [
        articlePublishedTime,
        author,
        authorLabel,
        effectiveDescription,
        imageAlt,
        imageUrl,
        jsonLd,
        neutralPath,
        ogLocaleKey,
        ogType,
        resolvedTitle,
        resolvedUrl,
        robots,
    ]);

    return null;
}