# Visual design audit: colour, type and art direction (2026-11-13)

Status: all findings addressed (2026-11-13), then several fixes revised after review on 2026-11-14 (🔄 below; reasons in [the sprint log](../sprints/2026-11-visual-design-pass.md)). Left open by choice: a common grade for team portraits (V15) and merging `secondary`/`muted` (V18). Companion to the [UI/UX audit](ui-ux-audit-2026-11.md), which covered usability and accessibility; this one is about how the site looks: palette, contrast, typography, composition, imagery.

## Method

- **Headless Chrome (puppeteer-core 23)** on the static build, 12 pages (home, movies, a film, events, an event, blog, an article, about, palmarès, contact, a person, 404), light and dark, desktop 1440×900 and mobile 390×844. Full-page screenshots, reviewed by eye.
- **Computed-style extraction:** every visible text node with its colour, the alpha-composited background behind it, font family, size, weight, line height, tracking and measure; an inventory of every background, border, SVG fill/stroke, gradient, shadow and radius in use.
- **Rendered-font check** with the DevTools protocol (`CSS.getPlatformFontsForNode`): which font file actually drew the glyphs, web font or local fallback.
- **Colour maths with culori 4:** tokens converted to OKLCH (perceptual lightness, chroma, hue), CIEDE2000 distances between neighbouring colours.
- **Contrast in two models:** WCAG 2 ratios (the legal baseline) and **APCA** (`apca-w3`, the perceptual model drafted for WCAG 3), which is much stricter about mid-tone text on dark backgrounds.
- **Colour-vision simulation** with Chrome's `Emulation.setEmulatedVisionDeficiency` (deuteranopia, protanopia, tritanopia, achromatopsia).

APCA levels used: Lc 75 for body text (≤16 px regular), Lc 60 for 18 px or semibold UI text, Lc 45 for headings 24 px+, Lc 30 for non-text marks. WCAG passes are noted alongside; the site passes WCAG nearly everywhere, so APCA is what separates "legible" from "comfortable".

## Verdict

The site has a **real, distinctive brand** and it is all in the home hero: deep teal-green, warm sand, cream and a green-tinted ink, set in Cormorant Garamond with tracked uppercase Inter, film grain, a vertical side note and a credits strip. It reads like a film-festival programme. The palette underneath is disciplined: two hues plus tinted neutrals, and every colour on every page resolves to a token.

The problem is that **the rest of the site does not speak the hero's language**. Below the hero the voice switches to a generic friendly-app look: rounded Nunito headings with a gradient fill, system-font body text, shadcn cards with green glow buttons. A visitor sees two designs stitched together. The second issue is **dark mode's green**: it passes WCAG but is dim as text (APCA Lc 38 where 60–75 is wanted), and the same token is asked to be both a text colour and a button fill, which no single green can do well on a near-black ground.

Both are fixable without new colours: the hero already contains the answers (its `--green-light` for text on dark, its typefaces for the rest of the site).

## What works (keep these)

