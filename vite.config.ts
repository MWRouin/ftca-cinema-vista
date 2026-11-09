import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Fonts used above the fold on first paint (hero heading/body), self-hosted via
// @fontsource (see src/fonts.ts). Preloading their woff2 files lets the browser
// fetch them in parallel with the CSS instead of only discovering them once the
// stylesheet is parsed — this is what closes the brief fallback-font flash on a
// cold load, since the files are already same-origin.
const CRITICAL_FONT_PATTERNS = [
  /^assets\/cormorant-garamond-latin-600-normal-.*\.woff2$/,
  /^assets\/cormorant-garamond-latin-600-italic-.*\.woff2$/,
  /^assets\/inter-latin-400-normal-.*\.woff2$/,
  /^assets\/inter-latin-600-normal-.*\.woff2$/,
];

function preloadCriticalFonts(base: string): Plugin {
  return {
    name: "preload-critical-fonts",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const bundle = ctx.bundle;
        if (!bundle) return html;
        const fontFiles = Object.keys(bundle).filter((file) =>
          CRITICAL_FONT_PATTERNS.some((re) => re.test(file))
        );
        if (fontFiles.length === 0) return html;
        const links = fontFiles
          .map(
            (file) =>
              `  <link rel="preload" as="font" type="font/woff2" crossorigin href="${base}${file}">`
          )
          .join("\n");
        return html.replace("</head>", `${links}\n</head>`);
      },
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Ensure base ends with a slash when set (Vite expects a trailing slash)
  const baseFromEnv = env.VITE_BASE_PATH || "/ftca-cinema-vista/";
  const base = baseFromEnv.endsWith("/") ? baseFromEnv : `${baseFromEnv}/`;

  return {
    base,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
      mode !== 'development' && preloadCriticalFonts(base),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
