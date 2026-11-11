---
name: module-docs
description: Create or update the AGENTS.md for a code module (folder) and its CLAUDE.md import, and keep the module map in the root AGENTS.md in sync. Use when adding, porting, restructuring or removing a module, or when a module has no AGENTS.md.
---

# Module docs

Each module folder has an `AGENTS.md` with the real content and a sibling `CLAUDE.md` that contains exactly one line: `@AGENTS.md`. The root `AGENTS.md` has a module map table that lists every module.

1. **Read the module** before writing: its files, who imports it and what it imports, and any existing `AGENTS.md`. Update an existing file; don't create a second one.
2. **Write `<module>/AGENTS.md`** with only what the code can't tell you, in short sections:
   - *Purpose:* one or two sentences.
   - *Boundaries:* what it may import, what must not import it, where side effects live.
   - *Conventions:* naming, file layout, patterns specific to this module.
   - *Traps:* non-obvious behaviour, ordering, build- or SSR-only constraints.
   - *Verify:* the commands or checks that prove a change here works.
   Don't restate code or list files. Aim for under 40 lines.
3. **Create or check `<module>/CLAUDE.md`** so it contains only `@AGENTS.md`.
4. **Update the module map** in the root `AGENTS.md`: add or edit the row, and mark the AGENTS.md column as done. Remove the row if the module was deleted.
5. If the module was moved or renamed, update links and paths in other `AGENTS.md` files and in `docs/`.
6. Don't commit unless asked; commit messages are a single title line, no body, no co-author line.
