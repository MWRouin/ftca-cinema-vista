# Mobile drawer, navbar hidden by default, navbar refactor (2026-11-24)

The mobile menu becomes a right-side drawer with the settings in it; the navbar is hidden by default, with the visitor's choice saved; then the navbar code is split up, unused media is archived, and a performance pass follows (translations per page, font preloads, image loading and sizes).

## Shipped

- **Mobile menu as a drawer** (b5e4009, PR #92): shadcn `sheet` from the right, w-64 (max 80vw), page background in dark mode. Settings at the top as labelled rows (language, theme, "Hide the bar"), then the pages underlined like the bar's links, then the social links and the logo, separated by wheat hairlines that fade out to the right. Swipe right to close; widening past lg closes it.
- **Navbar reveal** (b5e4009): a pull down or a wheel turned up at the top of the page brings a hidden bar back; hiding from the drawer no longer leaves the bar held open by focus.
- **Loading bar** (b5e4009): never runs backwards; each navigation gets its own bar (keyed by a run count in `lib/navigation-progress.ts`).
- **Hidden by default, saved** (e8b39e7, 8d0e9fa, PR #94): the bar starts hidden and the choice is kept in `localStorage` (`navHidden`). It shows when the page loads and goes after 5 s on every device. Drawer settings rows are as wide as their content, and the drawer's × has a 32px target.
- **Cleanup** (c259fa0): one shared drawer row style (`components/drawer-row.ts`) with a keyboard focus ring, the visible text as the rows' accessible name.
- **Navbar split** (7ef4700): `Navigation.tsx` from 394 to 143 lines; the drawer in `MobileMenu.tsx`, the scroll logic in `hooks/useNavScroll.ts`, the swipe in `hooks/useSwipeToClose.ts` (reusable), the saved choice in `lib/nav-hidden.ts`. The prerendered navbar HTML is identical before and after.
- **Unused media archived** (5ba98d1): 19 files (~23 MB) that no page used moved from `public/` to `archive/public/`, same paths, so they are kept but no longer deployed (Ydour photos and videos, a member portrait, two posters, a blog image, the doodle set, the Cinema Sunday font). A check of the code found no unused page or component: the `(root)` routes are the legacy redirects, and all four event views are live.
- **Translations per page and locale** (e2f2dc1): the catalogs left the JS bundle; the server hands each page only its namespaces in its locale (`<Translations ns>` in `src/i18n/server.tsx`, a list per page). About 17 KB less gzipped JS per page for 1.5 KB more HTML; the text of all 253 built pages is identical. `getT` (unused) removed.
- **Font preloads once** (e2f2dc1): React's `preload()` instead of hand-written `<link>` tags, which React emitted twice.
- **Images visible before hydration** (this commit): `LazyImage` no longer hides prerendered images until React runs (the loader sits behind the image; only images mounted later fade in). New `priority` prop (eager, high fetch priority, preloaded) on the first posters, the first event card and the main image of film, article and person pages.
- **Images resized** (this commit): `tools/resize-images.mjs` shrank 97 images in place, same names and formats (posters 1000×1500, portraits 800×800, photos 2000px): 91 MB → 13 MB of images, the deployed site 141 MB → 44 MB, the home hero slides 1.8 MB → 0.6 MB. Originals kept in `archive/originals/`.

## Decisions

- **A drawer, not a popover card:** the earlier popover menus never satisfied; the drawer keeps everything (settings, pages, socials) in one place.
- **Hidden by default and saved:** reverses the previous log's "not saved" choice. With scroll up, pull down, hover and keyboard all bringing the bar back, visitors don't get lost; showing it for 5 s on load tells them it exists.
- **Settings rows sized to their content:** a full-width language row caught taps aimed at the ×.
- **No aria-label on the drawer rows:** the visible text ("Language: English") is the accessible name, so voice control can use it.
- **The navbar stays prerendered** (a client component, not `ssr: false`): its links stay in the HTML for crawlers and the bar never pops in late.
- **Unused media archived, not deleted:** the owner wants to keep it; `archive/public/` mirrors `public/` so a file goes back with one `git mv`, and other archived material can sit beside it.
- **No fallback language:** each page receives one locale only; en and fr have the same keys, so the fallback to English never applied.
- **`<link rel="preconnect" href="/">` kept:** Next emits it itself (its font manifest lists every page with no fonts); harmless and not removable from app code.
- **Resized in place, originals archived:** keeping names and formats means no data or link changes; the originals stay for any future larger version. PNGs are recompressed losslessly only (sharp's palette mode, tried first, cuts them to 256 colours).
- **Tried and dropped:** a two-colour (wheat over green) loading bar; an active-page marker in the drawer (replaced by the underline); full-width and centred separators.

## Left over

- The performance pass: all six items of [plans/perf-cleanup-todo.md](../plans/perf-cleanup-todo.md) are done; delete the file. Possible later: smaller poster copies for the grids (a poster is up to 418 KB at 1000×1500), `sharp` as an explicit dev dependency (the script uses the copy Next installs), `eventDetail` split per event, a small `t()` in place of i18next (27 KB gzipped).
- A page's namespace list must follow its components (rule in `src/i18n/AGENTS.md`); the client-side language switch and the browser-rendered `404.html` weren't checked in a browser.
- Swipe to close and pull down were checked in headless Chrome only, not on a real phone.
- While hidden, the bar's 64px strip still catches the pointer over the page underneath (from the previous log).
