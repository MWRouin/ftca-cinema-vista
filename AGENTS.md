# FTCA Cinema Vista

Website of the Hammam-Lif Amateur Filmmakers Club (FTCA): films, events, blog, members, palmarès. Static site, no backend; all content lives in the repo. Public domain: `cineamateur-hlif.com`.

## Current state

Next.js App Router with static export (`output: 'export'`), React 19, TypeScript, i18next, Tailwind, shadcn/Radix. The site was migrated from a Vite SPA in November 2026 ([docs/plans/84-migrate-to-nextjs.md](docs/plans/84-migrate-to-nextjs.md), issue #84); the old app is gone, and `docs/research/parity-baseline.json` records its output for comparison. Routes live in `src/app/` as thin server files; the page UI is in `src/views/` as client components.

## Commands

- `npm run dev`: dev server on `http://localhost:3000`
- `npm run build`: static build into `out/` (pages, metadata, sitemap)
- `npm run lint`: ESLint (clean; keep it that way)
- `node tools/resize-images.mjs` (dry run) / `--write`: shrink oversized images in `public/` in place (posters 1000×1500, portraits 800×800, other photos 2000px), keeping the originals in `archive/originals/`. Run it after adding images.
- `node tools/parity.mjs snapshot <dir> <out.json>` / `diff <a> <b>`: compare a build's pages and head data with `docs/research/parity-baseline.json`
- No test suite. Verify with `npx tsc --noEmit` and `npm run build`, then check the HTML in `out/`.
- Deploy: pushes to `Production` build and publish `out/` to GitHub Pages (`.github/workflows/deploy.yml`). `Production` only takes pull requests from `main` (`.github/workflows/production-guard.yml`, a required check).
- Versioning: each PR merged into `main` is tagged `vX.Y.Z` (`.github/workflows/version.yml`). GitHub Releases are written per deploy, not per version: `deploy.yml` releases the newest version in `Production`, with notes covering everything since the previous Release. The patch number goes up on every merge, the minor number on PRs labelled `minor` (a change visitors can see: a new page, feature or language). The major number changes only when someone pushes a `vX.0.0` tag by hand.

## Conventions

- **Commits:** a single title line only. No body, no `Co-Authored-By` line. Commit only when asked.
- **Warnings:** don't mute tooling warnings (Browserslist, npm audit, etc.). Fix the cause or leave them visible and mention them.
- **Agent memory lives in the repo.** Don't use Claude's filesystem auto-memory (`~/.claude*/projects/*/memory`). Record durable guidance here in `AGENTS.md` (or in the relevant module's `AGENTS.md`), plans in `docs/plans/`, history in `docs/sprints/`.
- **Package manager:** npm only (`package-lock.json`). There is no bun/yarn lockfile.
- **URLs:** every page is locale-prefixed with a trailing slash (`/en/movies/`, `/fr/movies/`). `/` and un-prefixed URLs (`/movies/trip/`) redirect to a locale. Use `LocalLink`/`localizePath`, not raw paths.
- **Navigation progress:** a thin bar (`components/NavigationProgress`) shows while a page loads. `LocalLink` reports to it by itself; a navigation made with `router.push` must run in a transition and report through `useReportNavigation` (`src/lib/navigation-progress.ts`), as `LanguageToggle` does. There is deliberately no `loading.tsx`.
- **Asset URLs in JSON data:** write `__BASE_URL__/Posters/x.jpg`; it's resolved at load time. Files go in `public/`. Media kept but not published goes in `archive/public/`, full-size originals of resized images in `archive/originals/` (both with the same paths as under `public/`); only `public/` is deployed.
- **Posters:** 2:3 portrait, 1000×1500 is the common size. Reduce dimensions rather than compressing further. Crop to 2:3.
- **Person portraits:** square, saved in `public/Members/`.
- **Fonts:** Nunito for all text, hero included (Tailwind `font-sans`; `font-display` and `.section-title` are Nunito too, kept separate so titles can change face later), plus Noto Sans Arabic for Arabic text, self-hosted via `@fontsource` (`src/fonts.ts`), not the Google Fonts CDN; don't suggest migrating them. Import only the subsets and weights in use. Fontsource's latin subset has no arrows (→ ←): use the lucide icons instead of the characters. A cold-load flash of the wrong font is avoided by preloading the above-the-fold woff2 files listed in `src/lib/critical-fonts.ts`; if the hero's font family or weight changes, update that list. The fonts stay on `@fontsource` instead of `next/font` because the CSS refers to the literal family names.
- **Colour roles:** `primary` is the green *fill* (buttons, badges; cream text on it). Green *text*, links and icons use `brand` (`text-brand`, `--primary-text`), which is a lighter emerald in dark mode, where the fill green is too dark to read. `accent` is wheat (`#d4b46e`, both themes, also the hero's `--sand`): hairlines, quote bars, the "Join" buttons. Cards are outlined in `border-accent/30`, full wheat on hover (set in `components/ui/card.tsx`); the Movies search and filters and the contact form fields use the same faint outline. Muted text is for metadata; reading copy uses `text-foreground/85`. Keep to the tokens in `src/index.css`; no raw Tailwind palette colours.
- **Server-rendered markup:** pages are prerendered, so client components must render the same HTML on the server and on first load. Don't read `window`, `localStorage` or the clock during render (read them in an effect, or through `useSyncExternalStore` with a server snapshot as `ThemeProvider` does), and don't rely on `onLoad`-style events for elements that are already in the HTML (see `LazyImage`).
- **Language switch remounts the page:** `<html>` lives in `src/app/[locale]/layout.tsx`, so switching locale remounts the whole tree and React resets the attributes of `<html>`. State that must survive belongs outside React (see the theme store in `ThemeProvider`), and anything set on `<html>` by script must be reapplied in a layout effect.
- **Shared strings and constants:** UI labels used by shared components (share buttons, lightbox, theme toggle, aria labels) live in the `common` i18n namespace; the club's email, phone, address and form links live in `src/lib/contact.ts`. Don't hard-code either in a component.
- **Pronouns and gender in data:** `gender` on a person only selects the actor/actress label; never infer it elsewhere.

## Data rules worth knowing

- `movies.json`: `public` controls listing. `playerVisible` controls the embedded video. `duration` is whole minutes written like `10'`.
- Credits use roles `director`, `actor` plus crew roles (`writer`, `editor`, `cinematographer`, `sound`, `sound-mixing`, `logistics`, `voice-over-direction`, `voice-over`, `subtitles`, ...). A credit is either a `personId` (links to a person) or a free-text `name`.
- `events.json`: one entry per event, including what the events list shows (`time`, `image`, `status`). `status` (`upcoming`/`past`) is set by hand.
- `people.json`: a person has a public page if `public: true`, or is an active member, or has any film credit (`isPersonPublic` in `src/data/movies.ts`). `"public": false` does not hide anyone who qualifies another way.
- Image-less items must not show a loader: `LazyImage` renders a placeholder when `src` is empty or fails.

## Module map

Each module gets its own `AGENTS.md` (read when you work in that folder), plus a one-line `CLAUDE.md` containing `@AGENTS.md` so Claude Code loads it too.

| Module | Purpose | AGENTS.md |
|---|---|---|
| `src/data/` | Movies, people, blog content and helpers | [done](src/data/AGENTS.md) |
| `src/i18n/` | Locales, translation catalogs, locale routing helpers | [done](src/i18n/AGENTS.md) |
| `src/lib/metadata/` | SEO constants, page metadata and JSON-LD | [done](src/lib/metadata/AGENTS.md) |
| `src/components/customUi/` | Shared presentational components | [done](src/components/customUi/AGENTS.md) |
| `src/components/ui/` | shadcn primitives | [done](src/components/ui/AGENTS.md) |
| `src/app/` | Next.js routes, layouts, 404 and root redirect | [done](src/app/AGENTS.md) |
| `src/views/` | Page UI components (client) used by the routes | [done](src/views/AGENTS.md) |

## Documentation workflow

Agents working here keep the docs current as part of the work:

- **Plans** go in `docs/plans/<issue#>-<name>.md` (milestone-level, with a status line) before large work starts.
- **Sprint log:** when a body of work or a PR is wrapped up, add a log to `docs/sprints/` and its row to `docs/README.md`. Write it before committing so it lands in the same commit; if it was forgotten and the last commit is unpushed, amend it in. Don't cite the amended commit's own hash in the log (say "this commit"). Claude Code has this as the `sprint-log` skill (`.claude/skills/sprint-log/`); other agents follow the template in `docs/README.md`.
- **Module docs:** when you add, port, restructure or remove a module, write or update its `AGENTS.md` (and the one-line `CLAUDE.md` import) and the module map above. Claude Code has this as the `module-docs` skill (`.claude/skills/module-docs/`).
- **These instructions and skills are living documents.** Improve `AGENTS.md`, module `AGENTS.md` files and the skills in `.claude/skills/` when you find a gap, a wrong or stale statement, or a step that kept getting forgotten. Keep edits small and mention them to the user.
- Don't duplicate what the code already says, and don't commit docs unless asked.

## Docs

- [docs/README.md](docs/README.md): index of plans and sprint logs, and how to write them.
- Plans go in `docs/plans/`, sprint logs in `docs/sprints/`.
