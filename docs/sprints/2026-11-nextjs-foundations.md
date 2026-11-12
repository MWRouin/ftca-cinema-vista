# Next.js foundations: i18n, data layer, primitives, CI (2026-11-11)

## Shipped

- **M4, i18n and data layer:**
  - `src/lib/base-path.ts` is the single place for the public base path and `__BASE_URL__` asset resolution. It replaces the duplicated code in `movies.ts` and `people.ts` and the `import.meta.env` reads in four views, so the data layer no longer depends on Vite.
  - `src/i18n/resources.ts` holds the catalogs; `instance.ts` (`createI18n`, `getT`) serves server code, and `provider.tsx` (`I18nProvider`) serves client components. The Next app translates in both server and client components in the static HTML (checked for `en` and `fr`).
  - The Vite build output is unchanged: `tools/parity.mjs` shows no difference against the baseline (253 pages, 168 sitemap URLs).
- **M5, UI primitives:** Radix Select and Slider, the Embla gallery, lucide icons and `LazyImage` build and prerender inside a client page of the Next app.
- **M6, CI/CD prep:** `.github/workflows/next-build.yml` builds the Next app on this branch and keeps `out/` as an artifact. It does not deploy; `deploy.yml` is untouched until M12.
- **Docs:** `AGENTS.md` for `src/data/` and `src/i18n/` (with `CLAUDE.md` imports), plan statuses updated. The `sprint-log` skill and `AGENTS.md` got the "write the log before committing" rule and the "living documents" rule.

## Decisions

- **Keep i18next** (and react-i18next) instead of switching to `next-intl`: the same `t()` calls and the same 22 catalog files keep working, so the page ports don't need a translation rewrite.
- **One shared base-path helper** rather than a Next-only one, so the Vite app, the Next app and the build scripts can't drift while both exist.
- **The Next workflow builds but doesn't deploy**, so a manual or branch run can't replace the live site with an unfinished app.

## Left over

- **M3, shell and routing:** root layout and `<html lang>` per locale, theme, navigation, footer, `next/font`, the `/` locale redirect and the 404 page. `src/app/[locale]/page.tsx` and `nav-sample.tsx` are placeholders for the M4 check.
- Page ports M7 to M9 and the SEO layer M10; see the [plan](../plans/84-migrate-to-nextjs.md).
- M5 was only checked at build and prerender level. Opening the select, dragging the slider, the carousel and the lightbox still need a manual check at `/m5-check/` (a temporary page, not committed; delete it afterwards).
- `src/i18n/index.ts` and `locale.tsx` still serve the Vite app; they go away at M11.
- ESLint isn't configured for the Next app, and `npm audit` was not re-run.
