# Movies and people on Next.js (2026-11-12)

## Shipped

- **M8, movies and people:** `/en|fr/movies/`, `/en|fr/movies/<id>/` and `/en|fr/people/<id>/` are served by the Next app. The route files are thin wrappers; the page UI stays in `src/views/` as client components with `useParams` from `next/navigation`. `generateStaticParams` comes from `getMovies()` and `getPublicPeople()`.
- Checked against `docs/research/parity-baseline.json`: all 140 movie and people URLs exist, none missing or extra. The generated Wed Trabelsia page has the synopsis, the Technical team grid and the Actors label in English and French.
- `src/app/AGENTS.md` documents the routing structure and how to port a page.

## Decisions

- **Thin server route + client view**, not a rewrite of the views: it keeps the existing components and hooks working and leaves `generateMetadata` (M10) free to live in the route files.
- **`dynamicParams = false`** on detail routes, so unknown ids become 404s instead of empty pages.

## Left over

- Head metadata for these pages (title, description, canonical, hreflang, JSON-LD) is still the client-side `MetaHeader`; the static HTML has no `<title>` yet (M10).
- Not checked in a browser: movie search, genre and year filters, and the movie and person pages at runtime.
- The Vite app has been broken since M3 (see the M3 log); `src/views` still imports `MetaHeader`, which goes away at M10.
- M7 (content pages) and M9 (events and blog) are still to port; the legacy un-prefixed URLs need the full page list.
