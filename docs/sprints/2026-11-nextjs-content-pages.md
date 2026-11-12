# Content pages on Next.js (2026-11-12)

## Shipped

- **M7, content pages:** Home, About, Palmarès and Contact are served by the Next app (thin route files around the existing client views), and `[locale]/not-found.tsx` shows the old NotFound view inside the locale shell.
- With M8 and M9 this completes the page ports. Compared with `docs/research/parity-baseline.json`: every one of the 170 real pages exists in the Next output. The only baseline pages not carried over are `/en/404/` and `/fr/404/`, which nothing linked to (the 404 now comes from `404.html`). The Next output also has temporary `m5-check` pages and `/404/` and `/_not-found/` from the framework.

## Decisions

- **`/en/404/` and `/fr/404/` are dropped.** They only existed as a by-product of the old static generator; GitHub Pages serves `404.html` for unknown URLs.

## Left over

- Head metadata for every page is still the client-side `MetaHeader`, and `out/` still carries the old static `sitemap.xml` (43 stale URLs) and `robots.txt`: M10.
- The 82 un-prefixed legacy URLs (for example `/movies/trip/`) have no redirect pages yet. The page list is now complete, so they can be generated (M3 follow-up, verified at M12).
- Not checked in a browser: the home hero and animations, About's member grid and expanders, the Contact form's mailto button, and the 404 view.
- `src/views/` has no `AGENTS.md` yet; it is mostly temporary glue until `MetaHeader` goes away at M10.
