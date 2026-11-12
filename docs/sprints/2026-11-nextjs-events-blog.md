# Events and blog on Next.js (2026-11-12)

## Shipped

- **M9, events and blog:** `/en|fr/events/`, the four event pages, `/en|fr/blog/` and the three blog articles are served by the Next app, as thin route files around the existing client views (same pattern as M8).
- `scripts/events.json` moved to `src/data/events.json`, with a typed `getEvents()` in `src/data/events.ts`; the old generator scripts point at the new path.
- Checked against `docs/research/parity-baseline.json`: all 18 events and blog URLs exist, none missing or extra. The generated HTML has the blog article title, the event title and gallery controls, and the events list links for every event.

## Decisions

- **One `events/[slug]` route with a component registry** instead of four route folders: the pages share the same shape, and the event ids already live in `events.json`. The cost is that a new event needs a JSON entry and a registry line; this is documented in `src/data/AGENTS.md`.
- **`events.json` moved into `src/data/`**, because the page list and (at M10) the metadata need it, and `scripts/` is deleted at M11.

## Left over

- Head metadata for these pages is still the client-side `MetaHeader` (M10).
- Not checked in a browser: the event galleries and lightbox, blog share buttons and the language switch on these pages.
- M7 (Home, About, Palmarès, Contact) is the last page port; then M10 (metadata, sitemap, robots), M11 (cleanup) and M12 (cutover). The 82 legacy redirect URLs can be generated once M7 is done and the page list is complete.
