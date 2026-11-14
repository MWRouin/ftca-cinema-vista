# Visual design pass (2026-11-13 to 2026-11-14)

Fixes for the [visual design audit](../research/ui-visual-audit-2026-11.md) (colour, type, art direction), in this commit. A first pass on 2026-11-13 carried the hero's look (Cormorant with Inter, sand, hairlines) through the site; on review the next day several of its choices were reverted or replaced, step by step with live dev-only pickers. This log describes what ships.

## Shipped

- **Colour roles:** `primary` is the green fill (buttons, badges) with cream text in both themes (dark buttons APCA Lc 40 → 77). Green text, links and icons use the new `brand` token (`--primary-text`): a lighter emerald `#2da986` in dark mode (6.6:1 on the page), also used for the dark logo and the hero's green details. Brighter muted text in both themes; reading copy is `text-foreground/85`, capped at 70ch (About's story text centred).
- **Accent:** wheat `#d4b46e` in both themes and the hero (the hero's `--sand`, glow and button shadow now follow `--accent`). Cards are outlined in `border-accent/30`, full wheat on hover; the Movies search, filters button and panel, and the contact form fields use the same faint outline. Card hover no longer lifts, zooms or deepens the shadow (image zoom and title colour stay).
- **Type:** Nunito for all text, hero included, self-hosted (400–700, italics 400–600), plus Noto Sans Arabic; Inter, Cormorant and Amiri removed. Nav links 16 px semi-bold, EN/FR 16 px bold.
- **Logo** follows the theme (`--logo-*`); light greys in dark mode.
- **Home:** the "Join Our Community" band is the About photo under a black wash, wheat italic title and wheat button.
- **Palmarès:** the trophy (recoloured wheat and green, ground shadow removed) inside drawn festival laurels, centred and tightened.
- **Contact:** two columns (details | meetings and social), then the map | "Join" with the message form last. The map is Leaflet with OpenStreetMap tiles (dark-mode filter, wheat pin, "Back to the club" button once the pin leaves the view), with OpenStreetMap and Google Maps buttons. The Google link everywhere now opens the club's listing (`?cid=`).
- **Footer:** old dark background kept, wheat top line, quick links in two columns of four plus the federation site, social icons under Contact as plain icons, blocks spaced evenly.
- **Other:** event pages keep the networks' own icon colours; pages are only as tall as their content (no `min-h-screen`), with extra space under Palmarès and the 404; nav bar 90% opaque; the 404 in the hero's style; initials for people without a photo; "FTCA" in About's mission links to the federation; lucide arrows instead of → ←; curly quotes and "…" in content; the dev server accepts LAN addresses (`20bee91`).
- **Docs:** root `AGENTS.md` fonts and colour roles; `components/ui` and `customUi` module notes (card outline, `ClubMap`).

Checked with typecheck, lint, build, axe on 13 pages in both themes, and screenshots of each change in both themes.

## Decisions

- **Nunito everywhere, not Inter + Cormorant.** Reviewed in the browser, the serif titles didn't feel like the club; one family is simpler. `font-display` stays a separate token so titles can change face later.
- **Wheat, not sand, amber or orange.** Sand felt stale; amber and orange added energy but clashed with the teal green. Wheat sits between sand and honey. A separate brighter "spark" colour for key buttons was tried and dropped.
- **Dark green is an emerald (`#2da986`), not the hero's mint `#5abf9c`**, chosen with a live picker; the hero uses it too.
- **Brand-coloured social icons on event pages are kept** (reverses the first pass, audit V9): they were found recognisable rather than loud.
- **Old trophy kept, in laurels** (reverses the line-icon trophy, V10): the trophy reads as an award; the line icon looked like a game badge.
- **Nav at 90% opacity** (the quick-wins pass made it opaque so headings wouldn't ghost through): a slight see-through look was preferred; no blur, for scroll performance.
- **OpenStreetMap over a Google embed** on Contact: no tracking or cookies; Google is one click away. CARTO's styled tiles now need an API key, so dark mode filters the standard tiles instead.
- **Curly quotes everywhere except `duration` and film `title` in `movies.json`:** `duration` is parsed as `10'` for JSON-LD, and titles must match what visitors type in search.

## Left over

- Hero experiments (open); page titles are solid green, the old gradient look was not restored.
- The footer's plain neutral top border still sits above the wheat gradient line.
- The map's zoom buttons and credit line keep Leaflet's white style in dark mode.
- Team portraits are graded inconsistently (audit V15); `secondary` and `muted` are near-duplicates (V18).
- `npm audit` reports a moderate `minimatch` advisory in the ESLint toolchain; not touched.
- `docs/research/parity-baseline.json` predates the curly quotes, so a parity diff shows text differences.
