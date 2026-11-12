# metadata (SEO)

Everything that ends up in a page's `<head>` and structured data. The static HTML must carry it (crawlers and social bots don't run JS), so it is all computed on the server at build time.

## Layout

- `seo-constants.ts`: site constants, `PAGE_SEO` (EN) and `PAGE_SEO_FR` for the fixed pages, URL helpers (`localizedPageUrl`, `hreflangAlternates`, `buildBreadcrumbList`). No React or Next imports.
- `page-seo.ts`: builds a `Seo` object per page kind (`staticPageSeo`, `movieSeo`, `eventSeo`, `articleSeo`, `personSeo`), `pageJsonLd` (page nodes plus breadcrumb) and the site-wide `SITE_JSON_LD`. Framework-agnostic.
- `next-metadata.ts`: turns a `Seo` into Next.js `Metadata` (`buildMetadata`, `staticMetadata`), plus `SITE_METADATA`/`SITE_VIEWPORT` for the root layouts.
- `site-pages.ts`: the list of sections and their child ids, used by the legacy redirect routes.
- Rendering: `components/JsonLd.tsx` (`<PageJsonLd>`), `app/sitemap.ts`, `public/robots.txt`.

## Rules

- A new fixed page needs an entry in `PAGE_SEO` (and `PAGE_SEO_FR`), a line in `app/sitemap.ts`, and a legacy redirect route in `app/(root)/`.
- Page URLs in metadata always come from `localizedPageUrl` (locale prefix, trailing slash). JSON-LD `url`/`mainEntityOfPage` are overwritten with it in `pageJsonLd`.
- Open Graph types are limited to the ones Next accepts (`NEXT_OG_TYPES`); others fall back to `website`.
- Don't set head tags from client components; there is no client-side head management any more.

## Verify

`npm run build`, then `node tools/parity.mjs snapshot out /tmp/next.json` and `node tools/parity.mjs diff docs/research/parity-baseline.json /tmp/next.json`. The "Changed fields" list should only contain the known differences recorded in `docs/sprints/2026-11-nextjs-seo.md`.
