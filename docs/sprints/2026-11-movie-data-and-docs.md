# Movie data, cleanup and docs (2026-11-09 to 2026-11-10)

## Shipped

**Fixes and cleanup (PR #82)**
- Preload of critical fonts to close the fallback-font flash (`37187a1`).
- `LazyImage` shows a static placeholder when `src` is empty or fails, instead of an endless loader; the movie player poster now uses it (`884dd2d`).
- Removed `bun.lockb` and `lovable-tagger`, both leftovers from the initial Lovable scaffold (`4bc8904`).
- Refreshed `caniuse-lite` and ran `npm audit fix` (`9385ea2`, `61f0cf3`).

**Content**
- Ridha Ben Hlima portrait, cropped square so the face is centred (`0ae3e27`).
- All movie durations normalised to whole minutes written like `10'`; Le Sifflet year set to 2006 and given a new vintage-styled poster (`6d13460`).
- Wed Trabelsia: published, new 2:3 poster (blurred extension to keep the full credit block), cast from the poster (`884dd2d`, `69b1c01`).

**Model and UI**
- Crew roles `sound-mixing`, `logistics`, `voice-over-direction`, `voice-over`, `subtitles`, with EN/FR labels, and the full Wed Trabelsia technical crew. The movie page shows crew as a grid under a "Technical team" heading (`e78d163`).
- `gender` on every person in `people.json` (guessed from first names, to be corrected by hand); the person page badge says actress/actrice for women. Labels renamed to plain "Actors"/"Acteurs" and "Actor"/"Acteur" (`e3b928b`).

**Project docs**
- `AGENTS.md` (with a one-line `CLAUDE.md` import), `docs/` with plans, sprint logs and research, and the Next.js migration plan (this commit).

## Decisions

- **Next.js over Nuxt, Astro and Preact** for the rebuild: Nuxt means rewriting every component in Vue, Astro ranked lower in the June report, and Preact saves about 40 KB for real compatibility risk. Static export, no server.
- **`public: false` in `people.json` does not hide anyone** who is an active member or has a film credit; only `public: true` is read. The logic in `isPersonPublic` stays as is.
- **Durations drop seconds**, they are not rounded: `22:52` becomes `22'`.
- **Posters are 2:3 and reduced in dimensions, not recompressed.** When the source is square, extend with a blurred edge instead of cutting text.
- **`AGENTS.md` is the source of truth** and `CLAUDE.md` imports it, so other agents read the same instructions.
- **Commits are a single title line**, with no body or co-author line. Tooling warnings are not muted.

## Left over

- `npm audit`: 11 advisories remain (Vite and esbuild, one high; react-router; minimatch via typescript-eslint). All need major bumps and are expected to disappear with the Next.js migration (#84).
- Movie structured data (JSON-LD) writes `duration` as `10'`, not ISO 8601 (`PT10M`); same in `MoviePlayer.tsx` and `staticPagesGenerator.js`.
- Wed Trabelsia synopsis is empty. Its poster has a faint seam at the top edge of the blurred extension, and the two corner logos are cropped out.
- Gender values are guesses; Itaf Daghsen was the least certain.
- Name spellings differ between the poster and `people.json` for Seif Eddine Larbi/Elarbi and Safa/Safé Khiari. Amenallah is "Zinn" in both cast and voice-over.
- Per-module `AGENTS.md` files are not written yet, because the module layout changes during the migration.
- Migration milestones M1 to M12 are tracked in [the plan](../plans/84-migrate-to-nextjs.md).
