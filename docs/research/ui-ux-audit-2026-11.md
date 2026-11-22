# UI/UX audit: cineamateur-hlif.com (November 2026)

Status: quick wins done (#2, #4, #5, #6, #11, #12, #13 duplicate id, #10, #14, #17, #18, #19, #20, #23); the rest is open. Audited at commit `5552086` (branch `event-structured-data`).

## Method

- Read every view (`src/views/`), shared component (`src/components/`), `index.css`, `home-hero.css` and the Tailwind config.
- Built the static site (`npm run build`) and served `out/` locally.
- Drove headless Chrome (puppeteer) over 13 pages: home (EN/FR), movies, a movie, events, an event, blog, an article, about, contact, palmarès, a person, 404. Each page ran at **1440×900 desktop** and **390×844 mobile @2x**, in **light and dark** themes (52 runs).
- For each run I captured full-page and above-the-fold screenshots, ran **axe-core 4.10** (WCAG 2.0/2.1/2.2 A+AA plus best practice), and checked horizontal overflow, heading outline, landmarks, tap-target sizes, image natural size against displayed size, bytes transferred and console errors.
- I also tested keyboard tab order, the open mobile menu, the movie filters, hover overlays, `prefers-reduced-motion`, a 320px reflow, JavaScript disabled, and the real `404.html`.

Severity: **P0** breaks the experience or excludes users · **P1** clear UX/accessibility debt · **P2** polish.

## Executive summary

The visual identity is strong. The editorial hero, the green/sand palette, the Cormorant/Inter/Nunito pairing, the poster-led film grid and the dark/light parity all look intentional and coherent. Engineering hygiene is good too: no horizontal overflow at any width (including 320px), no console errors, CLS ≈ 0, a sensible keyboard order, `inert` on the closed mobile menu, and a localized 404.

The biggest problems are **content and purpose, not chrome**:

1. **A film club site where no film can be watched.** `playerVisible` is `false` on all 38 films. The hero button "Explore our films" leads to pages with a synopsis and credits but no film, trailer or link.
2. **The home page is hidden without JS and in any non-scrolling capture.** The two sections below the hero start at `opacity: 0`.
3. **Images are far too heavy.** A 9.4 MB blog cover, 5+ MB event photos and 2.7 MB portraits shown at 96px. The blog index transfers ~12 MB and an event page ~16 MB.
4. **Blog articles are hard to read.** Paragraphs have no spacing, lines run ~110 characters, and body text is in the muted colour.
5. **Dark-mode primary buttons and badges fail contrast** (3.66:1), as do the event locations in light mode (3.07:1).

## Findings by priority

| # | Sev | Area | Finding |
|---|---|---|---|
| 1 | P0 | Content | No film is watchable: `playerVisible` is false on every movie |
| 2 | P0 ✅ | Home | Below-the-fold sections are invisible without JS or scrolling |
| 3 | P0 | Perf | Multi-MB images on every content page |
| 4 | P0 ✅ | Blog | Article body has no paragraph spacing; `prose` classes do nothing |
| 5 | P1 ✅ | A11y | Dark-mode primary colour fails text contrast (3.66:1) |
| 6 | P1 ✅ | A11y | Movie-card link name is the whole synopsis; hidden overlay is read first |
| 7 | P1 | Contact | "Send message" is a disguised `mailto:` that clears the form |
| 8 | P1 | IA | Palmarès is an empty "coming soon" page in the main nav |
| 9 | P1 | IA | Home doesn't surface events, the blog or how to join |
| 10 | P1 ✅ | A11y | Gallery and media thumbnails can't be reached by keyboard; the lightbox has no focus management |
| 11 | P1 ✅ | Nav | Translucent sticky nav without blur: page text collides with nav links |
| 12 | P1 ✅ | Motion | `prefers-reduced-motion` is ignored by scroll reveals and smooth scroll |
| 13 | P1 (id ✅) | Data | Duplicate movie id `mad-ant`; 4 public films have no description at all |
| 14 | P1 ✅ | A11y | Light-mode event location text fails contrast (3.07:1) |
| 15 | P2 | Movies | Filters, sort and result count hidden behind an unlabeled icon |
| 16 | P2 | Movie page | Weak mobile header, credits links look like plain text, cryptic `8'` |
| 17 | P2 ✅ | Lazy image | Loader repeats the alt text, so names show twice while loading |
| 18 | P2 ✅ | A11y | Heading order skips (h1 → h3) on 7 page types |
| 19 | P2 ✅ | Consistency | Off-palette colours (amber/orange join card, blue/purple category badges, 📍 emoji) |
| 20 | P2 ✅ | Nav | Footer links omit About and Palmarès; Back buttons ignore where you came from |
| 21 | P2 | Hero | Above-the-fold CTAs sit at the very bottom of a 900px viewport |
| 22 | P2 | Events | No upcoming events state; "Past Event" badge repeated on every past card |
| 23 | P2 ✅ | Misc | Logo alt typo, missing skip link, redundant alts on About |

---

## P0: Critical

### 1. No film can be watched

- **Evidence:** `src/data/movies.json`: 0 of 38 entries have `"playerVisible": true`. Every `movieUrl` is the bare `https://www.youtube.com/embed/` prefix.
- **Impact:** The site's main promise ("Explore our films", "Featured Films", "Discover our Movies") leads to a dead end. A visitor who wants to see the club's work has no next step. The club's YouTube channel is linked only as a small icon in the footer.
- **Recommendation:**
  - Where a film can't be public, still give each movie page a clear action: **Watch the trailer**, **Watch on YouTube** (deep link) or **Request a screening**. A single primary button under the title is enough.
  - Add a "Watchable" filter chip or badge on cards once some films are available.
  - Until then, change the home and hero copy from "Explore our films" toward "Discover our filmography" so the copy promises what the pages deliver.

### 2. Home sections invisible without JS or scrolling

- **Evidence:** `.animate-on-scroll` starts at `opacity: 0; transform: translateY(30px)` (`src/index.css`) and is only revealed by `useScrollAnimation`. With JS disabled, the computed opacity of "Featured Films" is `0`. A full-page screenshot without scrolling shows the hero, then about 1,000px of blank page, then the footer.
- **Impact:** Users whose JS fails or loads late, link-preview and screenshot tools, some crawlers' rendered snapshots, and print all see an empty home page. For a statically prerendered site this undoes much of the point of prerendering.
- **Recommendation:** Make the hidden state opt-in once JS runs: add a `js` class on `<html>` in the existing inline theme script, and scope the rule to `.js .animate-on-scroll:not(.in-view)`. Also disable it under `prefers-reduced-motion` (see #12).

### 3. Image weight

| Page (first load, desktop) | Transferred | Main offenders |
|---|---|---|
| Event "Afterwork" | **15.8 MB** | `watchingmovies.jpg` 5.6 MB, `experience.jpg` 5.3 MB, `hero.jpg` 1.3 MB, 2 MB of webm |
| Blog index | **12.3 MB** | `blogs/youssef_blog.JPG` **9.4 MB** |
| Article | **10.2 MB** | same 9.4 MB cover |
| Movies | **9.7 MB** | `accident-de-travail.jpeg` 2.3 MB, `temp-mort.jpeg` 1.1 MB, `wed_trabelsia.jpg` 1.0 MB |
| About | **7.3 MB** | `Members/khalil.jpg` 2.7 MB, `wadii.jpg` 2.5 MB, **shown at 96×96** |
| Home | 4.0 MB | `wed_trabelsia.jpg` 1 MB for a ~280px-wide card |

`public/` holds 79 MB of event media. `public/events/afterworkMovienight/IMG_2788.jpeg` alone is 10.9 MB, and `public/About/ydour.jpg` (7.6 MB) is still shipped next to the optimized copy.

- **Impact:** On a 4G connection in Tunisia, the blog's lead image alone takes many seconds. The visible spinner (`LazyImage` → `Loader`) makes the slowness obvious, and mobile data costs are real for the audience.
- **Recommendation:**
  - Add a build-time image step. `images.unoptimized` is required for `output: 'export'`, so use a script (sharp) that writes AVIF/WebP at 2–3 widths, and emit `srcset`/`sizes` from `LazyImage`.
  - Size targets: posters 600×900 (cards) and 1000×1500 (detail); portraits 256×256 (the About page shows 96px); article and event covers 1600px wide at ~200 KB; gallery 1600px wide.
  - Give the LCP image on detail pages (poster, article cover, event hero) `loading="eager"` and `fetchpriority="high"`. `LazyImage` currently forces `loading="lazy"` on everything, including above-the-fold heroes.
  - Remove unused originals from `public/` (for example `About/ydour.jpg`, the 3.2 MB `cinema-doodle-set_160308-188.svg` if it's unused).

### 4. Blog articles are hard to read

- **Evidence:** `src/views/BlogArticle.tsx` uses `prose prose-lg`, but `@tailwindcss/typography` is not installed (`tailwind.config.ts` loads only `tailwindcss-animate`), so those classes do nothing. Tailwind's preflight sets `p { margin: 0 }`, so a 12-minute essay renders as one unbroken wall of text (see `article.desktop.light.png`). The measure is ~110 characters at desktop (`max-w-4xl`, `2xl:max-w-5xl`), and body text is `text-muted-foreground`.
- **Recommendation:**
  - Either install `@tailwindcss/typography`, or drop `prose` and add `space-y-6` plus explicit `h2` margins.
  - Limit the reading column to `max-w-[68ch]` while keeping the cover image wide.
  - Use `text-foreground/90` for body copy and `text-lg leading-8` at desktop sizes.
  - The body parser only understands `## ` headings and paragraphs. Consider adding blockquote and italic support, since the essays quote people.

---

## P1: Important

### 5. Dark-mode primary contrast

- axe `color-contrast` (serious): cream `#f7f4ee` on dark primary `#298e75` is **3.66:1** (needs 4.5:1 for text under 18.66px bold). This hits every `Button` default (Send message, Show all, View all movies), the `Badge` default ("Fiction" on movie pages) and the active genre chip.
- The `.dark { --primary: 165 55% 36% }` override was brightened "so it pops", which pushed it out of AA for light text.
- **Fix:** Either use dark ink text on primary in dark mode (`--primary-foreground: 162 40% 8%`; ~5:1 on that green), or darken primary to about `165 55% 28%` and use a separate, brighter `--ring` or accent token for the pops.
- The gradient headings (`PageTitle`, `ElementTitle`: `from-primary via-primary/70`) can't be measured by axe. The lighter middle stop on cream sits near 3:1. That is acceptable for 48px+ titles but borderline for the 30px `ElementTitle` on mobile.

### 6. Movie cards announce the synopsis instead of the title

- **Evidence:** The tab-order test reads the card links as "Slim, un adolescent du quartier de Wed T…", "In a confined space, a group gathers aro…". The hover overlay (`opacity-0`, but still in the accessibility tree) comes before the title inside the link, so screen readers read the whole synopsis, then "Directed by…", then the title, on every card in a 34-card grid.
- axe `scrollable-region-focusable` (serious) also fires on mobile: the overlay's `overflow-y-auto` region can't be scrolled with the keyboard.
- Keyboard users never see the overlay: it reacts to `group-hover` and `group-active` but not to `group-focus-visible`.
- On touch, `group-active` flashes the synopsis over the poster just as the tap navigates away, which reads as a glitch.
- On an EN page, `wed-trabelsia` shows a **French** synopsis because the EN text is missing and the fallback is FR.
- **Fix:** Put `aria-hidden` on the overlay (the synopsis is on the detail page), or give the link `aria-labelledby` pointing at the title. Remove `overflow-y-auto` and clamp the text with `line-clamp-[8]`. Add `group-focus-visible:opacity-100`. Drop the `group-active` variants on touch, or show the overlay only on `(hover: hover)`.

### 7. Contact form is a disguised `mailto:`

- **Evidence:** `src/views/Contact.tsx`: submitting sets `window.location.href = mailto:…`, then clears the form immediately.
- **Impact:** On phones without a mail app set up, and on most desktops where people use webmail, nothing visible happens, or an unexpected app opens, and **the message the user typed is gone**. No success or failure feedback is shown. "Full name" is optional but gets appended as `Name:`.
- **Fix:**
  - Best: a form backend that works with static hosting (Formspree, Getform, Basin, or a Google Form, which the join flow already uses). Show inline success and error states.
  - Minimum: relabel the button "Open in my email app", don't clear the fields, and show the address with a copy button as a fallback.

### 8. Palmarès is an empty page in the main nav

- One of seven main-nav slots leads to a trophy emoji and "coming soon". Meanwhile real awards exist: the *Wed Trabelsia* poster shows four laurels (UNICA 2026, Amnesty 2025, FIFAK 2025…).
- **Fix:** Either hide the nav item until the page has content, or seed it now. Add an `awards: [{festival, year, prize}]` field to `movies.json`, list awards by year on Palmarès, and show laurel badges on movie cards and detail pages. That also strengthens the film pages (see #1).

### 9. Home doesn't do enough of the home page's job

- The home page is a hero, then four posters (simply the first four in `movies.json`), then a generic "Join our community" block whose two buttons ("Get in Touch", "Learn More About Us") repeat the hero's buttons.
- It doesn't show the next or latest **event** (events are the club's most active output: 4 in 15 months), recent **blog** articles, or a direct **Join** action. The real join form (`JOIN_FORM_URL`) is reachable only from the last card on the Contact page, which is near the bottom of the page on mobile.
- **Recommendation for the home order:** Hero → *Next / latest event* (one wide card) → Featured films → *From the blog* (2–3 cards) → Join band with the real form link as the primary button.

### 10. Galleries and lightbox: keyboard and touch

- `AlternatingMedia` and `EventGallerySlider` open the lightbox from `<div onClick>` with no `tabindex`, `role` or key handler, so keyboard users can't open any photo.
- `LightboxOverlay` handles Escape, but it doesn't move focus into the dialog, trap focus or restore it on close. It also has no `role="dialog"`/`aria-modal`, no ←/→ keys in the gallery lightbox, and no swipe (Embla is already a dependency).
- The carousel's prev/next buttons have no visible focus style, and their 40px size is fine, but they float on top of the photos.
- **Fixed:** thumbnails are buttons labelled "View full size: …"; the lightbox is a modal dialog that moves focus to Close, keeps Tab inside, returns focus to the thumbnail, and takes ←/→ in the gallery (with the counter announced). Still open: swipe in the lightbox, and a pause control for the autoplaying looped videos (WCAG 2.2.2).

### 11. Sticky nav collides with content

- Off the hero, the nav is `bg-background/85` without a backdrop blur. While scrolling, the page heading and subtitle show through the nav links (the movies screenshot shows "Explore our curated collection…" right behind "Home Movies Events…").
- **Fixed:** the bar is opaque (`bg-background`) off the hero. A backdrop blur was tried and dropped: it re-blurs the band behind the nav on every scroll frame, which costs on low-end phones, and the look should stay the same on phones and desktops.

### 12. Reduced motion is only partly respected

- With `prefers-reduced-motion: reduce`, `.animate-on-scroll` still transitions over **0.8s**, `html { scroll-behavior: smooth }` stays on, and the `hover-lift`, card scale and `PageTitle` `animate-in` effects all still run. The hero and progress bar do honour the setting.
- **Fix:** Add one global `@media (prefers-reduced-motion: reduce)` block that sets `.animate-on-scroll { opacity: 1; transform: none; transition: none }` and `html { scroll-behavior: auto }`, and switches off the `animate-in`/`hover-lift` transforms.

### 13. Data problems that surface in the UI

- **Duplicate id `mad-ant`** (one public, one not). `getMovieById` returns the first match, and React list keys collide.
- **Four public films have no description in any language:** `mad-ant`, `offrande`, `un-des-notres`, `tayara`. Their cards have no hover overlay, so they behave differently from the others.
- ✅ `wed-trabelsia` had no EN description, so English visitors saw French (#6). Fixed: English synopsis added.
- The year slider starts at 1964 (the founding year), but the oldest film is 1967. The range is cosmetic and harmless.

### 14. Event location colour in light mode

- `text-amber-600` on the card is **3.07:1** (axe, 4 cards). Use `text-amber-700` (~4.8:1) or the token-based `text-accent-foreground`. Replace the 📍 emoji with the lucide `MapPin` used everywhere else.

---

## P2: Polish and consistency

### 15. Movies page controls

- Search, the filter icon and the result count are the only visible controls. Genre, year, sort **and the result count** are hidden behind an icon-only toggle (`SlidersHorizontal`, `aria-label="Filters"`). With only 2 genres, the two chips plus the sort select fit inline on desktop without a panel.
- The search placeholder is just "Search". Say what it covers: "Search titles, people, years…" (the fuzzy index already covers cast and crew).
- While searching, the sort control is silently ignored in favour of relevance. Show "Sorted by relevance" in that case.
- The empty state uses a "?" in a gradient circle, unlike `EmptyState` used elsewhere. Reuse `EmptyState`.

### 16. Movie detail page

- **Mobile header:** the grid stays `grid-cols-3` at 390px, so the poster is ~100px wide with a large empty area under the title and badges. On small screens, stack the poster at ~60% width centred, or use a blurred poster backdrop behind the title.
- **Linked credits look like plain text:** names that go to a person page and names that don't are both `text-muted-foreground`, with an underline only on hover. Give links a persistent underline or `text-foreground` (also WCAG 1.4.1).
- **`8'`**: a minute mark only cinephiles parse. Render it as "8 min" through i18n (`duration` stays `8'` in the data).
- The headings Director/Actors/Crew are `h3` directly under the `h1` (axe `heading-order`). Make them `h2`, styled the same.
- "Actors" is shown even for mixed casts. Consider "Cast".
- The "More from X & Y" heading is `text-3xl` and wraps over two lines on mobile. Use `text-2xl` below `sm`.

### 17. LazyImage loader

- `Loader` renders the image's `alt` as visible text under the spinner. On About, every card therefore shows "Wadii Klaii" twice while loading (once as the spinner caption, once as the title). Drop the caption, or use a skeleton/blur placeholder. With properly sized images (#3), the loader would rarely be visible at all.

### 18. Heading structure

axe `heading-order` fires on movies, movie, event, blog, article, contact and palmarès. Card titles are `CardTitle` (`h3`) with no `h2` between them and the page `h1`. Either add a visually hidden `h2` ("All films") or let `CardTitle` take an `as` prop.

### 19. Off-palette colours ✅

- Fixed: no raw Tailwind palette colours remain in `src`. The sand `--accent` is the highlight colour (as on the hero's main button). The Contact "Join" card is sand-tinted with a sand button (was an amber→orange gradient). The blog "Featured" badge is sand (was pale blue). Category badges use `secondary`, and the unused `CATEGORY_COLORS` map (with placeholder keys "Autre 1/2/3") is gone. Event locations use body text with a primary/accent `MapPin` (were amber).
- Still open: `SocialLinks` has three variants for three places; consider two. `tailwind.config.ts` still defines an unused `emerald` scale.

### 20. Navigation details

- ✅ The footer quick links omitted **About** and **Palmarès**. Fixed: the navbar and footer share one list (`src/lib/site-nav.ts`).
- ✅ `BackButton` was hard-wired (Person always went to About, Movie to /movies). Fixed: when the visitor came from another page of the site it steps back in history (restoring that page's scroll) and reads "← Back", or keeps its label when that page is its fixed target; opened from outside, it stays a link to the fixed path.
- Back buttons are full outline buttons (40px tall, the most prominent element above the title on mobile). A smaller text link with a ← icon competes less with the title.
- The mobile menu is a small top-right popover with no dimmed backdrop. That works, but with 7 items a full-width sheet would give bigger targets and room for the language/theme controls with labels.
- The language toggle shows the **current** language ("EN"). Users often expect a toggle to show the *destination* language. The `title`/`aria-label` are correct, but showing "FR" (or "EN | FR" with the active one bold) is clearer.

### 21. Hero

- At 1440×900, the two CTAs sit at y≈862–900, right at the fold edge. At 1366×768 (a very common laptop size) they are below it. The stack (eyebrow → 3-line title → tagline → 4-line description → quote → CTAs) is long. Consider moving the quote out of the hero or shortening the description, so the CTAs sit in the first viewport.
- The eyebrow starts ~8px below the nav bar on desktop and feels cramped. Add ~1.5rem of top padding to `.content` on desktop.
- `.credits` (1964 · HAMMAM-LIF · …) and `.side-note` use `--text-faint` (34% white). That is decorative, but it fails contrast if read as content. Raise it to ~55%, or mark it `aria-hidden`.

### 22. Events

- There are no upcoming events, so the page opens with "Past Events". Add an "upcoming" empty state ("Next screening announced on Instagram", with follow buttons) **above** the past list, so the page still answers "what's next?".
- Every past card shows a "Past Event" badge inside a "Past Events" section, which is redundant. Show the status badge only in the upcoming section.
- Past events would benefit from a link to the photo gallery or recap on the card.
- On event detail pages, the quote card uses a **Clock** icon next to the quotation. Use `Quote`, or no icon.

### 23. Small accessibility items

- Logo `aria-label` default is "FTCA **Hammemlif** logo" (typo). Inside the home link it should simply be "Home – FTCA Hammam-Lif".
- There is no **skip link**: keyboard users tab through 10 header stops on every page. Add a visually hidden "Skip to content" link targeting `<main id="content">`.
- axe `image-redundant-alt` on About: the portrait alt repeats the name right below it. Use `alt=""` there, since the name is the link text.
- The share "Copy" button gives visual feedback only. Add `aria-live="polite"` to the "Copied" state.

---

## What works well (keep)

- **Identity:** the green-ink/cream/sand palette, the serif display title and the film-grain hero feel specific to this club rather than templated. Dark and light modes are both designed, not inverted.
- **Posters as the primary visual unit,** with a consistent 2:3 crop and one shared `MovieCard`.
- **Responsive robustness:** zero horizontal overflow on all 52 runs, plus 320px reflow OK; tap targets in the nav are 36–40px.
- **Keyboard order** is logical, and the closed mobile menu uses `inert` correctly.
- **Bilingual handling:** locale-preserving switch, `lang` set on the movie description, RTL for the Arabic article.
- **Stability:** CLS ≈ 0, no console errors, a localized 404 that renders the full shell.

## Suggested order of work

1. **Quick wins (≈1 day):** reduced-motion and no-JS fix for `animate-on-scroll` (#2, #12); article spacing and measure (#4); dark primary-foreground (#5); amber-700 (#14); overlay `aria-hidden` and focus (#6); nav blur (#11); logo label, skip link, heading levels (#18, #23); dedupe `mad-ant` (#13).
2. **Image pipeline (≈1–2 days):** a sharp script, `srcset` in `LazyImage`, eager LCP, and pruning `public/` (#3). This is the biggest measurable gain.
3. **Content and IA (planning with the club):** watch/trailer actions (#1), awards data → Palmarès and laurels (#8), home sections for events/blog/join (#9), a real contact form (#7).
4. **Interaction polish:** lightbox accessibility and swipe (#10), inline movie filters (#15), mobile movie header (#16), back navigation (#20), hero fold (#21).

## Artifacts

The screenshots and the raw metrics (`results.json`, `interact.json`) were generated in a temporary scratch directory and are not committed. Re-run with puppeteer-core + axe-core against `npm run build` output to reproduce.
