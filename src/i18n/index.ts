import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  localeFromPath,
  type Locale,
} from "./config";

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

/**
 * Translation resources, grouped by locale then namespace. One namespace per
 * page keeps catalogs small; `common` holds shared chrome (nav, footer).
 * Register new namespaces here as pages are translated.
 */
const resources = {
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
  },
} as const;

/** Resolve the starting locale from the URL so first paint matches the route. */
function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  const base = (import.meta.env.VITE_BASE_PATH || "/").replace(/\/+$/, "");
  let path = window.location.pathname;
  if (base && path.startsWith(base)) path = path.slice(base.length) || "/";

  return localeFromPath(path);
}

i18n.use(initReactI18next).init({
  resources,
  lng: detectInitialLocale(),
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: SUPPORTED_LOCALES as readonly string[],
  defaultNS: "common",
  ns: ["common", "home", "static", "movies", "contact", "events", "about", "blog", "movie", "eventDetail"],
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
