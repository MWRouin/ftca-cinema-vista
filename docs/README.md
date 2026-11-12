# Docs

Working documents for the project, kept in the repo so they're shared and versioned. The root [`AGENTS.md`](../AGENTS.md) is the entry point; per-module `AGENTS.md` files sit next to the code they describe. Every `AGENTS.md` has a sibling `CLAUDE.md` containing only `@AGENTS.md`, so Claude Code (which reads `CLAUDE.md`) loads the same content as other agents.

## Plans

One file per plan in `docs/plans/`, named `<issue#>-<short-name>.md`. Plans are milestone-level: goals and dependencies, not implementation details. Decide the how when the milestone starts.

Each plan starts with a status line: `Status: draft | active | done | dropped`, and the issue and branch.

| Plan | Status |
|---|---|
| [84-migrate-to-nextjs](plans/84-migrate-to-nextjs.md) | active |

## Research

Background analysis that informs plans, in `docs/research/`. Not kept up to date.

- [REPRODUCTION_REPORT.md](research/REPRODUCTION_REPORT.md): June 2026 audit of the site and the options for a rebuild (basis for the Next.js decision).

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

## Module `AGENTS.md` files

Keep them to what the code can't tell you: the module's purpose, what it may and may not import, naming conventions, known traps, and how to verify a change. Don't restate the code.
