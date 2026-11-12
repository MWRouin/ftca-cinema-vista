# Docs skills and Wed Trabelsia synopsis (2026-11-11)

## Shipped

- `sprint-log` and `module-docs` Claude Code skills in `.claude/skills/`, a "Documentation workflow" section in `AGENTS.md` for other agents, and `.claude/settings.local.json` added to `.gitignore` (`d961d24`).
- Wed Trabelsia French synopsis; the movie page keeps paragraph breaks in descriptions via `whitespace-pre-line` (`4643feb`).
- `main` merged into `84-migrate-to-nextjs`, so the branch carries the synopsis (`3f31768`).

## Decisions

- **Rules in `AGENTS.md`, procedures in skills.** `AGENTS.md` is read by every agent; the skills only help Claude Code, so the rules can't depend on them.
- **No hook for now.** A hook would make the logging truly automatic but can be annoying; revisit if logs get skipped.
- **Only the French synopsis was written.** The English one is empty and falls back to French (the default language) until a translation is provided.

## Left over

- English synopsis for Wed Trabelsia.
- Per-module `AGENTS.md` files are still to be written, at the milestones that create each module (see the [plan](../plans/84-migrate-to-nextjs.md)).
- Migration milestones M1 (scaffold) and M2 (parity baseline) haven't started.
- Both skills were written this session; their first real use is this log, so adjust them if the output needs it.
