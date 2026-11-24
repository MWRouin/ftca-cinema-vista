# To do: performance and code style pass

Status: active · Issue: none · Branch: `perf-and-cleanup`

Temporary checklist from the 2026-11-24 performance and code style review. Delete this file when every item is done or dropped. Constraint for every item: same look, same SEO, same UX (only faster).

Measured on a production build: about 250–300 KB of compressed JS per page (156 KB of it is React and Next.js themselves), 141 MB in `out/`.

- [ ] **1. Resize images.** The home hero slides alone weigh 1.8 MB (`blogs/ghasen_blog.jpg` 6536×4357, `Posters/wed_trabelsia.jpg` 1 MB). Gallery, blog and member photos are up to 10 MB and 6700px wide. Add a resize script (`sharp` as a dev dependency): photos ≤ 2000px wide, posters 1000×1500 (AGENTS.md rule), portraits 800×800; maybe lighter copies for list thumbnails. Show before/after sizes before rewriting `public/`.
- [ ] **2. `LazyImage` loading.** The prerendered `<img>` has `opacity-0`, so images stay invisible until React hydrates even once downloaded: render them visible in the HTML and only fade those that arrive after hydration. Add a `priority` prop (eager, `fetchpriority="high"`) for the hero and the first row of posters, which are `loading="lazy"` today.
- [ ] **3. Translations per locale.** Every page ships all 11 namespaces in both languages (24 KB gzipped). Send only the current locale (about 12 KB less per page); per-page namespaces could save more.
- [ ] **4. Head tags.** The four Nunito font preloads appear twice (8 tags; the browser fetches once, but it is noise): use React's `preload()` instead of the hand-written links in `src/app/[locale]/layout.tsx`. Drop `<link rel="preconnect" href="/">` (same origin, does nothing).
- [x] **5. Unused files in `public/`.** About 22 MB that no page used moved to `archive/public/` (same paths as under `public/`, so not deployed but kept): `About/ydour.jpg`, six `events/ydour/SnapInsta…mp4`, `events/ydour/hero-ydour.jpg`, `cinema-doodle-set_160308-188.svg` and `.jpg`, `Members/mehdibenfarhat.png`, `fonts/cinema_sunday/`, plus four small ones (`Members/salmabelhadjaissa.jpg`, `blogs/blog_1.jpg`, `Posters/mad_ant.jpg`, `Posters/un_des_notres.jpeg`).
- [x] **6. Code style: split the navbar.** `Navigation.tsx` (394 lines) split into `MobileMenu.tsx`, `hooks/useNavScroll.ts`, `hooks/useSwipeToClose.ts` and `lib/nav-hidden.ts`; prerendered navbar HTML checked identical before and after.
