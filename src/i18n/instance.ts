import { createInstance, type i18n as I18n } from "i18next";

import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "./config";
import { resources, NAMESPACES } from "./resources";

/**
 * A standalone i18next instance for one locale. Framework-agnostic and
 * synchronous (resources are bundled), so it can run in server components,
 * `generateMetadata` and the client provider alike.
 */
export function createI18n(locale: Locale): I18n {
  const instance = createInstance();
  void instance.init({
    resources,
    lng: locale,
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: SUPPORTED_LOCALES as readonly string[],
    defaultNS: "common",
    ns: NAMESPACES,
    interpolation: { escapeValue: false },
    returnNull: false,
    initAsync: false,
  });
  return instance;
}

/** Translation function for server code: `const t = getT("fr", "movies")`. */
export const getT = (locale: Locale, ns: (typeof NAMESPACES)[number] = "common") =>
  createI18n(locale).getFixedT(locale, ns);
