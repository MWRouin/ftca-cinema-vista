# FTCA Cinema Vista

Website of the Hammam-Lif Amateur Filmmakers Club (FTCA): films, events, blog, members, palmarès. Static site, no backend; all content lives in the repo. Public domain: `cineamateur-hlif.com`.

## Current state

Vite + React 18 + TypeScript SPA (react-router, i18next, Tailwind, shadcn/Radix), being migrated to **Next.js App Router with static export**. See [docs/plans/84-migrate-to-nextjs.md](docs/plans/84-migrate-to-nextjs.md) (issue #84, branch `84-migrate-to-nextjs`). Until the migration lands, work in `src/` follows the current Vite structure.

## Commands

- `npm run dev`: dev server on `http://localhost:8080`
- `npm run build`: Vite build, then `scripts/sitemapGenerator.js` and `scripts/staticPagesGenerator.js` into `dist/`
- `npm run lint`: ESLint
- No test suite. Verify with `npx tsc --noEmit -p tsconfig.app.json` and `npx vite build`.
- Deploy: pushes to `Production` build and publish to GitHub Pages (`.github/workflows/deploy.yml`).

## Conventions

- **Commits:** a single title line only. No body, no `Co-Authored-By` line. Commit only when asked.
- **Warnings:** don't mute tooling warnings (Browserslist, npm audit, etc.). Fix the cause or leave them visible and mention them.
- **Package manager:** npm only (`package-lock.json`). There is no bun/yarn lockfile.
- **URLs:** every page is locale-prefixed with a trailing slash (`/en/movies/`, `/fr/movies/`). Un-prefixed URLs redirect to a locale. Use `LocalLink`/`localizePath`, not raw paths.
- **Asset URLs in JSON data:** write `__BASE_URL__/Posters/x.jpg`; it's resolved at load time. Files go in `public/`.
- **Posters:** 2:3 portrait, 1000×1500 is the common size. Reduce dimensions rather than compressing further. Crop to 2:3.
- **Person portraits:** square, saved in `public/Members/`.
- **Pronouns and gender in data:** `gender` on a person only selects the actor/actress label; never infer it elsewhere.

## Data rules worth knowing

- `movies.json`: `public` controls listing. `playerVisible` controls the embedded video. `duration` is whole minutes written like `10'`.
- Credits use roles `director`, `actor` plus crew roles (`writer`, `editor`, `cinematographer`, `sound`, `sound-mixing`, `logistics`, `voice-over-direction`, `voice-over`, `subtitles`, ...). A credit is either a `personId` (links to a person) or a free-text `name`.
- `people.json`: a person has a public page if `public: true`, or is an active member, or has any film credit (`isPersonPublic` in `src/data/movies.ts`). `"public": false` does not hide anyone who qualifies another way.
- Image-less items must not show a loader: `LazyImage` renders a placeholder when `src` is empty or fails.

## Module map

Each module gets its own `AGENTS.md` (read when you work in that folder), plus a one-line `CLAUDE.md` containing `@AGENTS.md` so Claude Code loads it too. Not all exist yet; they are added as modules are ported or refactored.

| Module | Purpose | AGENTS.md |
|---|---|---|
| `src/data/` | Movies, people, blog content and helpers | to add |
| `src/i18n/` | Locales, translation catalogs, locale routing helpers | to add |
| `src/lib/metadata/` | SEO constants and page metadata | to add |
| `src/components/customUi/` | Shared presentational components | to add |
| `src/components/ui/` | shadcn primitives | to add |
| `src/pages/` | Route-level pages | to add |
| `scripts/` | Sitemap and static page generation (to be replaced by Next.js) | to add |

## Documentation workflow

Agents working here keep the docs current as part of the work:

- **Plans** go in `docs/plans/<issue#>-<name>.md` (milestone-level, with a status line) before large work starts.
- **Sprint log:** when a body of work or a PR is wrapped up, add a log to `docs/sprints/` and its row to `docs/README.md`. Claude Code has this as the `sprint-log` skill (`.claude/skills/sprint-log/`); other agents follow the template in `docs/README.md`.
- **Module docs:** when you add, port, restructure or remove a module, write or update its `AGENTS.md` (and the one-line `CLAUDE.md` import) and the module map above. Claude Code has this as the `module-docs` skill (`.claude/skills/module-docs/`).
- Don't duplicate what the code already says, and don't commit docs unless asked.

## Docs

- [docs/README.md](docs/README.md): index of plans and sprint logs, and how to write them.
- Plans go in `docs/plans/`, sprint logs in `docs/sprints/`.