1. **A two-hue palette with tinted neutrals.** Green (OKLCH hue ≈ 172) and sand (hue ≈ 86); light-mode neutrals are warm cream (hue 82–95), dark-mode neutrals are green-tinted ink (hue 171–178). Nothing is pure grey, black or white. That restraint is what makes the site feel art-directed rather than templated.
2. **Token discipline.** Across 12 pages and both themes there are only 15 distinct background colours, 10 border colours and 4 radii, all from tokens (after the #19 fix). The only off-palette colours left are listed in V9 and V10.
3. **Dark mode is green-black, not black.** `--background` is L15 with a slight green cast, close to the hero's `--ink`. It gives posters and tungsten-lit event photos a warm, cinematic surround.
4. **Light mode is cream, not white.** Background L97 and cards L99 read as paper on paper, with less glare and a printed-programme feel.
5. **The hero art direction:** the serif/sans pairing, the italic sand "Filmmakers", the sand "stamp" button against the hairline ghost button, the grain, the credits strip. The sand primary button is the best button on the site.
6. **Colour isn't load-bearing.** Under all four simulated colour-vision deficiencies every state still reads: the active nav item has an underline, badges differ by fill as well as hue, and nothing is coded red/green. Green turns brownish-grey for protan/deutan viewers and the site still works.
7. **Photography harmonises with the palette.** Event and blog photos are tungsten-warm (amber/brown) or black and white; both sit naturally on cream and green-black. Posters vary wildly in style, and the neutral card frame absorbs that well.
8. **Body sizes and leading are sound.** 16/24 for UI, 18/32 at about 70ch in articles (since the quick wins), 14/20 for metadata.
9. **The light-mode primary is the hero green** (ΔE00 1.5 from `#1f6b5c`), and the sand accent was tuned deeper on cream for visibility.

## Palette

### Tokens in OKLCH

| Token | Light | Dark | Notes |
|---|---|---|---|
| background | `#f8f4ed` L97 C.010 H82 | `#060e0c` L15 C.014 H178 | ≈ hero cream / ink |
| foreground | `#10231d` L24 H172 | `#f4f1eb` L96 H85 | green-ink / cream |
| card | `#fcfbf7` L99 | `#0c1814` L20 | ΔE00 from bg: 2.2 light, 4.3 dark |
| primary | `#1c6e5c` L49 C.082 H175 | `#2c967c` L61 C.103 H173 | light = hero green |
| primary-foreground | cream | `#050b09` ink | dark buttons use ink text |
| accent (sand) | `#d0b16c` L77 C.095 H86 | `#d5bf90` L81 C.067 H86 | hero sand is `#d9c8a2` L84 C.054 |
| muted | `#ede9de` L93 | `#1b2724` L26 | the dark footer uses this |
| muted-foreground | `#556d65` L51 | `#98aea3` L73 | used for most body copy (see V3) |
| border | `#e1dacc` L89 | `#273a34` L33 | 1.27:1 / 1.62:1 against bg |

Hero-only colours (in `home-hero.css`, not tokens): `--green #1f6b5c`, `--green-light #5abf9c` (L73 C.109), `--sand #d9c8a2`, `--cream`, `--ink`.

### Structure

- **Lightness ladder (dark):** bg 15, card 20, secondary 25, muted 26, border 33, ring 54, primary 61, muted-fg 73, accent 81, fg 96. The surfaces (15/20/25/26) are evenly stepped and good; `secondary` and `muted` are near-duplicates (ΔE 7) used for different jobs.
- **Lightness ladder (light):** bg 97, card 99, secondary 93, muted 93, input 92, border 89. Card vs background is only ΔE 2.2, so cards are defined almost entirely by their 1.27:1 border plus a 5% shadow. It works because the border is warm, but card edges disappear on low-quality screens.
- **Chroma ceiling:** the palette never exceeds C 0.11, which is what keeps it calm. The brand-coloured social icons (C 0.24–0.26) and the Twemoji trophy are the only things that break it, and they are the loudest objects on their pages.
- **Hue drift between themes:** light primary H175 and dark primary H173 match the hero, but the dark green is 12 lightness points brighter than the hero's and visibly more minty-turquoise. In dark mode the site's green and the hero's green are different colours (ΔE00 15.8).

### Contrast (computed on every text pair, both themes)

WCAG 2: no failures on flat backgrounds outside the hero. (The hero's photo sits on a pseudo-element, so it was judged by eye; it is legible, with the faint credits strip and side note intentionally decorative.)

APCA tells a different story in dark mode:

| Pair (dark) | WCAG | APCA Lc | Wanted | Where |
|---|---|---|---|---|
| green `#2c967c` text on bg, 14 px medium | 5.35 | **38** | 75 | active nav, roles ("President", "Member"), "EN", year highlights |
| ink on green button, 14 px medium | 5.44 | **40** | 75 | "View all", "Show all", "Get in touch", "Back to home", Fiction badge |
| muted `#98aea3` on muted footer, 14–16 px | 6.55 | 53 | 75 | footer text, copyright |
| muted on bg/card, 14–18 px | 7.7–8.3 | 55 | 60–75 | synopses, credits, event and About copy, list subtitles |
| gradient page title corners (green @75%) | 3.47 | **24** | 45 | every page title in dark mode |

In light mode the only APCA-weak spots are muted text on the footer (Lc 64) and nav links (Lc 74, borderline). Light mode is in good shape.

Candidate fixes, measured on the dark background:

| Candidate | WCAG | Lc |
|---|---|---|
| hero `--green-light #5abf9c` as text | 8.71 | 58 |
| `#6cc9a8` (same hue, L77) as text | 9.81 | 64 |
| cream on hero green `#1f6b5c` (button) | 5.62 | **77** |
| cream on `#17594b` (button) | 7.26 | 84 |
| ink on `#5abf9c` (button) | 8.85 | 60 |
| muted-fg raised to `#b7c8bf` (L82) | 11.18 | 71 |

The key result is that **cream on the hero green scores Lc 77 as a button**, twice what ink on the bright green scores (Lc 40). The earlier quick-win decision (ink on bright green) was the right call while one token served as both text colour and fill. Splitting the roles removes the conflict (see R1).

## Typography

### What the browser actually renders

| Role | Specified | Rendered |
|---|---|---|
| Hero display | Cormorant Garamond 600 + 600 italic | web font ✓ |
| Hero UI, body, buttons | Inter 400/600 | web font ✓ |
| Headings h1–h6 (rest of site) | Nunito 600/700 | web font ✓ |
| **All other body and UI text** | *nothing set*, Tailwind default `ui-sans-serif, system-ui` | **local system font**: Noto Sans here, Segoe UI on Windows, SF on Apple, Roboto on Android |
| Arabic titles | Nunito (no Arabic glyphs) | local fallback (Noto Sans Arabic here) |
| "←" in Back buttons | system font | **Arimo**, a second fallback, because the system font lacks the arrow |

599 of 756 text nodes are in the system font. Inter, self-hosted and preloaded, covers 16 text nodes, all inside the hero. So the site's body face is whatever the visitor's OS ships, and it changes shape at the hero's bottom edge.

Loaded but never used: Inter 300/500/700, Cormorant 500 upright and 700, Nunito 400. Fontsource only downloads faces that get used, so this costs only CSS bytes. It's tidy-up, not a performance problem.

### Scale

Sizes in use (px): 96 (hero) · 60 (page titles) · 36 (detail-page h1) · 33.6 (hero tagline) · 30 (section h2) · 24 · 20 · 18 · 16 · 14 · 12 · 11.8/10.6 (hero labels).

- **Inverted hierarchy on detail pages.** A list page's h1 ("Movie Catalog", "Events") is 60 px; a film's or event's own h1 ("Trip - هربة") is 36 px, barely above the "More like…" section h2 at 30 px. The film is the subject, yet the catalogue header shouts louder than the film's title.
- **One tracking value for every heading.** `letter-spacing: -0.045em` is right at 60 px but too tight from about 20 px down: the footer's "Club des Cinéastes Amateurs de Hammamlif" (18 px bold) and the card titles (18 px) have touching letter pairs. Blog card titles override it to -0.025em, so there are already two values in play.
- **Measure.** Articles are now about 70ch; About paragraphs run to about 100 characters per line (896 px at 18 px), the event intro card to about 100, and the film synopsis to about 90. Long lines in muted colour are the hardest reading on the site.

### Character

- **Nunito is the odd one out.** Its rounded terminals read friendly, soft and app-like, which suits a children's product. Next to Cormorant's high-contrast editorial serif it looks like a different brand. The hero proves the club's voice is the serif.
- **Gradient-filled headings** (`bg-clip-text` green→70%→green) are a 2020s SaaS idiom. They reduce contrast (V2), needed a clipping fix, and add nothing the solid green wouldn't. The hero, the best-looking part, uses solid colour.
- **The About pull-quote** is the one place outside the hero that uses Cormorant, and it is the most elegant moment on the inner pages. It is set with an inline `style`, which shows the system has no "display serif" role for it.

## Composition and art direction, page by page

- **Home:** the hero is excellent on desktop and mobile. Below it, "Featured Films" and "Join our community" are centred, gradient-titled, generic sections, a sharp drop in craft. The tiny divider under each title is nearly invisible (ΔE 6 against the bg) and crowds the descenders. On mobile the eyebrow line sits right beside the logo.
- **Lists (Movies, Events, Blog):** clean grids; poster cards work well. Events show category and status badges at the same visual weight; the status badge could be quieter. The truncated category text ends in a double full stop ("Screening, Discussion, and more..").
- **Film page:** the poster column dominates, which is good, but all the text beside it is muted (synopsis, director, actors), so nothing in the right column has weight except the small green title. Credit names are links styled like body text, with no affordance until hover.
- **Event page:** the strongest inner page. A full-width image, then alternating photo/text rows with warm photography. The h2s ("The Experience") are only 20 px and the copy is muted, so the rhythm is all images. The closing call-to-action card uses full-saturation Facebook/Instagram/YouTube colours (V9).
- **Article:** good since the quick wins. The title is a 36 px gradient while the lede photo is 830 px wide; the title could carry more weight. Content mixes straight `"` quotes and curly `’` apostrophes.
- **About:** the pull-quote is lovely. Body paragraphs are muted except the last, which is full foreground; this reads as a mistake rather than emphasis. Team cards colour "Member" green 12 times, putting the strongest accent on the least informative word. Portraits mix colour, black and white, studio white backgrounds and street shots.
- **Palmarès:** a cartoon Twemoji trophy (saturated yellow-orange, glossy) on an otherwise restrained page. It is the most off-brand image on the site.
- **Contact:** tidy. Three stacked cards on the right versus one tall form card on the left give an uneven bottom edge.
- **Person:** the placeholder avatar is a cool neutral grey (`#c4c4c4` on `#ececec`, Lc 20, chroma 0), the only pure grey in the site.
- **404:** a bare "404 / Oops! Page not found / Return to Home" in the middle of an empty screen, with none of the brand vocabulary.
- **Footer (dark):** `bg-muted` (L26 grey-green) is the lightest large surface in dark mode, a heavy slab that pulls the eye down. The logo's filmstrip layers almost vanish on it (V7).

## Imagery and iconography

- **Logo:** its three fills (`#1f6b5c`, `#3b4b44`, `#6a786d`) are fixed and don't follow the theme. In dark mode the camera body and filmstrip score Lc 8–20 against the background, so the mark is mostly invisible except for the green cloud. The over-hero variant uses `#7b828d`, a blue-grey (hue 259) outside the palette.
- **Icons:** Lucide line icons at a consistent 1.5–2 px stroke, which fits the hairline aesthetic. The Back buttons use a text "←" that renders from a fallback font.
- **Glows and lifts:** `btn-cinema` (green glow plus a shine sweep) and `hover-lift` (green-tinted shadow) are app-style effects; the hero buttons are flat with a soft sand halo. Two button languages coexist: hero buttons are uppercase, tracked, 2 px radius and flat; site buttons are sentence case, 3–4 px radius, with a gradient and glow.
- **Body background:** two radial gradients at 3% and 2% primary under `background-attachment: fixed`. They are invisible (ΔE < 1) and fixed backgrounds stop the browser from scrolling the page as a single layer on some devices, which works against the cheap-scroll goal.

## Findings

| # | Pri | Area | Finding |
|---|---|---|---|
| V1 🔄 | P1 | Type | No body font is set outside the hero: 80% of text renders in the visitor's OS font, while the self-hosted Inter is used only in the hero. |
| V2 ✅ | P1 | Colour | Dark-mode green as text scores APCA Lc 37–38 (nav active state, roles, year highlights, page-title corners down to Lc 24). |
| V3 ✅ | P1 | Colour | Dark-mode buttons (ink on green) score Lc 40; reading copy is mostly `muted-foreground` (Lc 53–55), so dark pages feel dim and flat. |
| V4 🔄 | P1 | Art direction | Two visual languages: an editorial hero (Cormorant + Inter, flat sand and hairline buttons) vs. the rest (Nunito, gradient titles, glow buttons, centred stock sections). |
| V5 ✅ | P2 | Type | Inverted hierarchy: detail-page h1 36 px < list-page h1 60 px; detail h1 ≈ section h2 (30 px). |
| V6 ✅ | P2 | Type | Global heading tracking −0.045em is too tight at ≤20 px (footer club name, card titles); blog titles use a different value. |
| V7 ✅ | P2 | Brand | The logo isn't theme-aware: dark-mode layers score Lc 8–20; the overlay variant uses an off-palette blue-grey. |
| V8 🔄 | P2 | Colour | The dark footer uses `muted` (L26), the lightest large surface, and its text drops to Lc 53. |
| V9 🔄 | P2 | Colour | Brand-coloured social icons (chroma 0.24–0.26, 2.5× the palette maximum) on the event call-to-action card; elsewhere the same icons are mono green. |
| V10 🔄 | P2 | Imagery | The Twemoji trophy (Palmarès) and the grey placeholder avatar (Person) are off-style and off-palette. |
| V11 ✅ | P2 | Type | Reading measure is about 100 characters on About and the event intro, about 90 on the film synopsis. |
| V12 🔄 | P2 | Type | Arabic titles have no web font, so they fall back to whatever the OS has next to Nunito. |
| V13 ✅ | P3 | Colour | Gradient-filled titles: lower contrast (light middle 3.09:1, dark corners 3.47:1) and a dated idiom. |
| V14 ✅ | P3 | Colour | The section divider under titles is invisible (ΔE 6); the body background gradients are invisible yet use `background-attachment: fixed`. |
| V15 ✅ | P3 | Content | About's last paragraph is full colour while the others are muted; "Member" is accented 12 times; team portraits are graded inconsistently. |
| V16 ✅ | P3 | Type | "←" renders from a fallback font (Arimo); content mixes straight and curly quotes; the category badge truncates to "..". |
| V17 ✅ | P3 | Brand | The 404 page has no brand presence. |
| V18 ✅ | P3 | Tidy | Unused font faces imported (Inter 300/500/700, Cormorant 500/700 upright, Nunito 400); `secondary` and `muted` are near-duplicate tokens; unused `emerald` scale. |

## Recommendations

### R1. Split the green into text and fill roles (fixes V2, V3, V13)

Add a text-role token and point the dark fill back to the hero green:

- `--primary` (fills: buttons, badges, progress bar): dark `#1f6b5c` (the hero green, same as light), with `--primary-foreground` cream again (Lc 77).
- New `--primary-text` (links, active nav, roles, icons, headings): light `#1c6e5c` (unchanged), dark `#5abf9c` (the hero's `--green-light`, Lc 58) or `#6cc9a8` (Lc 64) if more legibility is wanted.

The two themes then share one fill green, the hero's, and dark-mode green text becomes bright and minty, as it already is in the hero's hover states. Classes such as `text-primary` would move to `text-primary-text` (or the Tailwind colour can be named `brand` to keep it short).

### R2. One type system, taken from the hero (fixes V1, V4, V6, V12)

- **Body and UI: Inter**, set on `body`. It's already loaded and preloaded, so there's no extra download for 400/600.
- **Display (page titles, film and event titles, pull-quotes): Cormorant Garamond 600**, solid colour, no gradient. The hero, About pull-quote and titles then share one voice.
- **Section headings and card titles: Inter 600** with tracking scaled by size (about −0.02em at 30 px, 0 at ≤20 px).
- **Labels and eyebrows: Inter 600, uppercase, +0.2em**, the hero's eyebrow style, reused for "Quick links", badges and metadata labels.
- **Drop Nunito.** If its warmth is wanted somewhere, keep it to one place, but two sans faces plus a serif is one too many.
- **Arabic:** add a self-hosted Arabic face for titles (for example *Noto Kufi Arabic* or *IBM Plex Sans Arabic* via `@fontsource`), with Arabic subsets only.

This is the largest change in the audit and needs a visual pass across all pages. Trying it on two pages (Home and a film page) first would make it easy to compare.

### R3. Hierarchy and measure (V5, V11)

Detail-page h1 at the page-title size (48–60 px in the display serif); section h2 at 24–30 px. Cap reading copy at about 65–70ch everywhere (`max-w-prose`-like), and use `foreground/85` for primary reading text, keeping `muted-foreground` for metadata.

### R4. Theme the logo (V7)

Pass dark-mode fills (for example cream for the cloud, `#5abf9c` for the camera, sand for the filmstrip) the same way the overlay variant is passed, and replace `#7b828d` with a green-grey such as `#8fa39a`.

### R5. Surfaces and buttons (V8, V4, V14)

- Dark footer on `secondary` (L25 deep green) or `card` (L20) instead of `muted`.
- One button language: the hero's. Primary = solid fill, no gradient, no glow, no shine sweep; secondary = hairline. Keep sentence case for small buttons if uppercase feels too loud outside the hero.
- Remove the invisible body gradients and `background-attachment: fixed`; give the title divider real contrast or drop it.

### R6. Imagery (V9, V10, V15, V17)

- Mono icons in the call-to-action card (`text-primary-text`), matching the footer and Contact.
- Replace the Twemoji trophy with a line trophy or laurel in sand, echoing the festival laurels on the posters.
- Placeholder avatar: `muted` circle with the person's initials in `muted-foreground`, or a sand silhouette.
- Optional: a grading rule for team portraits (for example all black and white, like the hero and the blog's lead photo).
- 404: reuse the hero vocabulary (eyebrow, serif "404", hairline button).

## Reproduce

The scripts lived in the session scratchpad (puppeteer-core 23.11.1, axe-core 4.10.2, culori 4.0.2, apca-w3 0.1.9), run against `python3 -m http.server 4173 -d out`. `extract.mjs` walks the DOM per page and theme; `analyse.mjs` computes contrast, the type inventory and colour inventory; CVD screenshots use `Emulation.setEmulatedVisionDeficiency`.
