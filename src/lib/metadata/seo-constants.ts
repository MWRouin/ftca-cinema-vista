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
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  OG_LOCALE,
  localizePath,
  type Locale,
} from "../../i18n/config";

export { SUPPORTED_LOCALES, DEFAULT_LOCALE, OG_LOCALE, type Locale };

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
  imageUrl?: string;
  imageAlt?: string;
  author?: string;
  authorLabel?: string;
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
    imageUrl: `${SITE_URL}/events/FilmsDeHammamLif/FilmsDeHammamLif-title.jpg`,
    imageAlt: "Films de Hammam-Lif event poster",
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
    imageUrl: `${SITE_URL}/events/ydour/ydour-title.jpg`,
    imageAlt: "Ydour event poster",
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
  "events/ydour-v2": {
    title: "Ydour – يدور v2",
    description:
      "Second edition of YDOUR: a space for amateur cinema. Screenings, Workshops, Exhibition, Music. Espace culturel L'Écurie",
    pagePathname: "events/ydour-v2",
    imageUrl: `${SITE_URL}/events/ydour2/ydour2_1.jpg`,
    imageAlt: "Ydour event poster",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Ydour – يدور (2nd Edition)",
      description:
        "Screening, discussion and more.. – a gathering for the amateur cinema community.",
      startDate: "2026-05-15T18:00:00+01:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode:
        "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Espace culturel L'Écurie",
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
      url: `${SITE_URL}/events/ydour-v2`,
    },
  },
  "events/afterwork-movienight": {
    title: "Afterwork - Movie Night",
    description:
      "Intimate film screenings and discussions with filmmakers at Day One by the Hammam-Lif Amateur Filmmakers' Club. A space to explore the ideas and process behind each film.",
    pagePathname: "events/afterwork-movienight",
    imageUrl: `${SITE_URL}/events/afterworkMovienight/hero.jpg`,
    imageAlt: "Afterwork - Movie Night event poster",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Afterwork - Movie Night",
      description:
        "an intimate film screening and discussion experience by the Hammam-Lif Amateur Filmmakers' Club at Day One. A space to explore the ideas and process behind each film.",
      startDate: "2026-01-28T19:00:00+01:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode:
        "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Espace culturel DayOne",
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
      url: `${SITE_URL}/events/afterwork-movienight`,
    },
  },
  "events/films-de-hammamlif": {
    title: "Films de Hammam-Lif",
    description:
      "Films de Hammam-Lif: screening & exhibition at Complexe Culturel Ali Ben Ayed. A tribute to Hammam-Lif's cinematic culture by FTCA, December 2025.",
    pagePathname: "events/films-de-hammamlif",
    imageUrl: `${SITE_URL}/events/FilmsDeHammamLif/FilmsDeHammamLif-title.jpg`,
    imageAlt: "Films de Hammam-Lif event poster",
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
    imageUrl: `${SITE_URL}/blogs/youssef_blog.JPG`,
    imageAlt: "Featured blog article cover image",
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

/* ─── i18n: French overrides ─── */

/**
 * French title/description overrides for the static pages, keyed like
 * PAGE_SEO. Anything not listed falls back to the English PAGE_SEO entry.
 * Movie/blog detail titles come from content data and are not translated here.
 */
export const PAGE_SEO_FR: Record<
  string,
  { title?: string; description?: string; jsonLd?: Record<string, unknown> }
> = {
  "": {
    title: "Accueil",
    description:
      "Club des Cinéastes Amateurs de Hammam-Lif (FTCA) – une communauté passionnée de cinéastes amateurs en Tunisie. Découvrez nos films, événements, projections et discussions.",
    jsonLd: {
      name: "Club des Cinéastes Amateurs de Hammam-Lif",
      description:
        "Une communauté passionnée de cinéastes amateurs à Hammam-Lif, en Tunisie.",
    },
  },
  movies: {
    title: "Films",
    description:
      "Explorez la collection de films amateurs du Club des Cinéastes de Hammam-Lif. Courts métrages, fictions et documentaires produits par les membres de la FTCA.",
    jsonLd: {
      name: `Films – ${SITE_NAME}`,
      description: "Collection de films amateurs de la FTCA Hammam-Lif.",
    },
  },
  events: {
    title: "Événements",
    description:
      "Découvrez les événements du Club des Cinéastes Amateurs de Hammam-Lif : projections, discussions, ateliers et rencontres en Tunisie.",
    jsonLd: {
      name: `Événements – ${SITE_NAME}`,
      description: "Projections, discussions et ateliers.",
    },
  },
  "events/ydour": {
    title: "Ydour – يدور",
    description:
      "Ydour : projection & discussion organisée par le Club des Cinéastes Amateurs de Hammam-Lif. Un rassemblement pour la communauté du cinéma amateur, Café culturel LIBER'THÉ, février 2025.",
    jsonLd: {
      description:
        "Projection & discussion – un rassemblement pour la communauté du cinéma amateur.",
    },
  },
  "events/ydour-v2": {
    title: "Ydour – يدور v2",
    description:
      "Deuxième édition de YDOUR : un espace dédié au cinéma amateur. Projections, ateliers, exposition, musique. Espace culturel L'Écurie.",
    jsonLd: {
      name: "Ydour – يدور (2ᵉ édition)",
      description:
        "Projection, discussion et plus encore.. – un rassemblement pour la communauté du cinéma amateur.",
    },
  },
  "events/afterwork-movienight": {
    title: "Afterwork - Movie Night",
    description:
      "Projections de films et discussions intimes avec les cinéastes à Day One, par le Club des Cinéastes Amateurs de Hammam-Lif. Un espace pour explorer les idées et le processus derrière chaque film.",
    jsonLd: {
      description:
        "une expérience intime de projection et de discussion par le Club des Cinéastes Amateurs de Hammam-Lif à Day One. Un espace pour explorer les idées et le processus derrière chaque film.",
    },
  },
  "events/films-de-hammamlif": {
    title: "Films de Hammam-Lif",
    description:
      "Films de Hammam-Lif : projection & exposition au Complexe Culturel Ali Ben Ayed. Un hommage à la culture cinématographique de Hammam-Lif par la FTCA, décembre 2025.",
    jsonLd: {
      description:
        "Projection & exposition – un hommage à la culture cinématographique de Hammam-Lif.",
    },
  },
  blog: {
    title: "Blog & Articles",
    description:
      "Articles, réflexions et regards sur le cinéma amateur par les membres du club FTCA Hammam-Lif.",
  },
  about: {
    title: "À propos – Notre histoire",
    description:
      "Découvrez l'histoire du Club des Cinéastes Amateurs de Hammam-Lif, notre équipe passionnée et notre mission de promouvoir le cinéma amateur en Tunisie.",
    jsonLd: {
      name: "À propos – Club des Cinéastes Amateurs de Hammam-Lif",
      description: `L'histoire et l'équipe derrière ${SITE_NAME}.`,
    },
  },
  palmares: {
    title: "Palmarès",
    description:
      "Prix & distinctions du Club des Cinéastes Amateurs de Hammam-Lif. Récompenses et réalisations dans le cinéma amateur.",
  },
  contact: {
    title: "Contact",
    description:
      "Contactez le Club des Cinéastes Amateurs de Hammam-Lif. Rejoignez notre communauté, proposez un film ou renseignez-vous sur nos événements.",
  },
  "404": {
    title: "Page introuvable",
    description: "La page que vous recherchez n'existe pas.",
  },
};

/* ─── i18n helpers (shared by MetaHeader and the build scripts) ─── */

/** Per-page SEO for a given locale, French overrides applied where present. */
export function getLocalizedPageSeo(pageKey: string, locale: Locale): PageSeo {
  const base = PAGE_SEO[pageKey] ?? {
    title: SITE_NAME,
    description: "",
    pagePathname: pageKey,
  };
  const override = locale === "fr" ? PAGE_SEO_FR[pageKey] : undefined;
  if (!override) return base;

  const merged: PageSeo = { ...base, ...override };
  // jsonLd is merged field-by-field so a localized name/description override
  // doesn't drop the base @type / url / nested nodes.
  if (base.jsonLd || override.jsonLd) {
    merged.jsonLd = { ...base.jsonLd, ...override.jsonLd };
  }
  return merged;
}

/** Absolute URL for a locale-neutral page key (e.g. "", "movies", "events/ydour"). */
export function localizedPageUrl(pageKey: string, locale: Locale): string {
  const path = pageKey ? `/${pageKey}` : "/";
  return buildPageUrl(localizePath(path, locale));
}

/** hreflang alternates (every locale + x-default) for a page key. */
export function hreflangAlternates(
  pageKey: string,
): Array<{ hreflang: string; href: string }> {
  const alts = SUPPORTED_LOCALES.map((loc) => ({
    hreflang: loc as string,
    href: localizedPageUrl(pageKey, loc),
  }));
  alts.push({ hreflang: "x-default", href: localizedPageUrl(pageKey, DEFAULT_LOCALE) });
  return alts;
}

/**
 * Build a BreadcrumbList JSON-LD for a page key (Home › Section › Leaf).
 * Returns null for the homepage and the 404 page (no breadcrumb).
 * Shared by MetaHeader (runtime) and the static generator so both stay in sync.
 *
 * `leafTitle` is the current page's display title; section labels are pulled
 * from PAGE_SEO so they're localized consistently.
 */
export function buildBreadcrumbList(
  pageKey: string,
  leafTitle: string | undefined,
  locale: Locale,
): Record<string, unknown> | null {
  if (!pageKey || pageKey === "404") return null;

  const homeName = getLocalizedPageSeo("", locale).title || SITE_NAME_FULL;
  const crumbs: Array<{ name: string; url: string }> = [
    { name: homeName, url: localizedPageUrl("", locale) },
  ];

  const parts = pageKey.split("/");
  if (parts.length > 1) {
    const section = parts[0];
    crumbs.push({
      name: getLocalizedPageSeo(section, locale).title || section,
      url: localizedPageUrl(section, locale),
    });
  }
  crumbs.push({
    name: leafTitle || getLocalizedPageSeo(pageKey, locale).title || pageKey,
    url: localizedPageUrl(pageKey, locale),
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}
