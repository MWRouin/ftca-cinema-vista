import { useLayoutEffect } from "react";
import type { OgType } from "./metadata-types";
import { useHtmlLanguage } from "./html-lang";
import {
    SITE_NAME,
    DEFAULT_OG_IMAGE,
    DEFAULT_OG_IMAGE_ALT,
    DEFAULT_DESCRIPTION,
    DEFAULT_LANG,
    TWITTER_HANDLE,
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
    lang = DEFAULT_LANG,
    jsonLd,
    articlePublishedTime,
    noindex = false,
}: MetaHeaderProps) {
    useHtmlLanguage(lang);

    const resolvedUrl = pageUrl || buildPageUrl(pagePathname ?? getCurrentPathname());
    const resolvedTitle = buildPageTitle(title);
    const robots = noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    useLayoutEffect(() => {
        document.title = resolvedTitle;
        setCanonicalLink(resolvedUrl);

        setMetaTag("name", "description", description);
        setMetaTag("name", "robots", robots);

        setMetaTag("property", "og:locale", "en_US");
        setMetaTag("property", "og:title", resolvedTitle);
        setMetaTag("property", "og:site_name", SITE_NAME);
        setMetaTag("property", "og:url", resolvedUrl);
        setMetaTag("property", "og:description", description);
        setMetaTag("property", "og:type", ogType);
        setMetaTag("property", "og:image", imageUrl);
        setMetaTag("property", "og:image:width", "1200");
        setMetaTag("property", "og:image:height", "1200");
        setMetaTag("property", "og:image:alt", imageAlt);
        setMetaTag("property", "article:published_time", articlePublishedTime);

        setMetaTag("name", "twitter:card", "summary_large_image");
        setMetaTag("name", "twitter:title", resolvedTitle);
        setMetaTag("name", "twitter:description", description);
        setMetaTag("name", "twitter:image", imageUrl);
        setMetaTag("name", "twitter:site", TWITTER_HANDLE);

        syncJsonLdScripts(jsonLd);
    }, [
        articlePublishedTime,
        description,
        imageAlt,
        imageUrl,
        jsonLd,
        ogType,
        resolvedTitle,
        resolvedUrl,
        robots,
    ]);

    return null;
}