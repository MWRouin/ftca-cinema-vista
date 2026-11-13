---
name: sprint-log
description: Write the sprint log for finished work in docs/sprints/ and update the docs index. Use when a body of work or sprint is wrapped up, a PR is merged, or the user asks to log, document or summarise what was done.
---

# Sprint log

Write a short log of what was done since the previous one, following the template in `docs/README.md`.

1. **Find the starting point.** Read the newest log for its end date: the last row of the sprint table in `docs/README.md` (file names share the `YYYY-MM-` prefix within a month, so sorting them by name doesn't find it). If there is none, start from the first commit of the work in question.
2. **Collect the work.** `git log --format='%h %ad %s' --date=short <start>..HEAD` on the current branch, plus merged PRs. Read the diffs of anything whose title isn't clear. Skim `docs/plans/` for plans whose status or milestones changed.
3. **Draft the log** in `docs/sprints/YYYY-MM-<short-name>.md` with the sections Shipped, Decisions and Left over:
   - *Shipped:* group commits by theme, one line each, with hashes or PR numbers. No commit-by-commit dump.
   - *Decisions:* choices made and why, so they aren't re-argued. Only things a future reader couldn't infer from the code.
   - *Left over:* open items and where each is tracked (issue, plan milestone). Include known caveats you noticed.
4. **Confirm.** Show the draft's Decisions and Left over sections to the user and ask what's missing or wrong before finalising. Don't invent reasons for decisions you can't find in the conversation or history; mark them as unknown instead.
5. **Update the index:** add a row to the sprint table in `docs/README.md`, and update the status in the plans table if a plan changed.
6. **Timing:** write the log before committing the work, so it lands in the same commit. If the work is already committed and unpushed, amend the log into the last commit. Don't cite the hash of the commit that will contain the log (it changes on amend); say "this commit".
7. Keep it short (about one screen). Don't commit unless asked; when asked, the commit message is a single title line with no body and no co-author line.
8. If this procedure missed something or got in the way, improve this skill (see `AGENTS.md`).
