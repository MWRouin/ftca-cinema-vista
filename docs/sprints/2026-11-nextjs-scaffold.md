# Next.js scaffold and parity baseline (2026-11-11)

## Shipped

- **M1, scaffold** (`4c716c9`): Next.js 16 with App Router and static export, set up in place. Config in `next.config.mjs` and `tsconfig.next.json`, placeholder app in `src/app/` (`/en/` and `/fr/`), `npm run next:dev` and `next:build`. `src/pages` renamed `src/views`. React upgraded to 19 with newer Radix and Embla packages. The Vite app still builds.
- **M2, parity baseline** (this commit): `tools/parity.mjs` (snapshot and diff of any static build) and the Vite build recorded in `docs/research/parity-baseline.json` (253 pages, 83 redirect stubs, 168 sitemap URLs).

## Decisions

- **Migrate in place, not in a separate folder.** Chosen by the user. Next reserves `src/pages`, so the old folder had to be renamed, and a single tree avoids duplicate setups; `main` keeps the old version.
- **Next 16 (16.4.6)**, the current release.
- **React 19 is required.** Next's App Router uses React 19 internally, so the upgrade was not optional. Radix and Embla were updated to versions that support it.
- **Separate `tsconfig.next.json`** so Next doesn't rewrite the Vite tsconfig files while both apps exist; it goes away at cleanup (M11).
- **`tools/` for the parity script**, outside `scripts/`, because `scripts/` is deleted at M11 and the script is needed again at M12.

## Left over

- M3 to M12 (shell and routing, i18n and data, UI primitives check, CI/CD prep, page ports, SEO layer, cleanup, cutover); see the [plan](../plans/84-migrate-to-nextjs.md).
- `/` returns 404 on the Next app until M3 adds the locale redirect.
- The Vite bundle grew from about 114 KB to 137 KB gzipped after the React 19 and Radix upgrade; it disappears with Vite at M11.
- After the upgrade, only the builds were checked (`tsc`, `vite build`, `next build`), not the UI. The Radix filters, Embla carousel, lightbox and theme and language toggles still need a manual click-through.
- `npm audit` was not re-run after the dependency upgrade.
- ESLint is not configured for the Next app yet.
- Local Node is 20.19 and CI uses 24; Next 16 needs 20.9 or newer.
- The baseline file is about 785 KB; fine for now, could be compacted if it bothers.
