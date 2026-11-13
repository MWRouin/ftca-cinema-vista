# UI/UX audit and quick wins (2026-11-13)

A full UI/UX audit of the site, then the quick wins from it (this commit). The audit is in [research/ui-ux-audit-2026-11.md](../research/ui-ux-audit-2026-11.md): 23 findings by priority, with evidence from headless Chrome and axe-core runs on 13 pages, desktop and mobile, light and dark.

## Shipped

- **Audit report** (`docs/research/ui-ux-audit-2026-11.md`), with the fixed items marked.
- **Content that hides until JS runs:** `.animate-on-scroll` now only starts hidden under `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)`, so the home sections show without JS, in non-scrolling captures and with reduced motion.
- **Reduced motion:** smooth scrolling, hover lifts and the page-title entrance (`motion-safe:`) now respect `prefers-reduced-motion`.
- **Blog articles readable:** the `prose` classes did nothing (no typography plugin), so paragraphs ran together. The body is now spaced (`space-y-6`), capped at 70ch and in a darker colour.
- **Dark-mode contrast:** `--primary` 36% → 38% lightness, and `--primary-foreground` is ink in dark mode (5.5:1 on buttons, badges and chips, was 3.66:1). Home "View all movies" no longer forces white text.
- **Movie cards:** the synopsis overlay is `aria-hidden`, has no scroll region, shows on keyboard focus and only on hover-capable devices (no flash on tap). The poster has `alt=""`, so the link reads "Title, Genre • Year".
- **Heading order:** `CardTitle` takes an `as` prop (small local change to the shadcn primitive, noted at the edit). `MovieCard` and `ArticleCard` take `titleAs`. Fixed the levels on movie, event, blog, contact and the footer.
- **Accessibility details:** a "Skip to content" link with `main#content`; the logo link is labelled "FTCA Hammam-Lif, home" (and the logo alt typo is fixed); the `LazyImage` loader no longer prints the alt text; About portraits have `alt=""`; the "Copied" state is announced.
- **Galleries and lightbox (audit #10):** media and gallery thumbnails are `<button>`s labelled "View full size: …", with visible focus rings (the gallery's is drawn over the photo, since the carousel clips outside rings). `LightboxOverlay` is a modal dialog: focus goes to Close, Tab stays inside, Escape returns focus to the thumbnail, ←/→ step through the gallery, and the counter is announced. The lightbox shows the media's title as its label.
- **Footer and Back buttons (audit #20):** the navbar and footer share one list of sections (`src/lib/site-nav.ts`), so the footer now has About and Palmarès. `BackButton` returns to the page the visitor came from (history step, scroll restored) when it is in the site, using a record of the tab's in-site pages (`src/lib/back-navigation.ts`, fed by `Layout`); otherwise it links to its fixed path as before. The skip link now moves focus without adding a `#content` history entry.
- **On-palette colours (audit #19):** the Contact "Join" card and button, the blog "Featured" badge and the event locations now use theme tokens (sand `--accent` as the highlight) instead of amber, orange, blue and the per-category colour map. No raw Tailwind palette colours remain in `src`.
- **Nav bar:** solid `bg-background` off the hero, so scrolled headings no longer show through the links.
- **Gradient titles:** `PageTitle` and `ElementTitle` pad the clipped box sideways (`px-[0.1em] -mx-[0.1em]`, as `py-2 -my-2` already did vertically), so glyphs that overhang their advance (the arm of a final *y*, *r* or *t*) are no longer cut off by `bg-clip-text`.
- **Data:** removed the stale duplicate `mad-ant` entry from `movies.json`, and added the English synopsis for Wed Trabelsia (translated from the French one; English pages showed the French text).
- **Docs:** the `alt=""` rule was added to `src/components/customUi/AGENTS.md`.

After the changes, axe reports no violations on any audited page.

## Decisions

- **No `backdrop-filter` on the nav or the hero quote.** A blur re-renders the band behind it on every scroll frame, which costs on low-end phones, and the look must be the same on phones and desktops. The nav is fully opaque, since 95% still let large headings ghost through, and the hero quote lost its desktop-only blur. The mobile menu panel keeps its blur: it only shows while open, over a page that isn't scrolling.
- **Dark mode keeps bright green with ink text, rather than darker green with cream text.** Darkening `--primary` enough for cream text would push green text on the dark background (active nav, links, roles) below 4.5:1.
- **Back follows history only inside the site, and never just to switch language.** A language switch adds a history entry for the same page; stepping back onto it would only toggle the language, so Back then uses its fixed link. The language toggle still pushes (unchanged).
- **The no-JS fix uses `@media (scripting: enabled)`, not a class on `<html>`.** A class set by script would have to be reapplied after every language switch (see root `AGENTS.md`). Browsers without that media query simply show the content.

## Left over

- The rest of the audit (P0 #1 and #3, P1 #7–#9, the P2 items) is tracked in the audit report. The image pipeline (#3) is the biggest measurable gain.
- Four public films have no description in any language (`mad-ant`, `offrande`, `un-des-notres`, `tayara`). These need writing.
- Event media videos autoplay in a loop with no pause control (WCAG 2.2.2), and the lightbox has no swipe on touch.
- `public/Posters/mad_ant.jpg` was only used by the removed duplicate; check before deleting it.
- The audit's screenshots and scripts lived in a session scratch folder and weren't kept.
