import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, SUPPORTED_LOCALES } from "@/i18n/config";

/**
 * Inline script that sends a locale-less URL to its localized page:
 * stored choice, then browser language, then the default locale. `pageKey` is
 * the locale-neutral path ("" for the site root, "movies/trip", …). The query
 * string and hash are kept.
 */
export function localeRedirectScript(pageKey: string): string {
  const path = pageKey ? `${pageKey}/` : "";
  return `(function(){try{var s=${JSON.stringify(SUPPORTED_LOCALES)},d=${JSON.stringify(DEFAULT_LOCALE)},l=null;try{l=localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)});}catch(e){}if(s.indexOf(l)<0){l=null;var n=navigator.languages||[navigator.language||''];for(var i=0;i<n.length;i++){var b=(n[i]||'').toLowerCase().split('-')[0];if(s.indexOf(b)>-1){l=b;break;}}}l=l||d;location.replace('/'+l+'/'+${JSON.stringify(path)}+location.search+location.hash);}catch(e){location.replace(${JSON.stringify(`/${DEFAULT_LOCALE}/${path}`)});}})();`;
}
