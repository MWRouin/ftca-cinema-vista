import { createInstance, type i18n as I18n } from "i18next";

import type { Locale } from "./config";
import type { Bundles } from "./resources";

/**
 * A standalone i18next instance for one locale with the given namespaces.
 * Synchronous (the catalogs are passed in), so the first render already has
 * the text. Holds no catalogs itself: client code gets them from the server
 * (see `server.tsx`).
 */
export function createI18n(locale: Locale, bundles: Bundles): I18n {
  const instance = createInstance();
  void instance.init({
    resources: { [locale]: bundles as Record<string, object> },
    lng: locale,
    // en and fr have the same keys, so there is nothing to fall back to.
    fallbackLng: false,
    defaultNS: "common",
    ns: Object.keys(bundles),
    interpolation: { escapeValue: false },
    returnNull: false,
    initAsync: false,
    // In development, flag a lookup in a namespace the page didn't load: the
    // page's list in src/app is missing it, and the key would show as is.
    saveMissing: process.env.NODE_ENV === "development",
    saveMissingTo: "current",
    missingKeyHandler: (_lngs, ns, key) => {
      if (!(ns in bundles)) {
        console.warn(`i18n: "${ns}:${key}" used, but the "${ns}" namespace isn't loaded on this page. Add it to the page's <Translations ns>.`);
      }
    },
  });
  return instance;
}
