/**
 * Per-page SEO data for every kind of page, framework-agnostic. The route
 * files turn this into Next.js metadata (`next-metadata.ts`) and JSON-LD
 * (`components/JsonLd.tsx`). Static pages come from PAGE_SEO; entity pages
 * (movie, event, article, person) are built from the data layer.
 */
import type { BlogArticle } from "@/data/blog";
import type { EventMeta } from "@/data/events";
import {
  creditName,
  getCast,
  getDirectorNames,
  getDirectors,
  getMovieDescription,
  type Movie,
} from "@/data/movies";
import type { Person } from "@/data/people";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/config";

import type { OgType } from "./metadata-types";
import {
  CONTACT_EMAIL,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_PERSON_OG_IMAGE,
  PAGE_SEO,
  SITE_NAME,
  SITE_NAME_FULL,
  SITE_URL,
  buildBreadcrumbList,
  getLocalizedPageSeo,
  localizedPageUrl,
} from "./seo-constants";

type JsonLdNode = Record<string, unknown>;

export interface Seo {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  author?: string;
  /** Label for the author line in social cards ("Directed by", "Written by"). */
  authorLabel?: string;
  ogType?: OgType;
  noindex?: boolean;
  jsonLd?: JsonLdNode | JsonLdNode[];
}

/** Route params are plain strings; narrow them (routes only prerender valid locales). */
export const asLocale = (value: string): Locale => (isLocale(value) ? value : DEFAULT_LOCALE);

const absoluteUrl = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

/** A page listed in PAGE_SEO ("", "movies", "about", "events/ydour", …). */
export const staticPageSeo = (pageKey: string, locale: Locale): Seo =>
  getLocalizedPageSeo(pageKey, locale);

export function movieSeo(movie: Movie, locale: Locale): Seo {
  const imageUrl = movie.image ? absoluteUrl(movie.image) : DEFAULT_OG_IMAGE;
  const directorNames = getDirectorNames(movie);
  const directors = getDirectors(movie);
  const cast = getCast(movie);
  // Names are proper nouns (locale-independent); only the description is localized.
  const description =
    getMovieDescription(movie, locale) ||
    `${movie.title} – amateur film by ${directorNames}. ${SITE_NAME}.`;

  return {
    title: movie.title,
    description,
    imageUrl,
    imageAlt: `${movie.title} – poster`,
    author: directorNames,
    authorLabel: "Directed by",
    ogType: "video.movie",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Movie",
      name: movie.title,
      description,
      ...(directors.length
        ? { director: directors.map((c) => ({ "@type": "Person", name: creditName(c) })) }
        : {}),
      ...(cast.length
        ? { actor: cast.map((c) => ({ "@type": "Person", name: creditName(c) })) }
        : {}),
      ...(typeof movie.year === "number" ? { dateCreated: String(movie.year) } : {}),
      ...(movie.genre ? { genre: movie.genre } : {}),
      ...(isoDuration(movie.duration) ? { duration: isoDuration(movie.duration) } : {}),
      url: `${SITE_URL}/movies/${movie.id}`,
      image: imageUrl,
      productionCompany: { "@type": "Organization", name: SITE_NAME },
    },
  };
}

/** "10'" (whole minutes, as written in movies.json) -> "PT10M", the ISO 8601 form schema.org expects. */
function isoDuration(duration: string | undefined): string | undefined {
  const minutes = duration?.match(/^(\d+)'$/)?.[1];
  return minutes ? `PT${Number(minutes)}M` : undefined;
}

export function eventSeo(event: EventMeta, locale: Locale): Seo {
  const pageKey = `events/${event.id}`;
  // Fall back to events.json if the event has no entry in PAGE_SEO.
  return PAGE_SEO[pageKey]
    ? getLocalizedPageSeo(pageKey, locale)
    : { title: event.title, description: event.description };
}

export function articleSeo(article: BlogArticle): Seo {
  const imageUrl = article.image ? absoluteUrl(article.image) : DEFAULT_OG_IMAGE;
  const publishedIso = article.date ? new Date(article.date).toISOString() : undefined;
  const articleUrl = `${SITE_URL}/blog/${article.slug}`;

  return {
    title: article.title,
    description: article.excerpt,
    imageUrl,
    imageAlt: article.title || DEFAULT_OG_IMAGE_ALT,
    author: article.author,
    authorLabel: "Written by",
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.excerpt,
      image: imageUrl,
      ...(publishedIso ? { datePublished: publishedIso, dateModified: publishedIso } : {}),
      author: { "@type": "Person", name: article.author },
      mainEntityOfPage: articleUrl,
      url: articleUrl,
      inLanguage: article.lang ?? "en",
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
  };
}

export function personSeo(person: Person): Seo {
  // Their own portrait when set; otherwise the neutral user placeholder (what
  // the page renders). JSON-LD `image` stays unset without a real portrait.
  const personImage = person.image ? absoluteUrl(person.image) : undefined;

  return {
    title: person.name,
    // Names are proper nouns: same SEO across locales.
    description: person.bio?.en || `${person.name} — ${SITE_NAME_FULL}.`,
    imageUrl: personImage || DEFAULT_PERSON_OG_IMAGE,
    imageAlt: person.name,
    ogType: "profile",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: person.name,
      ...(personImage ? { image: personImage } : {}),
      ...(person.membership
        ? { memberOf: { "@type": "Organization", name: SITE_NAME_FULL } }
        : {}),
      url: `${SITE_URL}/people/${person.id}`,
    },
  };
}

/**
 * A page's structured data: its own nodes plus an auto-generated breadcrumb.
 * Each node's page-identity URLs (`url`, `mainEntityOfPage`) are forced to the
 * page's canonical (locale-prefixed, trailing-slash) URL. An Event without an
 * `image` gets the page's share image, which Google expects on events.
 */
export function pageJsonLd(pageKey: string, locale: Locale, seo: Seo): JsonLdNode[] {
  const pageUrl = localizedPageUrl(pageKey, locale);
  const raw = seo.jsonLd ? (Array.isArray(seo.jsonLd) ? seo.jsonLd : [seo.jsonLd]) : [];
  const nodes = raw.map((node) => {
    const next = { ...node };
    if ("url" in node) next.url = pageUrl;
    if ("mainEntityOfPage" in node) next.mainEntityOfPage = pageUrl;
    if (node["@type"] === "Event" && !("image" in node) && seo.imageUrl) next.image = [seo.imageUrl];
    return next;
  });
  const breadcrumb = buildBreadcrumbList(pageKey, seo.title, locale);
  return breadcrumb ? [...nodes, breadcrumb] : nodes;
}

/** Site-wide structured data, present on every page. */
export const SITE_JSON_LD: JsonLdNode[] = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME_FULL,
    alternateName: [
      "FTCA Hammam-Lif",
      "FTCA Hammemlif",
      "Club des cinéastes amateurs d'Hammam-Lif",
      "نادي السينمائيين الهواة بحمام الأنف",
    ],
    url: SITE_URL,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    description: "A passionate community of amateur filmmakers in Hammam-Lif, Tunisia.",
    foundingLocation: {
      "@type": "Place",
      name: "Hammam-Lif",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hammam-Lif",
        addressCountry: "TN",
      },
    },
    sameAs: [
      "https://www.facebook.com/ftcahammemlif",
      "https://www.instagram.com/ftcahammemlif",
      "https://www.youtube.com/@ftcahammemlif",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      contactType: "customer service",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: SITE_NAME_FULL,
    url: SITE_URL,
    inLanguage: "en",
  },
];
