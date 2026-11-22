import nunito400 from "@fontsource/nunito/files/nunito-latin-400-normal.woff2";
import nunito400Italic from "@fontsource/nunito/files/nunito-latin-400-italic.woff2";
import nunito600 from "@fontsource/nunito/files/nunito-latin-600-normal.woff2";
import nunito600Italic from "@fontsource/nunito/files/nunito-latin-600-italic.woff2";

const url = (asset: string | { src: string }) => (typeof asset === "string" ? asset : asset.src);

/**
 * Above-the-fold font files (hero heading and body). Preloading them starts the
 * fetch in parallel with the CSS instead of after it, which closes the brief
 * fallback-font flash on a cold load. If the hero's font family, weight or
 * style changes, update this list.
 */
export const CRITICAL_FONT_URLS: string[] = [nunito400, nunito400Italic, nunito600, nunito600Italic].map(url);
