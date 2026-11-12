import { getBlogArticles } from "@/data/blog";
import { getEvents } from "@/data/events";
import { getMovies, getPublicPeople } from "@/data/movies";

/** Locale-neutral keys of the section index pages. */
export const SECTION_KEYS = ["movies", "events", "blog", "about", "palmares", "contact"] as const;

/** Ids of the pages under each section that has detail pages. */
export const sectionChildren = {
  movies: () => getMovies().map((movie) => movie.id),
  events: () => getEvents().map((event) => event.id),
  blog: () => getBlogArticles().map((article) => article.slug),
  people: () => getPublicPeople().map((person) => person.id),
} as const;

export type SectionWithChildren = keyof typeof sectionChildren;
