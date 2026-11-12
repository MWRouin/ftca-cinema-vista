# Next.js shell and routing (2026-11-12)

## Shipped

- **M3, shell and routing:**
  - `src/app/[locale]/layout.tsx` is a root layout with `<html lang dir>` per locale and wraps theme, i18n, navigation and footer. It preloads the four above-the-fold font files (`src/lib/critical-fonts.ts`) and sets the saved theme before first paint (`src/lib/theme-script.ts`).
  - `src/i18n/locale.tsx` now provides `useLocale` and `LocalLink` on top of `next/link`; `Layout`, `Navigation` and `LanguageToggle` use `next/navigation`. The language switch keeps the scroll position, as before.
  - `src/app/(root)/` serves `/`: same locale rule as the old redirect (stored choice, then browser language, then default), with canonical, hreflang and a `noscript` refresh.
  - `src/app/global-not-found.tsx` produces `404.html`.
  - `next build` output was checked: `en` and `fr` pages have the right `lang`, translated navigation and locale-prefixed links; the preload links point to the same hashed files the CSS uses.

## Decisions

- **The Vite app is frozen from this milestone.** In-place migration means shared components now import `next/*`; keeping both apps compiling would have needed adapter layers that are thrown away at M11. The old site stays buildable from `main`, and `docs/research/parity-baseline.json` is the reference output.
- **No top-level `app/layout.tsx`.** Two root layouts (`[locale]` and `(root)`) are what let `lang` and `dir` be correct in the static HTML of each locale.
- **404 via `experimental.globalNotFound`**, because with no top-level layout there is nowhere else to render `404.html`. Revisit if the flag changes in a later Next release.
- **Theme script as an inline `<script>` in a small client component** (`ThemeScript`), not `next/script`: `next/script` queues the code until after first paint, which brings back the theme flash, and a plain server-rendered `<script>` makes React 19 log a console error when the root layout re-renders on the client (for example after a language switch). On the client the component renders the script with `type="text/template"`, which is inert and silences the warning.
- **`ThemeProvider` starts from fixed values and reads `localStorage` after mount.** Reading it during the first render made the toggle's labels differ between the server HTML ("system") and a returning visitor's browser (their saved theme), which React 19 reports as a hydration mismatch. `ThemeScript` already sets the page class early, so only the toggle icon updates after mount. Render-time `window`, `localStorage` or `Date` reads in client components should be avoided for the same reason.
- **`@fontsource` instead of `next/font`**: the CSS refers to the literal family names (`"Inter"`, `"Cormorant Garamond"`), so this keeps the look identical with no CSS changes.

## Left over

- Redirect pages for the 82 un-prefixed legacy URLs (for example `/movies/trip/`): they need the list of pages from M7 to M9 and are checked at M12.
- Per-page `<title>`, description, canonical, hreflang and JSON-LD for `/en/` and `/fr/` (M10); `out/en/index.html` has no `<title>` yet.
- The 404 page contains two `robots` meta tags (`noindex` and `noindex, follow`).
- Home is a placeholder until M7. `ScrollToTopOnLocationChange`, `MetaHeader` and `html-lang.ts` are unused and go away with M10 and M11.
- Not checked in a browser: navigation menu, theme toggle, language toggle and the hero fonts. `src/app/[locale]/m5-check/` is still a temporary, uncommitted page for the M5 manual check.
- Restart `npm run next:dev` after pulling this: the build rewrites `.next`.
