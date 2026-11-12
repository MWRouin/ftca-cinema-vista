# Next.js cleanup and cutover prep (2026-11-12)

## Shipped

- **M11, cleanup:**
  - Removed the frozen Vite app (`index.html`, `vite.config.ts`, `src/App.tsx`, `src/main.tsx`, `src/vite-env.d.ts`, `src/i18n/index.ts`), `scripts/` (static page and sitemap generators, `pages.json`), the Vite tsconfigs and the tracked `.env` (it only held `VITE_BASE_PATH`).
  - Dependencies removed: `react-router-dom`, `@tanstack/react-query`, `vite`, `@vitejs/plugin-react-swc`, `tsx`, `eslint-plugin-react-refresh`.
  - One `tsconfig.json`; npm scripts are now `dev`, `build` and `lint`; the package is named `ftca-cinema-vista` (it was still the scaffold's `vite_react_shadcn_ts`).
  - `src/lib/base-path.ts` no longer reads Vite's env. README rewritten for the Next.js setup. `AGENTS.md` files updated, including a rule about server-rendered markup.
- **M12, cutover prep:**
  - `.github/workflows/deploy.yml` publishes `out/` (the build command was already `npm run build`); the temporary `next-build.yml` workflow is removed. `public/.nojekyll` added so the `_next/` folder is always served.
  - Final parity run on the cleaned-up build: identical to the M10 result (same pages and sitemap URLs; only the known head differences listed in the [M10 log](2026-11-nextjs-seo.md)).
  - `npm audit`: the Vite, esbuild and react-router advisories are gone with those packages. 7 moderate ones remain, all `minimatch` through `typescript-eslint` (lint tooling only).

## Decisions

- **Not merged and not pushed**, at the maintainer's request: the branch is ready for review, and the deploy only changes when `Production` receives these commits.
- **`.env` deleted** rather than renamed: the site is served from `/`, so no base path is needed. `NEXT_PUBLIC_BASE_PATH` plus `basePath` in `next.config.mjs` is the way back if that changes.
- **ESLint left as it was** (minus the Vite-only plugin): adding `eslint-config-next` is a separate change with its own findings.

## Left over

- **Before merging:** a browser pass over the whole site (navigation, theme and language toggles, movie filters, galleries and lightbox, contact mailto, the redirect pages, the 404 page), plus a quick performance and accessibility check. None of this was done; verification so far is builds, type checks and comparing the generated HTML.
- The first deploy from `Production` is the real test of the workflow; it could not be run from here.
- `npm run lint` reports two errors that predate the migration (`src/components/ui/textarea.tsx`, `tailwind.config.ts`).
- `src/app/[locale]/m5-check/` is a temporary, uncommitted page for checking Radix and Embla by hand; delete it after the browser pass.
- Odd values kept for parity (see the M10 log): JSON-LD `duration` format, `WebSite.inLanguage`, English person descriptions on French pages.
- `src/views/` and `src/components/` have no `AGENTS.md` yet. `experimental.globalNotFound` should be re-checked on Next upgrades.
- `docs/research/REPRODUCTION_REPORT.md` describes the old Vite site and the backend/edit-mode plans, which are not started.
