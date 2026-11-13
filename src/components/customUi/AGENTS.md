# customUi (shared components)

Presentational building blocks shared by the views: cards, page titles and containers, images and lightbox, event detail layout, share and social links.

## Boundaries

- Used by `src/views/` and by each other. May import `components/ui/`, `src/data/` types and helpers, `src/i18n/locale` (`LocalLink`), `src/hooks/` and `src/lib/`.
- Not imported by `src/app/` route files. None has a `'use client'` line: they run as client code because the views that import them are client components. Several use hooks, so importing one from a server file fails; add `'use client'` to it first.
- No data fetching and no head tags. Text comes in as props or from the `common` i18n namespace (share, lightbox and aria labels); don't hard-code UI strings.

## Conventions

- Kebab-case file names (`movie-card.tsx`), named exports, except `ShareActions` (default export).
- Internal links go through `LocalLink` (locale prefix, trailing slash). Asset paths are root-relative (`/Posters/x.jpg`) or resolved from JSON with `__BASE_URL__`.
- Images go through `LazyImage`: it shows a placeholder, never a loader, when `src` is empty or fails.
- Pass `alt=""` when a visible title already names the image (movie-card posters, team portraits); otherwise the name is read twice. `LazyImage` then hides its placeholder from screen readers too.

## Traps

- Prerendered HTML must match the first client render. `LazyImage` reads `img.complete` in an effect because `onLoad`/`onError` have already fired before hydration. `ShareActions` reads `window.location` during render, which is safe only because its share links render after a click (`open`); keep it that way.
- `BackButton` steps back in history when `src/lib/back-navigation.ts` (fed by `Layout`) knows an in-site previous page. Anything that adds a history entry without changing page (a hash link, a push to the same URL) makes that step land on the same page; avoid it, as the skip link does.
- `Lightbox` renders through a portal into `document.body`, so it is client-only.
- `LightboxOverlay` is a modal dialog that returns focus to whatever was focused when it opened, so open it from a `<button>` (never a clickable `div`). Pass `onPrev`/`onNext` for arrow-key navigation and `label` for its accessible name.

## Verify

`npx tsc --noEmit`, `npm run lint`, `npm run build`, then open a page that uses the component in `npm run dev` and check the console for hydration warnings.
