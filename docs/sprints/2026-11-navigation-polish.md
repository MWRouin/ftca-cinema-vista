# Navigation polish after the migration (2026-11-12)

Fixes for things that felt worse than the old SPA once the site ran on Next.js (branch `84-migrate-to-nextjs`, this commit). Each was measured on a production build in headless Chrome, before and after.

## Shipped

- **Theme flicker on a language switch.** `<html>` lives in `src/app/[locale]/layout.tsx`, so a switch remounts the whole tree and React resets the attributes of `<html>`; the `light`/`dark` class was missing for about 20 ms. `ThemeProvider` now keeps the theme in a module-level store (`useSyncExternalStore`) and reapplies the class in a layout effect, before paint. A theme change in another tab now applies too.
- **Scroll to top on a page change** was animated (about 600 ms) and stopped 64px short. Cause: `scroll-behavior: smooth` on `html`. `<html>` now has `data-scroll-behavior="smooth"`, Next's switch to turn it off during a navigation.
- **Navigation progress bar.** A 3px primary-green bar at the top while a page loads, shown only after 150 ms, filling to the end and fading when the page arrives (`components/NavigationProgress`, `src/lib/navigation-progress.ts`). `LocalLink` reports through `useLinkStatus`; `LanguageToggle` navigates in a transition and reports too.
- **404 page.** `404.html` (`app/global-not-found.tsx`) was a bare bilingual page. It now renders the site shell and the "Oops! Page not found" message in the URL's language and the saved theme (`views/GlobalNotFound`, `localeForUrl` in `src/lib/locale-redirect.ts`). The status is still 404; the old text stays as a `<noscript>` fallback.
- **One not-found message.** The per-section cards in `MoviePlayer`, `Person` and `BlogArticle`, `NotFoundCard` and their `notFound*` strings are removed; those branches show the generic 404.
- **Unused CSS removed** from `src/index.css` (512 to 329 lines): the utilities listed as left over in [2026-11-code-cleanup](2026-11-code-cleanup.md), their theme overrides, and six unused keyframes (`shimmer`, `loading-shimmer`, `fadeSlideDown`, `fadeSlideUp`, `grain`, `scrollPulse`).

## Decisions

- **A language switch stays a real route change**, and the remount it causes is made invisible instead. Swapping the language in place (with `history.replaceState`) would keep the locale in two places and leave the title, meta tags and JSON-LD in the old language.
- **No `loading.tsx`.** All content is bundled, so a full loading page would only flash on fast navigations. The previous page stays visible and the delayed bar gives feedback on slow ones.
- **No per-section "movie not found" pages.** They were built on the smart 404 and then dropped: one generic message everywhere was preferred.
- **404 language** for a URL without a locale prefix follows the root redirect: saved choice, then browser language, then English.

## Left over

- Checked in headless Chrome only, not by eye in a real browser.
- A language switch still remounts the page, so image fade-ins and entrance animations replay, and the progress bar disappears without its fill-and-fade finish.
- `404.html` is blank (but themed) until JavaScript runs, and its tab title is English only.
- The bar's initial creep uses CSS `@starting-style`; a browser without it shows the bar at 90% at once.
- Now unreferenced in `public/`: `cinema-doodle-set_160308-188.svg` and `.jpg`, `cinema-film-remove-svgrepo-com.svg`.
- CSS variables and the unused catalog keys (`home.events.*`, `events.noUpcoming`, `events.checkBackSoon`) were not audited.
- Movie, person and article views still keep a not-found branch that the routes never reach.
- The dev server console was not checked for hydration warnings.
