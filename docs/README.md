# Docs

Working documents for the project, kept in the repo so they're shared and versioned. The root [`AGENTS.md`](../AGENTS.md) is the entry point; per-module `AGENTS.md` files sit next to the code they describe. Every `AGENTS.md` has a sibling `CLAUDE.md` containing only `@AGENTS.md`, so Claude Code (which reads `CLAUDE.md`) loads the same content as other agents.

## Plans

One file per plan in `docs/plans/`, named `<issue#>-<short-name>.md`. Plans are milestone-level: goals and dependencies, not implementation details. Decide the how when the milestone starts.

Each plan starts with a status line: `Status: draft | active | done | dropped`, and the issue and branch.

| Plan | Status |
|---|---|
| [84-migrate-to-nextjs](plans/84-migrate-to-nextjs.md) | done and deployed |

## Research

Background analysis that informs plans, in `docs/research/`. Not kept up to date.

- [REPRODUCTION_REPORT.md](research/REPRODUCTION_REPORT.md): June 2026 audit of the site and the options for a rebuild (basis for the Next.js decision).
- [ui-ux-audit-2026-11.md](research/ui-ux-audit-2026-11.md): November 2026 UI/UX audit of the Next.js site, 23 findings by priority; the quick wins are done.

## Sprint logs

One file per sprint in `docs/sprints/`, named `YYYY-MM-<name>.md`, written when the sprint ends. Keep them short.

Template:

```markdown
# <Sprint name> (YYYY-MM-DD to YYYY-MM-DD)

## Shipped
- What changed, with PR/issue/commit links.

## Decisions
- Decision, and why (so it isn't re-litigated).

## Left over
- What wasn't done, and where it's tracked.
```

| Sprint | Summary |
|---|---|
| [2026-11-movie-data-and-docs](sprints/2026-11-movie-data-and-docs.md) | Movie data fixes, crew credits, gender labels, cleanup, docs structure |
| [2026-11-skills-and-synopsis](sprints/2026-11-skills-and-synopsis.md) | Docs skills and rules, Wed Trabelsia synopsis |
| [2026-11-nextjs-scaffold](sprints/2026-11-nextjs-scaffold.md) | Next.js scaffold (M1), parity baseline (M2) |
| [2026-11-nextjs-foundations](sprints/2026-11-nextjs-foundations.md) | i18n and data layer (M4), UI primitives check (M5), CI prep (M6) |
| [2026-11-nextjs-shell](sprints/2026-11-nextjs-shell.md) | Shell, locale routing, `/` redirect and 404 (M3) |
| [2026-11-nextjs-movies-people](sprints/2026-11-nextjs-movies-people.md) | Movie list, movie and person pages (M8) |
| [2026-11-nextjs-events-blog](sprints/2026-11-nextjs-events-blog.md) | Events and blog pages (M9) |
| [2026-11-nextjs-content-pages](sprints/2026-11-nextjs-content-pages.md) | Home, About, Palmarès, Contact (M7); all pages ported |
| [2026-11-nextjs-seo](sprints/2026-11-nextjs-seo.md) | Metadata, JSON-LD, sitemap, legacy redirects (M10) |
| [2026-11-nextjs-cleanup-cutover](sprints/2026-11-nextjs-cleanup-cutover.md) | Vite removal (M11), deploy switch and final parity (M12) |
| [2026-11-code-cleanup](sprints/2026-11-code-cleanup.md) | Post-migration scan: bug fixes, dead code, duplicated data and strings |
| [2026-11-navigation-polish](sprints/2026-11-navigation-polish.md) | Theme flicker and scroll fixes, navigation progress bar, localized 404, unused CSS, mobile menu fixes |
| [2026-11-launch-and-event-data](sprints/2026-11-launch-and-event-data.md) | Live site check, Event structured data for Search Console, self-hosted share image, CI checks, module docs |
| [2026-11-ui-ux-audit-quick-wins](sprints/2026-11-ui-ux-audit-quick-wins.md) | UI/UX audit; quick wins: no-JS and reduced-motion content, article readability, dark contrast, card and heading accessibility, opaque nav |

## Module `AGENTS.md` files

Keep them to what the code can't tell you: the module's purpose, what it may and may not import, naming conventions, known traps, and how to verify a change. Don't restate the code.
