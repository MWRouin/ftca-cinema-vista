# views (page UI)

The client UI of each page. Every route file in `src/app/` is a thin server component that resolves params, builds metadata and JSON-LD, and renders one view from here.

## Boundaries

- Every view starts with `'use client'`. Views read their data from `src/data/` helpers and the URL (`useParams`), not from props passed by the route, except where a route already resolved it.
- May import `components/`, `components/customUi/`, `components/ui/`, `src/data/`, `src/i18n/`, `src/hooks/`, `src/lib/`. Imported only by routes, except `NotFound`, which the other not-found views reuse.
- No head tags or JSON-LD here; those come from `src/lib/metadata/` in the route.

## Conventions

- One PascalCase file per page (`Movies.tsx`, `MoviePlayer.tsx`). Page-specific CSS sits next to the view and is imported by it (`home-hero.css`, `movie-player.css`).
- Each view uses its own i18n namespace (`useTranslation('movies')`); shared labels come from `common`.
- Event pages are in `events/`, one component per event wired to `EventDetailLayout`, and listed by id in `events/index.ts` (`EVENT_VIEWS`). A new event needs an entry there and in `src/data/events.json`, plus its SEO entry (see `src/lib/metadata/AGENTS.md`).
- Links use `LocalLink`; programmatic navigation runs in a transition and reports through `useReportNavigation` (see the root `AGENTS.md`).

## Traps

- Views are prerendered: no `window`, `localStorage` or clock reads during render (see the root `AGENTS.md`).
- A language switch remounts the view, so local state and entrance animations reset.
- Not-found cases are handled in the route with `notFound()`; the not-found branches still in `MoviePlayer`, `Person` and `BlogArticle` are never reached.
- `NotFound` is the in-locale 404; `GlobalNotFound` is `404.html`, rendered outside the locale layouts.

## Verify

`npx tsc --noEmit`, `npm run lint`, `npm run build`, then check the page in `out/` (or `npm run dev`) in both locales.
