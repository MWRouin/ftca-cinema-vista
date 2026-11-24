# Mobile drawer, navbar hidden by default, navbar refactor (2026-11-24)

The mobile menu becomes a right-side drawer with the settings in it; the navbar is hidden by default, with the visitor's choice saved; then the navbar code is split up, unused media is archived, and a performance and code style review starts.

## Shipped

- **Mobile menu as a drawer** (b5e4009, PR #92): shadcn `sheet` from the right, w-64 (max 80vw), page background in dark mode. Settings at the top as labelled rows (language, theme, "Hide the bar"), then the pages underlined like the bar's links, then the social links and the logo, separated by wheat hairlines that fade out to the right. Swipe right to close; widening past lg closes it.
- **Navbar reveal** (b5e4009): a pull down or a wheel turned up at the top of the page brings a hidden bar back; hiding from the drawer no longer leaves the bar held open by focus.
- **Loading bar** (b5e4009): never runs backwards; each navigation gets its own bar (keyed by a run count in `lib/navigation-progress.ts`).
- **Hidden by default, saved** (e8b39e7, 8d0e9fa, PR #94): the bar starts hidden and the choice is kept in `localStorage` (`navHidden`). It shows when the page loads and goes after 5 s on every device. Drawer settings rows are as wide as their content, and the drawer's × has a 32px target.
- **Cleanup** (c259fa0): one shared drawer row style (`components/drawer-row.ts`) with a keyboard focus ring, the visible text as the rows' accessible name.
- **Navbar split** (7ef4700): `Navigation.tsx` from 394 to 143 lines; the drawer in `MobileMenu.tsx`, the scroll logic in `hooks/useNavScroll.ts`, the swipe in `hooks/useSwipeToClose.ts` (reusable), the saved choice in `lib/nav-hidden.ts`. The prerendered navbar HTML is identical before and after.
- **Unused media archived** (this commit): 19 files (~23 MB) that no page used moved from `public/` to `archive/public/`, same paths, so they are kept but no longer deployed (Ydour photos and videos, a member portrait, two posters, a blog image, the doodle set, the Cinema Sunday font). A check of the code found no unused page or component: the `(root)` routes are the legacy redirects, and all four event views are live.

## Decisions

- **A drawer, not a popover card:** the earlier popover menus never satisfied; the drawer keeps everything (settings, pages, socials) in one place.
- **Hidden by default and saved:** reverses the previous log's "not saved" choice. With scroll up, pull down, hover and keyboard all bringing the bar back, visitors don't get lost; showing it for 5 s on load tells them it exists.
- **Settings rows sized to their content:** a full-width language row caught taps aimed at the ×.
- **No aria-label on the drawer rows:** the visible text ("Language: English") is the accessible name, so voice control can use it.
- **The navbar stays prerendered** (a client component, not `ssr: false`): its links stay in the HTML for crawlers and the bar never pops in late.
- **Unused media archived, not deleted:** the owner wants to keep it; `archive/public/` mirrors `public/` so a file goes back with one `git mv`, and other archived material can sit beside it.
- **Tried and dropped:** a two-colour (wheat over green) loading bar; an active-page marker in the drawer (replaced by the underline); full-width and centred separators.

## Left over

- The performance pass: items 1–4 in [plans/perf-cleanup-todo.md](../plans/perf-cleanup-todo.md) (image sizes, `LazyImage` loading, per-locale translations, head tags).
- Swipe to close and pull down were checked in headless Chrome only, not on a real phone.
- While hidden, the bar's 64px strip still catches the pointer over the page underneath (from the previous log).
