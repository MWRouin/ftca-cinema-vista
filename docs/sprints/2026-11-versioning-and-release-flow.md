# Versioning and release flow (2026-11-26 to 2026-11-26)

## Shipped
- `.github/workflows/version.yml`: each PR merged into `main` gets the next `vX.Y.Z` tag. Patch on every merge, minor when the PR has the `minor` label; major only from a `vX.0.0` tag pushed by hand (#97, tag only since this commit).
- `deploy.yml` writes the GitHub Release after each deploy: the newest version in `Production`, with generated notes covering every PR since the previous Release (this commit).
- `.github/workflows/production-guard.yml`: the `from-main` check fails any PR into `Production` that doesn't come from this repository's `main` (#97).
- `ci.yml` runs on pull requests only, no longer again on pushes to `main` (#97).
- `AGENTS.md`: versioning and Production rule under Commands.

## Decisions
- Meaning of the numbers for a website: major = a new era (redesign, platform change), set by hand; minor = something visitors can see (new page, feature, language); patch = everything else, content updates included.
- Minor is chosen with a PR label rather than a title prefix: explicit and changeable before merging.
- The current site is 1.0.0 (`main` at `cb74cc7`, what was live), not 0.x.
- `Production` stays separate from `main`: several merges into `main` are often batched before a deploy, so half-finished combinations (new footer, old header) don't go live. The alternative of collecting related work on a shared branch first was considered and not taken.
- Versions are numbered per merge into `main`, not per deploy, so the live site jumps versions (e.g. 1.0.0 → 1.0.6). Accepted as normal, like games numbering internal builds.
- Version does not wait for CI: CI already passed on the PR; branch protection on `main` is the way to stop failing PRs from merging. CI on pushes to `main` was dropped for the same reason; `deploy.yml` still lint/type-checks/builds before publishing.
- Releases are per deploy, not per version: every merge gets a tag (cheap, gives each state of `main` a name), but a Release page is only written when something goes live, so the Releases page reads like a changelog of the site.
- GitHub can't restrict a branch's PR source natively, hence the guard workflow plus a required check.

## Left over
- Create the `minor` label on GitHub.
- Rulesets (GitHub settings, not in the repo): on `Production`, require a PR and the `from-main` check, with no bypass; optionally on `main`, require a PR and the CI `check`. `from-main` only appears in the list after it has run once.
- The first run of `version.yml` (merge of #97) failed on purpose, with no `v1.0.0` tag yet. Fix: push `v1.0.0` on `cb74cc7` and re-run that job, which tags the #97 merge `v1.0.1`.
- The release job is untested on GitHub; the first deploy after this should write one Release covering everything since `v1.0.0`.
- CI also runs on `main` → `Production` PRs, which is redundant but harmless.
