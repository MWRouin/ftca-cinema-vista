# SEO layer on Next.js (2026-11-12)

## Shipped

- **M10, SEO layer:**
  - `src/lib/metadata/page-seo.ts` builds the SEO data for every page kind (ported from the old static generator); `next-metadata.ts` turns it into Next `Metadata`. Every route has `generateMetadata` and a server-rendered `<PageJsonLd>`; the layouts add the site-wide Organization and WebSite nodes, icons, manifest and theme colour.
  - `src/app/sitemap.ts` generates `sitemap.xml` (hreflang alternates and images included); the stale `public/sitemap.xml` is gone. `public/robots.txt` is unchanged.
  - Redirect pages for un-prefixed URLs under `src/app/(root)/` (`/movies/`, `/movies/<id>/`, …), noindex with canonical and hreflang, same locale rule as `/`. `/` itself keeps the full site description and share card.
  - `MetaHeader`, `html-lang.ts` and `scroll-to-top.tsx` deleted; views no longer touch the head.
- **Fix:** pages with non-ASCII ids (`l-araignée`, `ذاكرة-رهينة`) were rendering the 404 page since M8, because Next passes those route params percent-encoded. `decodeParam` (`src/lib/route-params.ts`) is now applied in the routes and views.
- `tools/parity.mjs` compares decoded text, finds JSON-LD anywhere in the document and summarises changed fields.
- `src/lib/metadata/AGENTS.md` added.

## Parity against the baseline

Same 253 pages except `/en/404/` and `/fr/404/` (dropped on purpose); sitemap URL set identical. Remaining head differences, all intended or cosmetic:

- `viewport` is `initial-scale=1` instead of `1.0` (all pages).
- `og:image:width/height` (1200×1200) are only emitted for the default share image; the old site claimed that size for every poster and portrait (157 pages).
- Canonical, hreflang and `og:url` of the two non-ASCII movie pages are percent-encoded (same URLs).
- The blog index `og:type` is `website` instead of the deprecated `blog`, which Next rejects.
- `/`: canonical-based `og:url` (`/en/`), slightly different default title and description strings, plus `og:locale:alternate`.
- Redirect pages now carry `theme-color`. `404.html` is a real not-found page (noindex) instead of a copy of the app shell.
- Movies without a numeric year no longer emit `dateCreated`, and a movie without a poster uses the default share image instead of a broken URL.

## Decisions

- **Parity first:** values were kept identical to the old output even where they look odd (for example `WebSite.inLanguage` is `en` on French pages, person descriptions are English in both locales, movie `duration` is `10'` not ISO 8601). Improving them is separate work, so the migration diff stays explainable.
- **Legacy redirects as real routes** in the `(root)` group rather than a post-build script, so `scripts/` can be deleted at M11 and the redirects work in dev too.
- **JSON-LD in the body** (server-rendered `<script type="application/ld+json">`), the pattern Next recommends; search engines read it there.

## Left over

- M11: delete the frozen Vite app, `scripts/`, react-router, `@tanstack/react-query`, `src/i18n/index.ts`, and the Vite tsconfig/eslint settings; rename the npm scripts.
- M12: browser pass, `deploy.yml` switch to `out/`, merge.
- Not checked in a browser: that the JSON-LD scripts raise no React console warning on client navigation, the redirect pages, and the two non-ASCII movie pages after hydration.
- The odd values listed under "Parity first" above.
- `src/app/[locale]/m5-check/` is still a temporary, uncommitted page.
