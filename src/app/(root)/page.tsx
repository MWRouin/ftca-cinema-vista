import type { Metadata } from "next";

import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, SUPPORTED_LOCALES } from "@/i18n/config";
import { SITE_NAME_FULL, localizedPageUrl } from "@/lib/metadata/seo-constants";

export const metadata: Metadata = {
  title: SITE_NAME_FULL,
  alternates: {
    canonical: localizedPageUrl("", DEFAULT_LOCALE),
    languages: {
      ...Object.fromEntries(SUPPORTED_LOCALES.map((l) => [l, localizedPageUrl("", l)])),
      "x-default": localizedPageUrl("", DEFAULT_LOCALE),
    },
  },
};

// Same rule as the old LocaleRedirect: stored choice, then browser language,
// then the default locale. The noscript refresh covers crawlers without JS.
const REDIRECT_SCRIPT = `(function(){try{var s=${JSON.stringify(SUPPORTED_LOCALES)},d=${JSON.stringify(DEFAULT_LOCALE)},l=null;try{l=localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)});}catch(e){}if(s.indexOf(l)<0){l=null;var n=navigator.languages||[navigator.language||''];for(var i=0;i<n.length;i++){var b=(n[i]||'').toLowerCase().split('-')[0];if(s.indexOf(b)>-1){l=b;break;}}}l=l||d;location.replace('/'+l+'/'+location.search+location.hash);}catch(e){location.replace('/'+${JSON.stringify(DEFAULT_LOCALE)}+'/');}})();`;

export default function RootRedirect() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: REDIRECT_SCRIPT }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=/${DEFAULT_LOCALE}/`} />
      </noscript>
      <p>Redirecting…</p>
    </>
  );
}
