import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  localeFromPath,
  type Locale,
} from "./config";
import { resources, NAMESPACES } from "./resources";
import { BASE_URL } from "@/lib/base-path";

/** Resolve the starting locale from the URL so first paint matches the route. */
function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  const base = BASE_URL.replace(/\/+$/, "");
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
  ns: NAMESPACES,
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
