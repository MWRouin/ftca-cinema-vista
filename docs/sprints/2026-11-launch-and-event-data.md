# Launch check, event structured data and housekeeping (2026-11-12)

The Next.js site was merged into `main` (PR #86) and deployed from `Production`. This log covers the check of the live site, the fix for the Event warnings Search Console reported, and post-launch housekeeping (this commit).

## Shipped

- **Live site checked** at `https://www.cineamateur-hlif.com` with plain HTTP requests: `http://` and the bare domain 301 to `https://www.`; `/en/movies` 301s to `/en/movies/`; un-prefixed URLs load the locale redirect; an unknown page returns a real 404. All 166 sitemap URLs return 200, as do the home page's assets and share image. Canonical, hreflang, `og:url` and `og:image` use the `www` host, and `robots.txt` points to the `www` sitemap.
- **Sitemap** holds only canonical URLs: every one locale-prefixed with a trailing slash, no duplicates.
- **Event JSON-LD** now has the fields Search Console flagged as missing on the four event pages (both locales):
  - `image`: `pageJsonLd` gives an `Event` node the page's share image when it has none (`page-seo.ts`).
  - `endDate`, `offers`, `performer` in `PAGE_SEO` (`seo-constants.ts`); free entry and the club as performer are shared as `FREE_ENTRY` and `CLUB_PERFORMER`.
- `src/lib/metadata/AGENTS.md` records what a new event's node needs.
- **Default share image self-hosted.** `DEFAULT_OG_IMAGE` was a signed URL on `opengraph.b-cdn.net`; the same 1200×1200 logo card is now `public/og-default.jpg`. Pages that use the default share image (home, about, contact, ...) change `og:image` and `twitter:image`.
- **CI checks.** New `.github/workflows/ci.yml` runs lint, `tsc --noEmit` and the build on every pull request and push to `main`; `deploy.yml` runs lint and the type check before building too. Checked in a fresh clone: the type check passes without the generated `next-env.d.ts`.
- **Module docs** for `src/components/customUi/`, `src/components/ui/` and `src/views/`; the module map in the root `AGENTS.md` is complete.
- **Housekeeping.** Plan [84](../plans/84-migrate-to-nextjs.md) marked done and deployed. Issue #84 was already closed; the `84-migrate-to-nextjs` branch was already deleted on GitHub, and the local copy is removed.

## Decisions

- **End times are approximate**, from the club: Films de Hammam-Lif ended around 20:00; the others between 22:00 and 23:00, written as 22:30. Ydour 2 ran three days (15 to 17 May 2026).
- **`endDate` carries a time**, like `startDate`. A date alone can be read as midnight, which puts a one-day event's end before its start.
- **All current events are free and performed by the club.** The offer is price 0 in TND with `availability: InStock`, since Google expects an availability on an offer.

## Left over

- Deploy, then run "Validate fix" on the Event issue in Search Console; the Rich Results Test on one event page is a quicker first check.
- The live check fetched HTML only; rendering was checked by eye by the user.
- Social networks cache share images; old shares keep the CDN image until their cache refreshes (Facebook's Sharing Debugger can force it).
- CI is not yet required for merging; that is a branch protection setting on GitHub.
