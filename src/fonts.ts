/**
 * Self-hosted webfonts (via @fontsource) — bundled into the build and served
 * from our own origin instead of fetched from Google Fonts at runtime.
 *
 * Only the subsets and the weights/styles actually used by the site are
 * imported (the families are set in tailwind.config.ts):
 *  - Nunito             400–700 + 400–600 italic (all text, hero included)
 *  - Noto Sans Arabic   400/600                  (Arabic text)
 * The Arabic files only download on pages with Arabic text (unicode-range).
 */

// Nunito: the whole site, hero included
import "@fontsource/nunito/latin-400.css";
import "@fontsource/nunito/latin-500.css";
import "@fontsource/nunito/latin-600.css";
import "@fontsource/nunito/latin-700.css";
import "@fontsource/nunito/latin-400-italic.css";
import "@fontsource/nunito/latin-500-italic.css";
import "@fontsource/nunito/latin-600-italic.css";

// Arabic
import "@fontsource/noto-sans-arabic/arabic-400.css";
import "@fontsource/noto-sans-arabic/arabic-600.css";
