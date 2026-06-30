/**
 * Self-hosted webfonts (via @fontsource) — bundled into the build and served
 * from our own origin instead of fetched from Google Fonts at runtime.
 *
 * Only the latin subset and the weights/styles actually used by the site are
 * imported, mirroring what the old Google Fonts <link> requested:
 *  - Inter              300–700            (hero / editorial UI)
 *  - Cormorant Garamond 500/600/700 + 500/600 italic (hero + About pull-quote)
 *  - Nunito             400/600/700        (headings, see src/index.css)
 */

// Inter
import "@fontsource/inter/latin-300.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";

// Cormorant Garamond
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-600.css";
import "@fontsource/cormorant-garamond/latin-700.css";
import "@fontsource/cormorant-garamond/latin-500-italic.css";
import "@fontsource/cormorant-garamond/latin-600-italic.css";

// Nunito
import "@fontsource/nunito/latin-400.css";
import "@fontsource/nunito/latin-600.css";
import "@fontsource/nunito/latin-700.css";
