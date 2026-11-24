import type { Locale } from "./config";

import enCommon from "./locales/en/common.json";
import frCommon from "./locales/fr/common.json";
import enHome from "./locales/en/home.json";
import frHome from "./locales/fr/home.json";
import enStatic from "./locales/en/static.json";
import frStatic from "./locales/fr/static.json";
import enMovies from "./locales/en/movies.json";
import frMovies from "./locales/fr/movies.json";
import enContact from "./locales/en/contact.json";
import frContact from "./locales/fr/contact.json";
import enEvents from "./locales/en/events.json";
import frEvents from "./locales/fr/events.json";
import enAbout from "./locales/en/about.json";
import frAbout from "./locales/fr/about.json";
import enBlog from "./locales/en/blog.json";
import frBlog from "./locales/fr/blog.json";
import enMovie from "./locales/en/movie.json";
import frMovie from "./locales/fr/movie.json";
import enEventDetail from "./locales/en/eventDetail.json";
import frEventDetail from "./locales/fr/eventDetail.json";
import enPerson from "./locales/en/person.json";
import frPerson from "./locales/fr/person.json";

/**
 * Translation resources, grouped by locale then namespace. One namespace per
 * page keeps catalogs small; `common` holds shared chrome (nav, footer).
 * Register new namespaces here as pages are translated.
 *
 * Server only: import it from server components (see `server.tsx`), never from
 * a client component, or every catalog of both locales lands in the browser
 * bundle. Pages hand the client just the namespaces they use.
 */
export const resources = {
  en: {
    common: enCommon,
    home: enHome,
    static: enStatic,
    movies: enMovies,
    contact: enContact,
    events: enEvents,
    about: enAbout,
    blog: enBlog,
    movie: enMovie,
    eventDetail: enEventDetail,
    person: enPerson,
  },
  fr: {
    common: frCommon,
    home: frHome,
    static: frStatic,
    movies: frMovies,
    contact: frContact,
    events: frEvents,
    about: frAbout,
    blog: frBlog,
    movie: frMovie,
    eventDetail: frEventDetail,
    person: frPerson,
  },
} as const;

export type Namespace = keyof typeof resources.en;
export const NAMESPACES = Object.keys(resources.en) as Namespace[];

/** Some namespaces of one locale, as handed to the client provider. */
export type Bundles = Partial<Record<Namespace, unknown>>;

export function pickBundles(locale: Locale, namespaces: readonly Namespace[]): Bundles {
  return Object.fromEntries(namespaces.map((ns) => [ns, resources[locale][ns]]));
}
