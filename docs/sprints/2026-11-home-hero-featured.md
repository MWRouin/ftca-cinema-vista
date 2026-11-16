# Home hero with a featured slider (2026-11-14 to 2026-11-16)

The home hero rebuilt around a slider that can feature what the club picks, in this commit. Nine layouts were tried live with a dev-only switcher (editorial, centred poster, split, film still, compact, three theme-aware ones, compact with a slider); the compact one with a slider was kept and the rest removed.

## Shipped

- **Hero:** eyebrow, title and tagline, then a slider (`src/views/home-hero-featured.tsx`, styles in `home-hero.css`). The old description block, quote, two buttons, vertical side note and credits strip are gone from the hero, with their CSS and unused strings.
- **Club slide** first: the club description and About's first mission paragraph, in the old description's type, never clipped, with "Discover our story".
- **Featured items** after it, listed by hand in `FEATURED`: a film, an event, a blog article or a free note. Each fills its title, text, image and link from the data; `label` and `text` override them. The list is empty for now (examples commented in place), so the hero shows only the club slide, with no controls.
- **Slider:** no box, a wheat rule in the left margin so the text lines up with the tagline; every slide's call to action is the hero's wheat button, at the same height on every slide. Endless loop (copies at both ends, jumped over silently); one slide per swipe (`scroll-snap-stop`); a 3rem gap between slides so a sliver of the next one can't show. Bullets under the text; prev/next beside them from 1024 px.
- **Slide images:** on desktop they fill the hero's empty right side below the navbar; on phones and tablets they sit behind the slider, full width and dimmer. Diagonal fade (clear bottom right, dissolving to the top left), with the left and top edges faded, none at the bottom. They cross-fade between slides.
- **Cleanup:** one shared inline-link style (`inlineLinkClass`, person links and About's FTCA link); the hero's glow uses the emerald; a stale "experiment" comment removed; `src/views/AGENTS.md` notes how to feature items.

Checked with typecheck, lint, build, axe on 6 pages (home EN/FR, About, Contact, Movies, Palmarès) in both themes on desktop and phone (no violations, no console errors), and the loop (buttons and swipes, one slide visible each step) on a build with the example items switched on.

## Decisions

- **Featured items are chosen by hand, not taken from upcoming events.** The slot is for whatever the club wants to highlight (an award-winning film, a live event, an article, a note).
- **The club description stays in the hero as the first slide** instead of moving to About, and the mission joins it there.
- **No auto-advance.** The club slide is long and moving text is hard to read; it moves only on swipe or click.
- **No side arrows over the hero edges** (tried, dropped for their dark shading); small arrows beside the bullets on desktop only.
- **Featured items are a list in code for now**, not a data file; the type and the resolver are ready to read one later.

## Left over

- The hero quote ("We use film to observe the world with tenderness…") is no longer shown; its string is kept in `home.json` until it gets a place (About, or a slide).
- Pale slide images (the Ydour event card) glow in dark mode; dimming them there was offered and deferred.
- With the item slides present, all slides take the club slide's height, so shorter ones have space above their button.
- Unused strings from before this work: `films.directedBy`, `events.title`, `events.subtitle`, `events.viewAll` in `home.json`.
