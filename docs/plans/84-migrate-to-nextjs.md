# Plan: Migrate to Next.js

Status: active · Issue: #84 · Branch: `84-migrate-to-nextjs`

## Context

The site is a Vite + React 18 SPA (react-router, i18next, Tailwind, shadcn/Radix) deployed to GitHub Pages from `Production` as a static `dist/`. SEO works only through custom post-build code: `scripts/staticPagesGenerator.js` (per-page HTML, locale redirect stubs, 404.html), `scripts/sitemapGenerator.js`, a client-side `MetaHeader` that mutates `<head>`, and a font-preload Vite plugin. The June 2026 report ([`REPRODUCTION_REPORT.md`](../research/REPRODUCTION_REPORT.md)) decided on **Next.js App Router with `output: 'export'`**, and we confirmed Next.js over Nuxt/Astro/Preact. Goal: move to Next.js while staying fully static, reusing components and the data layer, and replacing the custom SEO/build plumbing with built-in features.

## Audit summary (what the migration touches)

- **Size:** ~2.5k lines in 14 pages + 4 hard-coded event pages, 8 shadcn UI primitives, ~17 custom UI components. Small enough to port page by page.
- **Routing:** react-router with two locale branches (`/en/*`, `/fr/*`), every URL locale-prefixed with a trailing slash. `/` and un-prefixed legacy URLs redirect by stored preference, browser language, then default. Routes: home, movies, `movies/:id`, events (+4 fixed event pages), blog, `blog/:slug`, about, `people/:id`, palmares, contact, 404.
- **i18n:** i18next with 11 namespaces × 2 locales bundled statically; locale comes from the URL; `src/i18n/config.ts` is already framework-agnostic.
- **Data:** static JSON and TS (`movies.json`, `people.json`, `blog.ts`, `scripts/events.json`, `scripts/pages.json`). The helpers are shared by the app and the build scripts, which is a good base for `generateStaticParams`. Vite-only coupling is limited to `import.meta.env` (`BASE_URL`, `VITE_BASE_PATH`) in about 8 places.
- **SEO:** `MetaHeader` (client-side head manipulation), `seo-constants.ts` (reusable), the JSON-LD in `index.html`, and the generator scripts for hreflang, canonical, redirect stubs and the sitemap.
- **Browser-only code:** theme provider, locale storage, lightbox, scroll animation, share actions. These become client components.
- **Unused or removable:** `@tanstack/react-query` is wired in `App.tsx` but not used by any page. The `lovable-tagger` plugin was already removed.
- **Build and deploy:** `npm run build` runs Vite and then two scripts, outputting `dist/`. GitHub Actions builds on pushes to `Production` and deploys to Pages. The custom domain is `cineamateur-hlif.com`, with the base path set by `VITE_BASE_PATH`.
- **Known risks:** Radix select/slider and Embla in client components; GitHub Pages 404 and trailing-slash behaviour under static export; keeping legacy un-prefixed URLs and the locale redirect working without a server; two known security advisories (vite/esbuild, react-router) that this migration removes.

## Milestones

Each milestone is a goal only. The how and the implementation details are decided when that milestone starts. Milestones in the same wave have no dependency on each other and can run in parallel.

**Wave 1: foundations (parallel)**
- **M1. Scaffold** (done): Next.js 16 (App Router, static export, TypeScript, Tailwind, path alias) set up in place. `src/pages` was renamed `src/views` (Next reserves `src/pages`), React was upgraded to 19 (required by the App Router) with the Radix and Embla packages that needed it, and the Vite app still builds. `npm run next:dev` / `next:build` run the new app from `src/app`.
- **M2. Parity baseline** (done): `tools/parity.mjs` snapshots any static build (URLs, head metadata, JSON-LD, hreflang, sitemap) and diffs two snapshots. The Vite build is recorded in `docs/research/parity-baseline.json` (253 pages, 83 of them redirect stubs; 168 sitemap URLs).

**Wave 2: shared layer (parallel, after M1)**
- **M3. Shell and routing** (done, except legacy URLs): `app/[locale]/layout.tsx` is a root layout (correct `lang`/`dir` per locale) wrapping theme, i18n, navigation and footer; fonts stay on `@fontsource` with the above-the-fold files preloaded; a second root layout serves `/` (locale redirect); `app/global-not-found.tsx` produces `404.html`. The Vite app is frozen from here. Redirects for the 82 un-prefixed legacy URLs wait for the page list (M7 to M9, checked at M12).
- **M4. i18n and data layer** (done): i18next kept (same `t()` API), with a framework-agnostic `createI18n`/`getT` for server code and an `I18nProvider` for client components. `import.meta.env` removed from `src/data` and the views via one shared `src/lib/base-path.ts`. The Vite build output is unchanged (parity diff empty).
- **M5. UI primitives check** (done at build level): Radix Select/Slider, Embla slider, lucide icons and `LazyImage` prerender inside a client page; interactive behaviour still needs a manual check.
- **M6. CI/CD prep** (done): `.github/workflows/next-build.yml` builds the Next app on this branch and keeps `out/` as an artifact without deploying; the cutover steps are in its header. `deploy.yml` is unchanged until M12.

**Wave 3: page ports (parallel, after M3 + M4 + M5)**
- **M7. Content pages:** Home, About, Palmarès, Contact.
- **M8. Movies and people** (done): movie list, movie detail and person pages ported as client views behind thin route files; `generateStaticParams` produces all 35 movies and 35 people per locale. The URL set matches the baseline exactly (140 pages). Head metadata waits for M10.
- **M9. Events and blog:** events list, the four event pages, blog list and article.
- **M10. SEO layer:** per-page metadata, JSON-LD, hreflang and canonicals, sitemap and robots, replacing `MetaHeader` and the two generator scripts. It runs alongside M7–M9 and is applied page by page.

**Wave 4: cleanup and verification**
- **M11. Cleanup:** remove Vite, react-router, the old scripts and plugin, and `react-query`. Update the ESLint and TS configuration.
- **M12. Parity and cutover:** compare against the M2 baseline, check legacy URL redirects, run performance and accessibility checks, merge, and switch the deploy.

## Dependency overview

```
M1 ─┬─> M3 ─┐
    ├─> M4 ─┼─> M7, M8, M9 ─┐
    ├─> M5 ─┘               ├─> M11 ─> M12
    └─> M6                  │
M2 ───────────> M10 ────────┘   (M10 also needs M3 + M4)
```

## Verification (end to end)

- `npm run build` produces a static output; every route in the M2 baseline exists with the same URL.
- Per-page metadata, JSON-LD, hreflang, canonical and `sitemap.xml` match the baseline, and are in the raw HTML (check with `curl`, not a browser).
- `/` and un-prefixed legacy URLs still reach the right locale; unknown URLs return the 404 page.
- Manual check of movie filters, lightbox, theme and language toggles, plus a mobile layout pass.
- The deploy workflow builds and publishes from the new output on a test run.

## Open decisions (made at the start of the relevant milestone)

Next.js version and exact i18n approach (M4), how to keep the un-prefixed legacy URLs working on static hosting (M3 and M12), and whether to use `next/image` given the static export (M7–M9).
