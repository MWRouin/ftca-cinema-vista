# app (Next.js routes)

Next.js App Router, static export (`output: 'export'`, trailing slashes). Every public page lives under `[locale]`; `/` and `404.html` are the only locale-less routes.

## Layout

- `[locale]/layout.tsx`: the root layout for all pages. Owns `<html lang dir>`, fonts, the theme script, and wraps `ThemeProvider`, `I18nProvider` and the site `Layout` (navigation, footer).
- `(root)/`: second root layout for URLs without a locale prefix: `/` and the legacy deep links (`/movies/`, `/movies/<id>/`, …). They only render `LocaleRedirect`.
- `global-not-found.tsx`: produces `404.html` (needs `experimental.globalNotFound`).
- There is intentionally no `app/layout.tsx`; two root layouts keep `lang` correct per locale.

## Porting a page

- Keep the page UI in `src/views/<Name>.tsx` as a client component (`"use client"`), and make the route file a thin server wrapper: `[locale]/<route>/page.tsx` renders `<Name />`.
- Dynamic routes set `export const dynamicParams = false` and list their params in `generateStaticParams()` from the data layer (`getMovies()`, `getPublicPeople()`); read them in the view with `useParams<{ id: string }>()`.
- Pages that are a fixed set of components (the four events) use one `[slug]` route and a registry (`src/views/events/index.ts`) instead of one folder each.
- Replace react-router (`useParams`, `useLocation`, `Link`) with `next/navigation` and `LocalLink`.
- Every route exports `generateMetadata` (via `staticMetadata` or `buildMetadata`) and renders `<PageJsonLd>`; see `src/lib/metadata/AGENTS.md`.
- Route params arrive percent-encoded for non-ASCII ids (`l-araignée`, `ذاكرة-رهينة`): pass them through `decodeParam` (`src/lib/route-params.ts`) before any lookup, in the route and in the view's `useParams`.
- Inline scripts that must run before paint go through `components/InlineScript.tsx`, never a bare `<script>`.

## Verify

`npx tsc --noEmit`, `npm run build`, then compare the generated URLs and head data with `docs/research/parity-baseline.json` using `node tools/parity.mjs`.
