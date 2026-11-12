# Code cleanup after the migration (2026-11-12)

A scan of the whole app after the Next.js migration (branch `84-migrate-to-nextjs`, this commit). Head data and the sitemap are unchanged apart from the movie `duration` fix below.

## Shipped

Bugs:
- `movie-player.css` had a global `button[aria-pressed="true"]` rule. Once a movie page had been opened it outlined the genre chips on the movies list. Removed.
- `useScrollAnimation` revealed every section 200 ms after load through its "fallback" timer, so sections below the fold never animated on scroll. The timer and its state are gone; sections now reveal when they enter the viewport.
- The Afterwork event gallery listed two photos twice.
- Home had three `h1` (hero plus two section titles). `PageTitle` takes `as="h2"` and the section titles use it.
- Contact: the join button was a `<button>` inside an `<a>`; it is now a single link that opens in a new tab.
- Footer: the copyright year is computed at render, so a page loaded after New Year would fail hydration until the next deploy. The paragraph has `suppressHydrationWarning`.
- `ThemeToggle` had two `transition-*` classes that overrode each other and built `opacity-*` class names at runtime.
- Movie JSON-LD `duration` was the display value (`10'`), which is not valid for schema.org. It is now ISO 8601 (`PT10M`); the page still shows `10'`. This was one of the odd values kept for parity during the migration.
- The movie year comparator returned inconsistent results for two movies with unknown years.

Duplication and dead code:
- The events list had its own copy of each event's title, date and location, which had drifted from `src/data/events.json`. The list now reads `getEvents()`; `time`, `image` and `status` moved into the JSON.
- Contact details (email, phone, address, map and form links) were repeated in the footer, the contact page and the SEO constants. They are in `src/lib/contact.ts`.
- English-only labels in shared components (share buttons, lightbox, gallery, theme toggle, menu button, map link) are translated through the `common` namespace.
- New `MovieGrid` (four copies of the grid classes) and `DEFAULT_PERSON_IMAGE`; `PageTitle` and `ElementTitle` no longer repeat their class string.
- Removed: the never-rendered "featured events" block on Home, `PageLoader`, `detectPreferredLocale`, `localeFromPath`, `DEFAULT_LANG`, commented-out form fields, the 404 `console.error`, wrapper fragments left from `MetaHeader`, the duplicate desktop/mobile toggles in the navbar, the temporary `m5-check` page, and comments that still described the Vite app.
- `npm run lint` is clean: the two old errors (`textarea.tsx`, `tailwind.config.ts`) are fixed.

## Decisions

- Event `status` stays a hand-set field. Deriving it from the date would need the clock at render, which a prerendered page cannot use.
- The About page looks up French bios by person id (as the person page does) instead of a slug of the name. The keys are the same today.
- The 404 page uses theme colours instead of fixed grey and blue.

## Left over

- Not checked in a browser: the scroll reveal on Home, the navbar toggles at the `lg` breakpoint, the translated labels.
- Unused CSS utilities remain in `src/index.css` (`hover-glow`, `text-shimmer`, `loading-shimmer`, `bg-texture`, `gradient-subtle`, `card-cinema`, `animate-on-scroll-delay*`) and unused keys in the catalogs (`home.events.*`, `events.noUpcoming`, `events.checkBackSoon`).
- Event, blog and a few view image paths are still written as `/events/...` instead of going through `publicUrl`; this only matters if the site moves to a sub-path.
- Movie, person and article views still look their item up from the URL and keep a "not found" branch that the routes never reach (`notFound()` runs first). Passing the id as a prop would remove both.
- `tsconfig.json` has `strict: false`.
- `src/views/` and `src/components/` still have no `AGENTS.md`.
