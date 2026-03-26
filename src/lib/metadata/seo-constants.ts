/**
 * SEO configuration — single source of truth.
 *
 * Consumed by:
 *  - src/lib/metadata/metadata.tsx       (MetaHeader component, via react-helmet-async)
 *  - src/pages/*                         (every page imports PAGE_SEO)
 *  - scripts/staticPagesGenerator.js     (build-time HTML injection)
 *  - scripts/sitemapGenerator.js         (build-time sitemap)
 *
 * Keep this file free of React / DOM imports so Node scripts can load it too.
 */

import type { OgType } from "./metadata-types";

/* ─── Site-wide constants ─── */

export const SITE_URL = "https://www.cineamateur-hlif.com";
export const SITE_NAME = "FTCA Hammam-Lif";
export const SITE_NAME_FULL = "Hammam-Lif Amateur Filmmakers Club";
export const DEFAULT_LANG = "en";
export const TWITTER_HANDLE = "@ftcahammemlif";
export const CONTACT_EMAIL = "contact@cineamateur-hlif.com";

export const DEFAULT_OG_IMAGE =
  "https://opengraph.b-cdn.net/production/images/e889e93c-a333-49e9-bb70-4d0506d588ff.jpg?token=Fbd-173Wg4scri1OkZIVXQEUGc9atCOObfuZX-GRquE&height=1200&width=1200&expires=33286675221";
export const DEFAULT_OG_IMAGE_ALT =
  "Hammam-Lif Amateur Filmmakers Club – FTCA Hammam-Lif";

export const DEFAULT_DESCRIPTION =
  "Hammam-Lif Amateur Filmmakers Club (FTCA) – A passionate community of amateur filmmakers. Films, events, screenings and discussions in Hammam-Lif, Tunisia.";

/* ─── Helpers ─── */

/** Full URL for a given path segment (no leading slash needed). */
export function buildPageUrl(pathname = ""): string {
  const clean = pathname.replace(/^\/+/, "");
  return clean ? `${SITE_URL}/${clean}` : `${SITE_URL}/`;
}

/** Title with consistent branding suffix. */
export function buildPageTitle(pageTitle?: string): string {
  if (!pageTitle) return `${SITE_NAME_FULL} | ${SITE_NAME}`;
  return `${pageTitle} | ${SITE_NAME}`;
}

/* ─── Per-page SEO data ─── */

export interface PageSeo {
  title: string;
  description: string;
  pagePathname: string;
  ogType?: OgType;
  noindex?: boolean;
  /** JSON-LD structured data (only used client-side) */
  jsonLd?: Record<string, unknown>;
}

/**
 * Central registry of every page's SEO metadata.
 * Key = route pathname (without leading slash). "" = homepage.
 */
export const PAGE_SEO: Record<string, PageSeo> = {
  "": {
    title: "Home",
    description:
      "Hammam-Lif Amateur Filmmakers Club (FTCA) – A passionate community of amateur filmmakers in Tunisia. Discover our films, events, screenings and discussions.",
    pagePathname: "",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Hammam-Lif Amateur Filmmakers Club",
      description:
        "A passionate community of amateur filmmakers in Hammam-Lif, Tunisia.",
      url: `${SITE_URL}/`,
    },
  },
  movies: {
    title: "Movies",
    description:
      "Explore the amateur film collection of the Hammam-Lif Filmmakers Club. Short films, fiction and documentaries produced by FTCA members.",
    pagePathname: "movies",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Movies – ${SITE_NAME}`,
      description: "Amateur film collection from FTCA Hammam-Lif.",
      url: `${SITE_URL}/movies`,
    },
  },
  events: {
    title: "Events",
    description:
      "Discover events by the Hammam-Lif Amateur Filmmakers Club: screenings, discussions, workshops and gatherings in Tunisia.",
    pagePathname: "events",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Events – ${SITE_NAME}`,
      description: "Screenings, discussions and workshops.",
      url: `${SITE_URL}/events`,
    },
  },
  "events/ydour": {
    title: "Ydour – يدور",
    description:
      "Ydour: screening & discussion organised by the Hammam-Lif Amateur Filmmakers Club. A gathering for the amateur cinema community, Café culturel LIBER'THÉ, February 2025.",
    pagePathname: "events/ydour",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Ydour – يدور",
      description:
        "Screening & discussion – a gathering for the amateur cinema community.",
      startDate: "2025-02-22T18:30:00+01:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode:
        "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Café culturel LIBER'THÉ",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tunis",
          addressCountry: "TN",
        },
      },
      organizer: {
        "@type": "Organization",
        name: SITE_NAME_FULL,
        url: SITE_URL,
      },
      url: `${SITE_URL}/events/ydour`,
    },
  },
  "events/films-de-hammamlif": {
    title: "Films de Hammam-Lif",
    description:
      "Films de Hammam-Lif: screening & exhibition at Complexe Culturel Ali Ben Ayed. A tribute to Hammam-Lif's cinematic culture by FTCA, December 2025.",
    pagePathname: "events/films-de-hammamlif",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Films de Hammam-Lif",
      description:
        "Screening & exhibition – a tribute to Hammam-Lif's cinematic culture.",
      startDate: "2025-12-27T16:30:00+01:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode:
        "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Complexe Culturel Ali Ben Ayed",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hammam-Lif",
          addressCountry: "TN",
        },
      },
      organizer: {
        "@type": "Organization",
        name: SITE_NAME_FULL,
        url: SITE_URL,
      },
      url: `${SITE_URL}/events/films-de-hammamlif`,
    },
  },
  blog: {
    title: "Blog & Articles",
    description:
      "Articles, reflections and insights on amateur cinema from members of the FTCA Hammam-Lif club.",
    pagePathname: "blog",
    ogType: "blog",
  },
  about: {
    title: "About – Our Story",
    description:
      "Discover the history of the Hammam-Lif Amateur Filmmakers Club, our passionate team and our mission to promote amateur cinema in Tunisia.",
    pagePathname: "about",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: `About – ${SITE_NAME_FULL}`,
      description: `The story and team behind ${SITE_NAME}.`,
      url: `${SITE_URL}/about`,
    },
  },
  palmares: {
    title: "Palmarès",
    description:
      "Awards & recognitions of the Hammam-Lif Amateur Filmmakers Club. Prizes and achievements in amateur cinema.",
    pagePathname: "palmares",
  },
  contact: {
    title: "Contact",
    description:
      "Get in touch with the Hammam-Lif Amateur Filmmakers Club. Join our community, submit a film or ask about our events.",
    pagePathname: "contact",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: `Contact – ${SITE_NAME}`,
      url: `${SITE_URL}/contact`,
    },
  },
  "404": {
    title: "Page Not Found",
    description: "The page you are looking for does not exist.",
    pagePathname: "404",
    noindex: true,
  },
};
