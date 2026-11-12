import type { MetadataRoute } from "next";

import { getBlogArticles } from "@/data/blog";
import { getEvents } from "@/data/events";
import { getMovies, getPublicPeople } from "@/data/movies";
import { SUPPORTED_LOCALES } from "@/i18n/config";
import { languageAlternates } from "@/lib/metadata/next-metadata";
import { SITE_URL, localizedPageUrl } from "@/lib/metadata/seo-constants";

export const dynamic = "force-static";

type Entry = MetadataRoute.Sitemap[number];
type Frequency = Entry["changeFrequency"];

const absolute = (path?: string) => (!path ? undefined : path.startsWith("http") ? path : `${SITE_URL}${path}`);

/** One entry per locale for a locale-neutral page key, each listing every locale as an alternate. */
function entries(
  pageKey: string,
  lastModified: string,
  changeFrequency: Frequency,
  priority: number,
  image?: string,
): Entry[] {
  return SUPPORTED_LOCALES.map((locale) => ({
    url: localizedPageUrl(pageKey, locale),
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages: languageAlternates(pageKey) },
    ...(image ? { images: [image] } : {}),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split("T")[0];

  return [
    ...entries("", today, "weekly", 1.0),
    ...entries("movies", today, "weekly", 0.9),
    ...entries("events", today, "weekly", 0.9),
    ...entries("blog", today, "weekly", 0.8),
    ...entries("about", today, "monthly", 0.7),
    ...entries("palmares", today, "monthly", 0.6),
    ...entries("contact", today, "yearly", 0.5),
    ...getMovies().flatMap((movie) =>
      entries(`movies/${movie.id}`, today, "monthly", 0.6, absolute(movie.image)),
    ),
    ...getEvents().flatMap((event) =>
      entries(`events/${event.id}`, event.date || today, "monthly", 0.7),
    ),
    ...getBlogArticles().flatMap((article) =>
      entries(`blog/${article.slug}`, article.date || today, "monthly", 0.7, absolute(article.image)),
    ),
    ...getPublicPeople().flatMap((person) =>
      entries(`people/${person.id}`, today, "monthly", 0.5, absolute(person.image)),
    ),
  ];
}
