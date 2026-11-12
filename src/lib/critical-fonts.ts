import cormorant600 from "@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2";
import cormorant600Italic from "@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-italic.woff2";
import inter400 from "@fontsource/inter/files/inter-latin-400-normal.woff2";
import inter600 from "@fontsource/inter/files/inter-latin-600-normal.woff2";

const url = (asset: string | { src: string }) => (typeof asset === "string" ? asset : asset.src);

/**
 * Above-the-fold font files (hero heading and body). Preloading them starts the
 * fetch in parallel with the CSS instead of after it, which closes the brief
 * fallback-font flash on a cold load. If the hero's font family, weight or
 * style changes, update this list.
 */
export const CRITICAL_FONT_URLS: string[] = [cormorant600, cormorant600Italic, inter400, inter600].map(url);
