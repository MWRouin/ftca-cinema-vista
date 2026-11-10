# FTCA Cinema Vista — Reproduction Report

> Generated: 2026-06-12  
> Purpose: Full audit of the current site to inform a cleaner, SEO-optimized rebuild.

---

## 1. Project Overview

**FTCA Cinema Vista** is the web presence of the FTCA (Film & Theatre Club of Tunisia – Hammam-Lif branch). It is a content-heavy static site that showcases amateur films, club events, blog articles, team members, and contact information.

- **Type:** Static React SPA deployed to GitHub Pages (or equivalent)
- **Language:** TypeScript + React
- **All data is hardcoded** — no backend, no CMS, no database
- **Deployment output:** `/dist/` (static HTML/JS/CSS)

---

## 2. Tech Stack

### Core Framework
| Layer | Library | Version |
|---|---|---|
| UI Library | React | 18.3.1 |
| Build Tool | Vite + SWC | 5.4.1 |
| Routing | React Router v6 | 6.26.2 |
| Type Safety | TypeScript | 5.5.3 |

### Styling
| Layer | Library | Version |
|---|---|---|
| CSS Framework | Tailwind CSS | 3.4.11 |
| Component Library | shadcn/ui (Radix UI) | — |
| Icons | Lucide React | 0.462.0 |
| Class Utilities | clsx, tailwind-merge, cva | — |

### State & Data
| Layer | Library | Version |
|---|---|---|
| Server State | TanStack React Query | 5.56.2 |
| Forms | React Hook Form | 7.53.0 |
| Validation | Zod | 3.23.8 |

### UI Utilities
| Feature | Library | Version |
|---|---|---|
| Carousel / Slider | Embla Carousel React | 8.3.0 |
| Dark/Light Theme | Next Themes | 0.3.0 |
| SEO / Head Tags | React Helmet Async | 2.0.5 |
| Toast Notifications | Sonner | 1.5.0 |
| Charts | Recharts | 2.12.7 |
| Date Picker | React Day Picker | 8.10.1 |

---

## 3. Design System

### Color Palette (HSL-based, Tailwind custom tokens)
| Token | Value | Usage |
|---|---|---|
| Primary | `#0a6b66` (teal) | CTAs, active states, headings |
| Accent | `#d79b5b` (amber) | Highlights, decorative elements |
| Background (dark) | `#0c1318` | Page background |
| Card | Dark charcoal | Cards, panels |
| Foreground | Off-white | Body text |

### Typography
- **Display / Headings:** "Cinema Sunday" (custom font, `/public/fonts/cinema_sunday/`)
- **Body:** "Nunito" (Google Fonts), sans-serif fallback
- **Scale:** Tailwind defaults with custom `text-2xl` → `text-6xl` hero sizes

### Theming
- Dark / Light mode via `next-themes`, class-based (`class="dark"`)
- Theme choice persisted in `localStorage`
- Toggle button in navbar

### Animations
Custom Tailwind keyframes defined in `tailwind.config.ts`:
- `fade-in` — opacity 0 → 1
- `fade-in-up` — opacity 0 + translateY(20px) → normal
- `scale-in` — scale(0.95) → 1
- Scroll-triggered: `useScrollAnimation` hook (IntersectionObserver)
- Hover: `scale-105`, `shadow-lg`, `brightness` transitions

### Responsive Breakpoints
Standard Tailwind (`sm`, `md`, `lg`, `xl`). Notable grid layouts:
- Movies grid: 2 cols (mobile) → 4 cols (xl)
- Blog grid: 1 col → 3 cols (lg)
- Navigation: hamburger drawer on mobile, centered links on desktop

---

## 4. Pages & Routes

All routes are lazy-loaded via `React.lazy()` for code splitting.

| Route | File | Description |
|---|---|---|
| `/` | `Home.tsx` | Landing page — hero, featured films strip, CTA |
| `/movies` | `Movies.tsx` | Full film catalog with genre filter dropdown |
| `/movies/:id` | `MoviePlayer.tsx` | Film detail — poster, metadata, cast, related films, YouTube embed |
| `/events` | `Events.tsx` | Event list split into Upcoming / Past tabs |
| `/events/ydour` | `YdourEvent.tsx` | Ydour screening #1 detail page |
| `/events/ydour-v2` | `YdourEventV2.tsx` | Ydour screening #2 detail page |
| `/events/films-de-hammamlif` | `FilmsDeHammamLifEvent.tsx` | Films de Hammam-Lif festival detail |
| `/events/afterwork-movienight` | `AfterworkMovienight.tsx` | Afterwork movie night detail |
| `/blog` | `Blog.tsx` | Blog list — featured article + card grid |
| `/blog/:slug` | `BlogArticle.tsx` | Full article page |
| `/about` | `About.tsx` | Team members, club history, honorary members |
| `/palmares` | `Palmares.tsx` | Awards page (currently "coming soon") |
| `/contact` | `Contact.tsx` | Contact form + club info + social links |
| `/*` | `NotFound.tsx` | 404 page |

---

## 5. Component Inventory

### Layout
| Component | File | Notes |
|---|---|---|
| Layout wrapper | `Layout.tsx` | Wraps all pages; includes `<Navigation>` + `<Footer>` |
| Navigation | `Navigation.tsx` | Sticky, blur-on-scroll, mobile drawer |
| Footer | `Footer.tsx` | Links, socials, address |
| Logo | `Logo.tsx` | SVG logo, scalable |
| Theme Provider | `ThemeProvider.tsx` | Context wrapper for dark/light |
| Theme Toggle | `ThemeToggle.tsx` | Sun/moon toggle button |

### Custom UI (`/components/customUi`)
| Component | Purpose |
|---|---|
| `page-title.tsx` | Full-width page heading with optional subtitle |
| `element-title.tsx` | Section-level title |
| `lazy-image.tsx` | `<img>` with skeleton loader + native `loading="lazy"` |
| `loader.tsx` | Animated spinner for suspense / loading states |
| `share-actions.tsx` | Share row: copy link, WhatsApp, Messenger, Twitter/X |
| `article-modal.tsx` | Full-screen modal for article content |
| `event-gallery-slider.tsx` | Embla carousel with lightbox for event photo galleries |
| `hover-image.tsx` | Image with scale/overlay hover effect |
| `instagram-embed.tsx` | Instagram post embed via blockquote + script |

### shadcn/ui Components (`/components/ui`)
40+ Radix-based primitives. Key ones in use:
- **Forms:** `Button`, `Input`, `Textarea`, `Label`, `Select`, `Checkbox`
- **Layout:** `Card`, `Tabs`, `Accordion`, `Sheet`, `Drawer`, `Separator`
- **Overlays:** `Dialog`, `AlertDialog`, `Popover`, `Tooltip`
- **Display:** `Badge`, `Avatar`, `Skeleton`, `Carousel`, `Table`
- **Feedback:** `Sonner` (toasts), `Progress`

### Hooks (`/hooks`)
| Hook | Purpose |
|---|---|
| `useScrollAnimation.ts` | IntersectionObserver — adds CSS class when element enters viewport |
| `use-mobile.tsx` | Returns `true` if viewport < 768px |
| `use-toast.ts` | Programmatic toast API |

---

## 6. Data Layer

### Architecture
All data is **static and bundled at build time**. There is no API, no CMS, and no database.

### Movies
- **Source:** `/src/data/movies.json` (raw data) + `/src/data/movies.ts` (typed getters)
- **Visibility:** Only entries with `"public": true` are displayed
- **Schema:**

```typescript
type Movie = {
  id: string
  title: string
  genre: string
  year: number | '-'
  director: string
  image: string           // path relative to /public/Posters/
  duration?: string
  description?: string | { en: string; fr: string }
  cast?: string[]
  movieUrl?: string       // YouTube embed URL (optional)
  public: boolean
}
```

- **Getter functions:** `getMovies()`, `getMovieById(id)`, `getRelatedMoviesByDirector()`, `getRelatedMoviesByGenre()`

### Blog Articles
- **Source:** `/src/data/blog.ts` — hardcoded TypeScript array
- **Visibility:** Only `public: true` entries shown
- **Schema:**

```typescript
type BlogArticle = {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  readTime: string
  image?: string
  body?: string
  lang?: string       // 'fr' | 'en'
  public: boolean
}
```

### Events
- **Source:** Hardcoded directly inside `Events.tsx`
- **Fields:** title, subtitle, description, date, location, image, status (`'upcoming' | 'past'`), tags, route slug
- **No shared data type** — defined inline in the component

### Contact Info
- Hardcoded in `Contact.tsx`: email, phone, address, social URLs, meeting times

---

## 7. Feature Inventory

### Film Catalog
- Browse all public films
- Filter by genre (dropdown)
- Film detail page: poster, metadata (director, year, duration, cast), multilingual description (FR/EN)
- Related films: by director and by genre
- Optional YouTube embed per film

### Events
- List of events with Upcoming / Past separation
- Each event has a dedicated detail page with:
  - Hero banner image
  - Event info (date, time, venue)
  - Photo gallery carousel with lightbox
  - Embedded media (YouTube / Instagram)
  - Overview text and quotes sections

### Blog
- Featured article pinned at top
- Grid of article cards (image, category badge, title, excerpt, author, date, read time)
- Full article pages with body text
- Color-coded category badges
- Multilingual support (FR / EN)
- Share actions on articles

### About / Team
- Club history / mission statement
- Grid of member cards (photo, name, role)
- Honorary members section

### Contact
- Contact form → `mailto:` action (opens user's email client)
- Club details: email, phone, address
- Social links: Facebook, Instagram, YouTube
- Meeting schedule
- Join CTA linking to Google Form

### Palmares (Awards)
- Page exists but shows "coming soon" state

### Sharing
- `ShareActions` component used across articles and events
- Features: copy URL to clipboard, share to WhatsApp, Facebook Messenger, Twitter/X

### Navigation
- Sticky header with blur backdrop on scroll
- Desktop: logo left, nav links centered, icons right (theme toggle)
- Mobile: hamburger → `Sheet` drawer with full nav links

### SEO
- `react-helmet-async` for per-page `<title>`, `<meta>`, Open Graph, Twitter Card tags
- JSON-LD structured data: `Organization`, `WebSite`, `Event`, `Movie`
- Build-time sitemap generation (`scripts/sitemapGenerator.js`)
- Build-time static page shell generation (`scripts/staticPagesGenerator.js`)
- `robots.txt` in `/public`
- Language `<html lang="">` set per page
- Google Search Console verification HTML file in `/public`

---

## 8. Assets Inventory

### Fonts
- **Cinema Sunday** — display/logo font, TTF files in `/public/fonts/cinema_sunday/`
- **Nunito** — loaded via Google Fonts CDN

### Images (`/public`)
| Folder | Contents |
|---|---|
| `/Posters/` | 50+ film poster JPGs (named by film title) |
| `/Backgrounds/` | Hero image (`hero-image-hlif.jpg`) |
| `/events/ydour/` | Photo gallery for Ydour event #1 |
| `/events/ydour2/` | Photo gallery for Ydour event #2 |
| `/events/hmmlif/` | Photo gallery for Films de Hammam-Lif |
| `/events/afterwork/` | Photo gallery for Afterwork event |
| `/blogs/` | Featured images for blog articles |
| `/Members/` | Team member photos + `user.png` fallback |

### Logos / Icons
- `ftca-hmmlif-logo.svg` — main club logo
- `ftca-hmmlif-logo-square.svg` — square variant
- SVG decorative icons: `cinema-film.svg`, `confetti-doodles.svg`, `wavey-fingerprint.svg`
- Favicons: `favicon.ico`, `apple-touch-icon.png`, Android Chrome variants

### External Services
| Service | Usage |
|---|---|
| YouTube | Film and event video embeds |
| Google Forms | Membership application form |
| Google Maps | Location link on Contact page |
| Instagram | Post embeds on event pages |
| Facebook / Instagram / YouTube | Social profile links in Footer + Contact |

---

## 9. Build & Deployment

### Scripts
```bash
npm run dev        # Vite dev server on port 8080
npm run build      # Vite build → sitemap generation → static page shells
npm run build:dev  # Development mode build
npm run preview    # Serve /dist locally
npm run lint       # ESLint check
```

### Environment Variables
| Variable | Purpose |
|---|---|
| `VITE_BASE_PATH` | Base URL path (e.g. `/ftca-cinema-vista/`) for sub-path GitHub Pages deploy |

### Build Output
- `/dist/` — static files, ready for any CDN/static host
- Sitemap: `dist/sitemap.xml`
- Static HTML shells per route (for crawlability)
- `robots.txt` copied from `/public`

### Hosting
Currently configured for **GitHub Pages** sub-path deployment (base path from env). Could be deployed to Netlify, Vercel, Cloudflare Pages, or any static host with trivial config changes.

---

## 10. Known Limitations & SEO Weaknesses

These are the issues the rebuild should address:

| Issue | Impact | Notes |
|---|---|---|
| **SPA routing** — crawlers get a JS shell | High | Static page shells partially mitigate, but not ideal |
| **All data hardcoded in source** | High | Adding/editing content requires a code deploy |
| **No SSR / SSG** | High | React Helmet meta tags require JS execution; bots see empty head |
| **Events hardcoded in component** | Medium | No shared schema, hard to maintain |
| **Blog body is plain text in TS array** | Medium | No Markdown/MDX, no rich text, no CMS |
| **Palmares page is empty** | Low | Placeholder with no content |
| **No pagination** on Movies or Blog | Low | Performance degrades as content grows |
| **Contact form uses `mailto:`** | Low | Unreliable UX; no server-side handling |
| **Image optimization** | Medium | No WebP conversion, no `srcset`, sizes not defined |
| **No canonical URLs** | Medium | Duplicate content risk with trailing slashes |
| **No 404 handling on static host** | Medium | Requires server rewrite rules |

---

## 11. Content Summary (Current)

| Content Type | Count | Notes |
|---|---|---|
| Films | ~50+ | With posters; subset have YouTube links |
| Events | 4 | Ydour x2, Films de Hammam-Lif, Afterwork |
| Blog articles | ~5–10 | Mix of FR/EN |
| Team members | ~10–15 | With photos |
| Pages | 13 | Including 404 |

---

---

## 12. Architecture Ideation — Mind Map

> This section is a **thinking document**, not a plan. Every node is an open question or a space of options. Nothing is decided here. The goal is to surface trade-offs before committing to any direction.

---

### The Problem Space (Root Node)

```
FTCA Cinema Vista — Rebuild
│
├── Rendering Strategy ──────────────────────────── §12.A
├── Framework Options ───────────────────────────── §12.B
├── Content Update Flow (the "edit mode" question) ── §12.C
├── Data / CMS Architecture ─────────────────────── §12.D
├── Edit Mode Implementation ────────────────────── §12.E
├── Hosting & Deployment ────────────────────────── §12.F
├── Caching Architecture ────────────────────────── §12.G
├── SEO Tooling ─────────────────────────────────── §12.H
└── i18n Architecture ───────────────────────────── §12.I
```

Each axis is independent enough to be decided separately — but decisions on one constrain options on others. The constraint map is in §12.J.

---

### §12.A — Rendering Strategy

The single most consequential decision. Everything else branches from it.

```
Rendering Strategy
│
├── A1. Pure SSG (Static Site Generation)
│     Pre-render all pages at build time to static HTML.
│     Bots and users always receive full HTML.
│     No server required at runtime.
│
├── A2. Pure SSR (Server-Side Rendering)
│     Every request renders HTML on the server from live data.
│     Always fresh. Always needs a server.
│
├── A3. ISR (Incremental Static Regeneration)
│     Pages pre-rendered at build, but individually re-generated
│     at runtime on a schedule or on-demand via API call.
│     Needs a persistent server or edge runtime.
│
├── A4. Hybrid (SSG + SSR per page)
│     Static for content pages, SSR for dynamic/personalised pages.
│     Most flexible, most complex.
│
├── A5. Edge SSR
│     HTML rendered at CDN edge nodes (Cloudflare Workers,
│     Vercel Edge Runtime). Near-zero latency SSR without a
│     centralised origin. Subset of SSR, different constraints.
│
└── A6. SPA + Prerender (current evolution)
      Keep the React SPA but run it through a headless browser
      at build time (react-snap, prerender.io) to generate HTML.
      Lowest migration cost. Lowest quality SSG output.
```

#### Deep Analysis

| Strategy | SEO Quality | Content Freshness | Server Required | Free CDN | Build Time as Content Grows |
|---|---|---|---|---|---|
| A1. Pure SSG | ★★★★★ | Only on rebuild | ❌ | ✅ | Grows (minutes at scale) |
| A2. Pure SSR | ★★★★★ | Real-time | ✅ | ❌ | N/A |
| A3. ISR | ★★★★★ | Configurable (seconds to hours) | ✅ (edge ok) | ❌ | N/A — per-page |
| A4. Hybrid | ★★★★★ | Per-page control | ✅ | ❌ | Partial |
| A5. Edge SSR | ★★★★★ | Real-time | Edge node only | ✅ (edge CDN) | N/A |
| A6. SPA+Prerender | ★★★ | Only on rebuild | ❌ | ✅ | Grows fast |

**The core tension for this project:**

The desire is free CDN hosting (→ no server → A1 or A6), but also content that admins can edit without a 2-minute full rebuild (→ needs ISR/SSR/A3). These two goals are in direct conflict. Resolving this conflict is the main architectural decision.

**Possible resolutions:**

| Resolution | Idea |
|---|---|
| Accept rebuild latency | Full SSG, rebuilds triggered by webhook. Latency: ~2 min. Cost: CI/CD minutes. Acceptable for a low-frequency-update site. |
| ISR on cheap server | ISR with a $5/mo VPS or Vercel free tier. Only the edited page revalidates — no full rebuild. Sub-second freshness. |
| Split the audience | Public site = SSG (CDN, free). Admin editing UI = separate app or separate deployment with SSR. |
| Stale public, live admin | Public always sees CDN-cached static. Admins bypass CDN and always hit origin/API. |
| Edge SSR | Cloudflare Workers or Vercel Edge render HTML at the edge — SSR speed with CDN distribution. Free tier exists. |

---

### §12.B — Framework Options

```
Framework
│
├── B1. Next.js (App Router)
│     └── B1a. output: 'export'  → pure SSG, no server at runtime
│     └── B1b. with server       → SSR / ISR / hybrid available
│
├── B2. Next.js (Pages Router)
│     Older API, more stable, same rendering options.
│     Relevant if App Router maturity is a concern.
│
├── B3. Astro
│     Zero-JS by default. Component islands for interactivity.
│     Content Collections with Zod schemas. Built-in i18n.
│     Excellent for content-heavy sites.
│
├── B4. Remix
│     SSR-first, web standards (fetch/FormData), edge-ready.
│     Excellent for forms and mutations. Less SSG-native.
│
├── B5. SvelteKit
│     SSR/SSG, dramatically smaller JS bundles.
│     Would require rewriting components (not React).
│
├── B6. Gatsby
│     Mature React SSG, plugin ecosystem, GraphQL data layer.
│     Slower builds, declining momentum, but proven at scale.
│
└── B7. Vite + vite-plugin-ssg (current stack evolution)
      Minimal migration. vite-plugin-ssg or vike.
      Less opinionated — more manual wiring needed.
```

#### Deep Analysis

| Framework | SSG | SSR | ISR | React compat | Edit mode ease | Ecosystem | SEO built-in | Learning curve |
|---|---|---|---|---|---|---|---|---|
| B1. Next.js App Router | ✅ | ✅ | ✅ | Native | High | ★★★★★ | `generateMetadata` | Medium |
| B2. Next.js Pages Router | ✅ | ✅ | ✅ | Native | High | ★★★★★ | `next/head` | Low |
| B3. Astro | ✅ | ✅ | ❌ native | Via islands | Medium | ★★★★ | Built-in | Medium |
| B4. Remix | ⚠️ limited | ✅ | ❌ | Native | High | ★★★ | Manual | Medium |
| B5. SvelteKit | ✅ | ✅ | ✅ | ❌ | High | ★★★ | Built-in | High (new syntax) |
| B6. Gatsby | ✅ | ⚠️ | ✅ DSG | Native | Medium | ★★★ (declining) | `gatsby-plugin-react-helmet` | Medium |
| B7. Vite + SSG | ✅ | ❌ | ❌ | Native | Medium | ★★ | Manual | Low |

**Notes per framework:**

**Next.js App Router (B1):**
The `generateMetadata()` API runs entirely server-side at build or request time — meta tags are in raw HTML before any JS executes. This is the single biggest SEO upgrade over the current stack. `generateStaticParams` handles dynamic routes. With `output: 'export'`, it becomes a pure static site. Without it, SSR/ISR is available. The same codebase can start as SSG and graduate to SSR without rewriting.

**Astro (B3):**
Content Collections give every entity (movies, events, blog posts) a typed schema with Zod validation — similar to the service interface idea but file-based. The component islands model means the public-facing HTML is near-zero JS (excellent Core Web Vitals). Edit mode is harder to wire because islands are isolated. Less natural for complex client state (React Query, auth context across many islands).

**Remix (B4):**
Strongly SSR-oriented. Forms and mutations are first-class via actions/loaders — perfect for edit mode without separate state management. But true SSG (pre-rendered HTML at build, no server at runtime) is not its strength. Would lean toward needing a server.

**Vite + vite-plugin-ssg (B7):**
Lowest migration cost. The existing component library ports as-is. But it means manually solving problems Next.js/Astro solve by default: metadata API, image optimisation, font loading, ISR, i18n routing. Worth considering if the backend is substantial and the frontend is mostly display.

---

### §12.C — Content Update Flow

This is the node most affected by the "no rebuild" preference. The question is: **when an admin saves a change, how fast does the public see it, and what infrastructure does that require?**

```
Content Update Flow
│
├── C1. Full Rebuild on Save
│     Admin saves → webhook → CI/CD → full Next.js/Astro build
│     → deploy new static files to CDN.
│     Latency: 1–5 minutes. Cost: CI minutes.
│     Works with: A1 (pure SSG), any framework.
│
├── C2. ISR On-Demand (revalidatePath / revalidateTag)
│     Admin saves → backend calls Next.js revalidation API
│     → only changed pages are regenerated in seconds.
│     Latency: seconds. Needs: Next.js server or edge runtime.
│     Works with: B1 Next.js (server mode only, not export mode).
│
├── C3. ISR Time-Based
│     Pages auto-expire after N seconds and regenerate on next request.
│     No webhook needed. Stale window = revalidation interval.
│     Latency: up to N seconds. Needs: Next.js server.
│
├── C4. Pure SSR (no cache)
│     Every page render hits the database directly. Always fresh.
│     No caching complexity. Higher server load.
│     Latency: 0. Needs: server on every request.
│
├── C5. CDN-level Surrogate Key Purge
│     Static HTML stored on CDN with surrogate keys.
│     On save, backend purges specific keys via CDN API
│     (Cloudflare Cache Purge, Fastly Surrogate-Control).
│     CDN re-fetches from origin on next request.
│     Works with any framework that has a server origin.
│
├── C6. Stale-While-Revalidate (SWR) at CDN
│     HTML pages cached at CDN with s-maxage + stale-while-revalidate.
│     CDN serves stale instantly, revalidates in background.
│     Public always sees ≤ stale-window old content.
│     No explicit purge logic needed. Latency: stale window.
│
└── C7. Split Architecture — Admin Bypasses CDN
      Public CDN cache serves everyone.
      Admins authenticate and hit origin/API directly (no cache).
      Admins always see live data. Public sees cached static.
      Content changes visible to public after CDN TTL expires.
```

#### Trade-off Matrix

| Approach | Latency to public | Server needed | Free CDN ok | Complexity | Cost |
|---|---|---|---|---|---|
| C1. Full rebuild | 1–5 min | CI only (not runtime) | ✅ | Low | CI minutes |
| C2. ISR on-demand | Seconds | ✅ persistent | ❌ | Medium | Server + hosting |
| C3. ISR time-based | 0 – N seconds | ✅ persistent | ❌ | Low | Server + hosting |
| C4. Pure SSR | 0 | ✅ always | ❌ | Low | Server always |
| C5. CDN key purge | Seconds | ✅ + CDN API | ❌ (needs CDN API) | Medium | Server + CDN |
| C6. SWR at CDN | = stale window | ✅ origin | ❌ | Very low | Server |
| C7. Split (admin bypass) | CDN TTL for public | ✅ origin | ✅ for public | Medium | Server for admin |

**Key insight:** C1 (full rebuild) is the only option that needs **zero server at runtime**. All others require a server of some kind (even if it's an edge function). If free CDN hosting is a hard constraint, C1 is the only path. If a cheap server (Vercel free tier, Railway, Render, $5 VPS) is acceptable, C2/C3/C7 open up significantly better content freshness.

---

### §12.D — Data & CMS Architecture

```
Data / CMS Architecture
│
├── D1. Files in Repository (current + evolved)
│     │
│     ├── D1a. JSON/TS files (current) — developer-only editing
│     ├── D1b. Markdown / MDX files — content editors can use git
│     └── D1c. Astro Content Collections — typed, schema-validated files
│
├── D2. Git-based CMS (UI over files in repo)
│     │
│     ├── D2a. TinaCMS — React inline editing + git backend
│     ├── D2b. Keystatic — Next.js / Astro native, local or GitHub storage
│     ├── D2c. Decap CMS (fmr. Netlify CMS) — Netlify-hosted, git backend
│     └── D2d. Outstatic — self-hosted, GitHub API, Next.js native
│
├── D3. Headless CMS (external SaaS)
│     │
│     ├── D3a. Sanity.io — real-time, GROQ queries, Portable Text
│     ├── D3b. Contentful — mature, REST + GraphQL APIs
│     ├── D3c. Storyblok — visual editor, component-based
│     └── D3d. Hygraph (GraphCMS) — GraphQL-native
│
├── D4. Self-hosted Headless CMS
│     │
│     ├── D4a. Strapi — Node.js, REST + GraphQL, admin UI
│     ├── D4b. Directus — DB-first, any SQL DB, REST + GraphQL
│     ├── D4c. Payload CMS — code-first, TypeScript-native, React admin
│     └── D4d. KeystoneJS — TypeScript, Prisma, GraphQL
│
└── D5. Custom Backend API (user's backend)
      The backend being built serves as the CMS.
      Frontend fetches from it at build time (SSG) and
      runtime (edit mode mutations).
      No third-party CMS — full control, custom schema.
```

#### Analysis per Option

**D1 (Files in repo):**
Zero extra infrastructure. Editing requires git knowledge or a git-based CMS on top (D2). Content is version-controlled for free. Build pipeline reads files at build time. Natural fit for SSG. Scales poorly if content is large or frequently updated by non-developers.

**D2 (Git-based CMS):**
A UI layer over the same files-in-repo model. TinaCMS (D2a) has a unique inline editing mode — you edit content directly on the rendered page in a visual way, then it commits the changes to git and triggers a rebuild. This is essentially the "edit mode" the user described, but powered by git commits rather than a backend API. Keystatic (D2b) is newer, tightly integrated with Next.js and Astro, clean DX. These are worth serious consideration given the user is already building a backend — they may or may not want to replace it.

**D3 (Headless CMS SaaS):**
Sanity is worth calling out: it has a free tier, real-time preview, and its `@sanity/client` can be used at build time for SSG and at runtime for live edits. The admin UI is hosted by Sanity — you don't build it. The trade-off is vendor lock-in and cost at scale.

**D4 (Self-hosted CMS):**
Payload CMS (D4c) is the most interesting here given the user is already building a backend in TypeScript — Payload IS the backend, with its own admin panel. If the backend isn't too far along, consolidating into Payload could eliminate a custom admin UI entirely.

**D5 (Custom Backend):**
The most flexible but most work. Requires building the admin UI (which is where edit mode comes in). This is the path the user is already on. The key question is how much of the CMS infrastructure (CRUD endpoints, auth, image upload, rich text) will the custom backend cover vs. what is built in the frontend.

---

### §12.E — Edit Mode Implementation

```
Edit Mode Implementation
│
├── E1. Inline Overlay (client-side)
│     Same pages, auth check enables edit controls.
│     Components render editable inputs when isAdmin=true.
│     Mutations call the backend API directly.
│     Public page = static. Admin page = same URL + edit layer.
│
├── E2. TinaCMS-style Visual Editing
│     CMS SDK injects sidebar + content highlights.
│     Edits are saved to git (or API) and trigger rebuild.
│     Works without building any edit UI — SDK provides it.
│     Constraint: tied to CMS choice (D2a).
│
├── E3. Next.js Draft Mode
│     Special cookie bypasses CDN and hits origin.
│     Page renders with draft/unpublished content.
│     Not exactly edit mode — more preview mode.
│     Useful companion to any of the other approaches.
│
├── E4. Separate Admin App
│     Completely separate React/Next app for editing.
│     e.g. admin.ftca-hmmlif.tn — standalone dashboard.
│     No dual-mode components. Clean separation.
│     Public site and admin site are independent deployments.
│
├── E5. CMS Admin Panel (headless CMS)
│     If using D3/D4, the CMS provides its own admin UI.
│     No edit mode to build at all.
│     Trade-off: less control over the editing experience.
│
└── E6. Spreadsheet / Notion / Airtable as CMS
      Content managed in a spreadsheet or Notion database.
      Fetched via API at build time.
      No admin UI to build, no server needed.
      Extremely low-tech. Surprising amount of real sites do this.
```

#### Comparison

| Approach | Build effort | UX quality | Rebuild needed | Server needed | Couples frontend + admin |
|---|---|---|---|---|---|
| E1. Inline overlay | High | ★★★★★ | Depends on C choice | Depends | Yes — same codebase |
| E2. TinaCMS visual | Low | ★★★★ | On git commit | No (git) | Via CMS SDK |
| E3. Draft mode | Low | ★★★ (preview only) | Yes | Yes | No |
| E4. Separate admin | Medium | ★★★★ | Depends | Depends | No |
| E5. CMS panel | None | ★★★ (generic) | On content save | No (SaaS) | No |
| E6. Spreadsheet | None | ★★ | On save (webhook) | No | No |

**E1 vs E4 is a fundamental UX and architecture choice:**
- E1 means the same URL the public visits is also the editor. Context-preserving, immersive. Higher frontend complexity.
- E4 means admins go to a separate URL. Simpler frontend, cleaner separation, but admins lose the visual context of the real page.

---

### §12.F — Hosting & Deployment

```
Hosting Options
│
├── F1. GitHub Pages
│     Free. Static only. Sub-path deployment (current).
│     Custom domain possible. No edge logic. No redirects.
│
├── F2. Cloudflare Pages
│     Free tier. Static + Cloudflare Workers (edge functions).
│     Can run ISR-like logic at the edge. Global CDN.
│     Excellent performance. Free custom domain + SSL.
│
├── F3. Netlify
│     Free tier. Static + serverless functions.
│     Netlify Edge Functions (Deno runtime).
│     Deploy previews per branch. Good for Next.js.
│
├── F4. Vercel
│     Free tier. Native Next.js host. ISR just works.
│     Edge functions. Analytics. Preview URLs.
│     The obvious choice if using Next.js with server features.
│     Free tier has limits (100GB bandwidth, build minutes).
│
├── F5. Render / Railway / Fly.io
│     PaaS. Can run Node.js servers cheaply ($5–7/mo).
│     For when a server is needed but not Vercel pricing.
│
└── F6. Self-hosted VPS (Hetzner, Contabo, etc.)
      Full control. Cheapest at scale.
      nginx or Caddy as reverse proxy.
      Requires more ops work.
```

#### Constraint Map — Hosting vs Rendering

| Rendering strategy | Compatible hosts |
|---|---|
| A1. Pure SSG | F1, F2, F3, F4, F5, F6 — any |
| A2. Pure SSR | F4 (best), F3, F5, F6 |
| A3. ISR | F4 (native), F2 (Workers), F3 (Edge), F5, F6 |
| A4. Hybrid | F4 (native), F2, F3, F5, F6 |
| A5. Edge SSR | F2 (Cloudflare Workers), F4 (Vercel Edge), F3 (Netlify Edge) |

**Free tier ceiling:**
- GitHub Pages: unlimited bandwidth but 1GB site size, no build compute
- Cloudflare Pages: 500 builds/mo, unlimited bandwidth, Workers free tier 100k req/day
- Netlify: 100GB bandwidth/mo, 300 build min/mo
- Vercel: 100GB bandwidth/mo, unlimited builds, ISR included on free tier

---

### §12.G — Caching Architecture

```
Caching Layers (outermost to innermost)
│
├── G1. CDN Edge Cache
│     HTML pages, JS bundles, CSS, images cached at CDN edge.
│     Cache-Control headers control TTL.
│     Purge on deploy (full rebuild) or on-demand (ISR).
│
├── G2. Stale-While-Revalidate (SWR pattern)
│     CDN: serve stale immediately, revalidate in background.
│     Client: serve cached, refetch silently.
│     Works at both CDN level and client (React Query/SWR).
│
├── G3. ISR Cache (Next.js specific)
│     Each page has its own cache entry with revalidation interval.
│     On-demand: revalidatePath() / revalidateTag() purge specific entries.
│     Stored in server filesystem or external store (Redis, Upstash).
│
├── G4. HTTP Browser Cache
│     Immutable for hashed JS/CSS: max-age=31536000, immutable
│     Revalidatable for HTML: s-maxage + stale-while-revalidate
│     Images: max-age=2592000 (30 days)
│
├── G5. React Query / SWR (client-side data cache)
│     Caches API responses in memory.
│     staleTime: how long data is considered fresh (no refetch).
│     gcTime: how long unused data stays in memory.
│     Key insight: even on a SSG site, client-side navigation
│     after first load should benefit from React Query cache —
│     no redundant fetches on page transitions.
│
└── G6. Service Worker (Workbox)
      Offline support. Cache-first for static assets.
      Network-first for HTML. Stale fallback for API.
      Adds PWA capability.
```

#### Cache Invalidation Strategies

| Trigger | What gets invalidated | How |
|---|---|---|
| Full deploy | Everything on CDN | New file hashes + CDN deploy |
| ISR on-demand | Specific page(s) | `revalidatePath('/films/[id]')` after save |
| Time-based ISR | Specific page after interval | `revalidate: 3600` in fetch options |
| CDN surrogate key purge | Tagged cache entries | Cloudflare API / Fastly API |
| React Query invalidation | Client-side query cache | `queryClient.invalidateQueries(['movies'])` |
| Service Worker update | SW cache | New SW version + `skipWaiting` |

**The ISR on-demand vs full rebuild question in numbers:**

For a site with 50 films + 4 events + 10 articles = ~65 content pages:
- Full rebuild: build all 65 pages + static assets every time. ~90s–3min depending on CI.
- ISR on-demand: 1 HTTP call to `revalidatePath`, 1 page regenerated in <1s on next request.
- For infrequent updates (few per week), C1 full rebuild is perfectly fine. For daily or hourly updates, ISR is clearly better.

---

### §12.H — SEO Tooling Options

```
SEO Implementation Options
│
├── H1. Meta Tags
│     ├── react-helmet-async (current) — JS-injected, invisible to bots without SSR
│     ├── Next.js generateMetadata() — server-side, in raw HTML, zero-JS
│     ├── Astro frontmatter — server-side, in raw HTML
│     └── next-seo — abstraction over Next.js metadata, DX improvement
│
├── H2. Structured Data (JSON-LD)
│     ├── Hand-written <script> tags — fragile, no type safety
│     ├── schema-dts — TypeScript types for schema.org — type-safe
│     ├── next-seo JsonLd components — pre-built shapes
│     └── Zod-based builder — validate before injecting
│
├── H3. Sitemap Generation
│     ├── next-sitemap — declarative config, dynamic routes, image sitemap
│     ├── Astro sitemap integration — @astrojs/sitemap
│     ├── Manual script (current) — works but fragile as routes grow
│     └── CMS-generated sitemap — headless CMS can expose a sitemap endpoint
│
├── H4. Image SEO
│     ├── next/image — automatic WebP, srcset, lazy, placeholder
│     ├── Astro Image — similar capabilities
│     ├── Cloudflare Image Resizing — CDN-level transformation
│     ├── Cloudinary / imgix — dedicated image CDN with transformations
│     └── Manual srcset — most control, most work
│
├── H5. Performance (Core Web Vitals)
│     ├── next/font — self-host fonts, no FOUT, no render-block
│     ├── Partytown — offload third-party scripts to web worker
│     ├── @next/bundle-analyzer — visualise and trim bundle
│     ├── Preloading hints — <link rel="preload"> for critical resources
│     └── React Server Components — zero client JS for display-only content
│
└── H6. Monitoring & Auditing
      ├── Lighthouse CI (in GitHub Actions) — automated score gating
      ├── Google Search Console — canonical, coverage, performance
      ├── PageSpeed Insights API — programmatic audits
      ├── Ahrefs / Screaming Frog — crawl audit
      └── web-vitals library — real user monitoring (RUM)
```

**Non-negotiables regardless of framework choice:**
1. Meta tags must be in raw HTML at response time (eliminates react-helmet on a pure CSR build)
2. Canonical URLs on every page
3. JSON-LD for Movie, Event, BlogPosting, Organization
4. XML sitemap with `lastmod` and image entries
5. `next/image` or equivalent — current JPG-only unoptimised posters are a LCP problem

---

### §12.I — Internationalisation (i18n)

```
i18n Architecture
│
├── I1. No structured i18n (current state)
│     FR/EN mixed in data fields (description: { fr, en }).
│     No URL-based separation. No hreflang.
│     Works, but not SEO-optimal. Bots can't discover the EN content.
│
├── I2. URL-based Sub-path Routing
│     /fr/films/:id and /en/films/:id
│     hreflang links both versions together.
│     Next.js i18n config handles automatically.
│     Two sitemap entries per page.
│
├── I3. Subdomain Routing
│     fr.ftca-hmmlif.tn / en.ftca-hmmlif.tn
│     Treated as separate sites by Google — more isolation.
│     More infrastructure complexity.
│
├── I4. Content-level FR/EN (no URL separation)
│     Bilingual pages with language toggle.
│     Single URL, single HTML — bots index one language.
│     Simplest to implement, weakest for SEO of both languages.
│
├── I5. Translation Libraries
│     ├── next-intl — SSG-compatible, message-based, small bundle
│     ├── Paraglide JS (Inlang) — compile-time, zero runtime overhead
│     ├── Lingui — powerful, message extraction, JS Intl-based
│     ├── i18next / react-i18next — most popular, larger bundle
│     └── Astro i18n (built-in) — if using Astro
│
└── I6. Translation Management
      ├── JSON locale files in repo (simple, git-versioned)
      ├── Inlang / Fink editor — UI over JSON locale files
      ├── Crowdin / Lokalise — SaaS translation platforms
      └── AI-assisted translation — DeepL API at build time
```

**FR is the primary language. EN is secondary.** The current site mixes both in data fields. The cleanest SEO approach is I2 (sub-path) with `defaultLocale: 'fr'` so `/films` serves French and `/en/films` serves English. `hreflang` links them. This doubles the crawlable page count but each page is properly localised.

---

### §12.J — Constraint Map

How decisions on each axis constrain the others:

```
If you choose...          Then you constrain...

A1 (Pure SSG)         →  C must be C1 (rebuild) or C6 (SWR stale window)
                          E cannot be E3 (Draft Mode needs server)
                          F can be anything (most freedom)

A2/A3 (SSR/ISR)       →  F must have a server (F2 workers, F3, F4, F5, F6)
                          C can be C2/C3/C4/C5 (fresh updates available)
                          E can be E3 (Draft Mode available)

B1a (Next.js export)  →  Same as A1 — server features unavailable
B1b (Next.js server)  →  Full Next.js feature set available
                          ISR, Draft Mode, API routes, Middleware all available

D5 (Custom backend)   →  E must be E1 or E4 (build your own edit UI)
                          D2/D3/D4 CMS admin panels not available

D2/D3 (CMS)           →  E can be E2/E5 (CMS provides edit UI, less to build)
                          C is handled by CMS webhook → rebuild or ISR

Free CDN hosting      →  A must be A1 (unless Edge SSR via Cloudflare free tier)
                          C must be C1 or accept CDN TTL staleness

Custom backend exists →  D5 is natural. But if D4 (Payload) is adopted,
                          it could replace or extend the custom backend.
```

---

### §12.K — Open Questions (To Resolve Before Architecture Is Chosen)

1. **How often will content change?** — daily vs. weekly vs. monthly changes determines how painful C1 (full rebuild) actually is
2. **What language/framework is the backend being built in?** — if it's TypeScript/Node, Payload CMS (D4c) might consolidate frontend + backend
3. **Is a free tier truly required, or is a low-cost server ($5–7/mo) acceptable?** — this unlocks ISR/SSR and dramatically simplifies the content update problem
4. **Will there be multiple admins, or just one?** — affects auth complexity and need for role-based edit permissions
5. **Is the edit mode for all content types or just some?** — a movies-only edit mode is much simpler than a full CMS
6. **Is the custom backend REST or GraphQL?** — affects how service interfaces are designed
7. **Is offline / PWA support required?** — determines whether Service Worker adds value or complexity
8. **Are there dynamic personalised pages (user accounts, saved films)?** — if yes, SSR/hybrid is mandatory regardless of other preferences

---

*This document is a thinking space. No architectural decision has been made.*

The requirements create a deliberate tension:

- **SSG** → HTML pre-rendered at build time → bots see full content → free CDN hosting
- **Edit mode** → authenticated users modify content at runtime → calls a live backend API
- **Backend being built** → service layer must work with mock data today and real API tomorrow

These three are **not mutually exclusive**. The pattern that satisfies all of them is called **Static Site + Admin Overlay**: the public-facing site is 100% static (crawlable, CDN-hosted), and authenticated admin users get an extra client-side layer that switches components into edit mode. Content changes hit the backend API, which then triggers a CDN rebuild webhook.

### Option Comparison

| Criterion | Next.js `output:'export'` | Astro + React Islands | Vite + vite-plugin-ssg |
|---|---|---|---|
| True SSG (pre-rendered HTML) | ✅ | ✅ | ✅ (less mature) |
| Free CDN hosting | ✅ | ✅ | ✅ |
| File-based routing | ✅ | ✅ | ❌ manual |
| Server Metadata API (no JS for SEO) | ✅ `generateMetadata` | ✅ | ❌ needs workaround |
| Dynamic route static generation | ✅ `generateStaticParams` | ✅ `getStaticPaths` | ⚠️ manual |
| Edit mode (client-side islands) | ✅ natural | ✅ islands model | ✅ |
| React ecosystem (shadcn/ui reuse) | ✅ native | ✅ via islands | ✅ native |
| Image optimisation built-in | ✅ `next/image` | ✅ | ❌ manual |
| Font optimisation built-in | ✅ `next/font` | ✅ | ❌ |
| Ecosystem maturity | ✅ largest | ✅ growing | ⚠️ small |
| Migration cost from current stack | Low | Medium | Lowest |

### Decision: Next.js App Router with `output: 'export'`

**Chosen.** Reasons:

1. `output: 'export'` produces a fully static `/out` directory — zero Node.js at runtime, deploy to any CDN (GitHub Pages, Cloudflare Pages, Netlify, Bunny CDN).
2. `generateMetadata()` runs server-side at build time — meta tags are in the raw HTML, not injected by JS. This is the single most impactful SEO change from the current stack.
3. `generateStaticParams()` enumerates all movie/blog/event slugs at build time, pre-rendering every detail page.
4. The edit mode overlay is pure client-side React — no server needed. Auth token from the backend lives in memory/cookie; components read `useEditMode()` context and switch rendering accordingly.
5. `next/image` solves image optimisation (WebP, srcset, lazy, blur placeholder) with zero extra config.
6. `next/font` self-hosts fonts with `font-display: swap`, eliminating Google Fonts as a render-blocking third party.
7. The entire existing component library (shadcn/ui + Tailwind) ports with no changes.

### Rebuild Hosting Architecture

```
┌─────────────────────────────────────────────────────┐
│                  CDN (Cloudflare / Netlify)          │
│   Static /out files — HTML, JS, CSS, images          │
│   Cache-Control headers per asset type               │
└────────────────┬────────────────────────────────────┘
                 │  (serve pre-rendered HTML to bots & users)
                 ▼
         Public browser
         ┌──────────────────────────┐
         │  Next.js static bundle   │
         │  React hydrates          │
         │  React Query caches      │
         └──────────┬───────────────┘
                    │ (if admin logged in)
                    ▼
         Edit mode overlay (client-side)
         ┌──────────────────────────┐
         │  useEditMode() = true    │
         │  Components → edit mode  │
         │  API calls → backend     │
         └──────────┬───────────────┘
                    │
                    ▼
         ┌──────────────────────────┐
         │  Your Backend API        │
         │  (being built)           │
         │  Auth + CRUD endpoints   │
         └──────────┬───────────────┘
                    │ (on content save)
                    ▼
         Rebuild webhook → CI/CD → new /out → CDN deploy
```

---

## 13. State-of-the-Art SEO Plan

### 13.1 Technical Foundation

| Item | Current | Target |
|---|---|---|
| HTML at response time | ❌ JS shell | ✅ Pre-rendered SSG |
| Meta tags in raw HTML | ❌ JS-injected | ✅ `generateMetadata()` at build |
| Canonical URLs | ❌ Missing | ✅ `<link rel="canonical">` on every page |
| Trailing slash consistency | ❌ Inconsistent | ✅ `trailingSlash: false` in Next.js config |
| 404 page with correct HTTP status | ❌ SPA redirect | ✅ Static `404.html` with real 404 response |
| Sitemap | ⚠️ Script-generated | ✅ `next-sitemap` with lastmod from API |
| Image sitemap | ❌ Missing | ✅ Include poster images |
| robots.txt | ✅ Exists | ✅ Point to sitemap URL |

### 13.2 Per-Page Metadata (Next.js `generateMetadata`)

Every page exports a `generateMetadata()` function that returns:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const movie = await movieService.getMovieById(params.id)
  return {
    title: `${movie.title} — FTCA Hammam-Lif`,
    description: movie.description?.fr ?? movie.description,
    alternates: {
      canonical: `https://ftca-hmmlif.tn/films/${movie.id}`,
      languages: { 'fr': `/fr/films/${movie.id}`, 'en': `/en/films/${movie.id}` }
    },
    openGraph: {
      title: movie.title,
      description: movie.description?.fr,
      images: [{ url: `/Posters/${movie.image}`, width: 800, alt: movie.title }],
      type: 'video.movie',
      locale: 'fr_TN',
    },
    twitter: {
      card: 'summary_large_image',
      title: movie.title,
      images: [`/Posters/${movie.image}`],
    },
  }
}
```

### 13.3 JSON-LD Structured Data

One `<JsonLd>` component per page type:

| Page | Schema Type | Key Fields |
|---|---|---|
| Home | `Organization` + `WebSite` | name, url, logo, sameAs (socials), potentialAction (search) |
| `/films` | `CollectionPage` | name, description, numberOfItems |
| `/films/:id` | `Movie` | name, director, dateCreated, genre, image, description |
| `/events` | `EventSeries` | — |
| `/events/:slug` | `Event` | name, startDate, location, image, organizer |
| `/blog/:slug` | `BlogPosting` | headline, author, datePublished, image, articleBody |
| `/about` | `Organization` + `Person[]` | members array |
| Every page | `BreadcrumbList` | Full path from Home |

### 13.4 Multilingual / i18n

The current site mixes FR and EN content per article. The rebuild should:

- Use Next.js `i18n` config with `defaultLocale: 'fr'`, `locales: ['fr', 'en']`
- `hreflang` tags auto-generated for each locale pair
- Separate sitemap entries per locale
- `<html lang="fr|en">` set automatically by Next.js locale routing
- UI strings: `next-intl` library (tiny, works with SSG)

### 13.5 Core Web Vitals Targets

| Metric | Current Risk | Fix |
|---|---|---|
| LCP (Largest Contentful Paint) | High — hero image unoptimised | `next/image` with `priority` on hero, explicit `sizes` |
| CLS (Cumulative Layout Shift) | Medium — images without dimensions | Always pass `width` + `height` to `<Image>` |
| FID/INP (Interactivity) | Medium — large JS bundle | Next.js automatic code splitting, defer non-critical |
| TTFB (Time to First Byte) | Low — CDN served | CDN edge caching, keep HTML < 50KB |

### 13.6 Image SEO

- All `<Image>` tags must have meaningful `alt` text (not filename)
- Movie posters: `alt="Poster du film {title} — réalisé par {director}"`
- Event photos: `alt="Photo de l'événement {eventName}, {date}"`
- Team photos: `alt="{name}, {role} — FTCA Hammam-Lif"`
- Generate an image sitemap via `next-sitemap`

---

## 14. Edit / View Mode Architecture

### 14.1 Concept

Components that display editable content exist in two rendering modes:

- **View mode** (default, public): renders static data, no extra UI, no auth required
- **Edit mode** (admin only, client-side): renders inline form controls over the same layout, saves to backend API on blur/submit

Mode is driven by a global context, not a prop, so deep components don't need prop drilling.

### 14.2 Edit Mode Context

```typescript
// src/contexts/EditModeContext.tsx
type EditModeContextValue = {
  isEditMode: boolean
  isAdmin: boolean
  token: string | null
  enableEditMode: () => void
  disableEditMode: () => void
}

export const EditModeContext = createContext<EditModeContextValue>(...)

// Hook shorthand
export const useEditMode = () => useContext(EditModeContext)
```

`EditModeProvider` wraps the entire app. It reads the auth token from a secure httpOnly cookie or memory (never localStorage for tokens). Edit mode is only activatable when `isAdmin === true`.

### 14.3 Component Pattern

Each dually-moded component uses an internal branch:

```typescript
// Example: EditableText — smallest unit
function EditableText({ value, onSave, as: Tag = 'p', className }) {
  const { isEditMode } = useEditMode()
  const [draft, setDraft] = useState(value)

  if (!isEditMode) return <Tag className={className}>{value}</Tag>

  return (
    <Tag className={cn(className, 'ring-2 ring-primary/40 rounded focus-within:ring-primary')}>
      <span
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onSave(e.currentTarget.textContent ?? '')}
        className="outline-none"
      >
        {draft}
      </span>
    </Tag>
  )
}
```

More complex editable units (gallery, cast list, rich text body) use a swap pattern instead:

```typescript
function MovieDetail({ movie }: { movie: Movie }) {
  const { isEditMode } = useEditMode()
  return isEditMode
    ? <MovieDetailEditor movie={movie} />
    : <MovieDetailView movie={movie} />
}
```

### 14.4 Components That Need Dual Mode

| Component | View Mode | Edit Mode |
|---|---|---|
| Movie card | Poster, title, metadata display | Inline title, year, genre editable fields |
| Movie detail page | Full metadata, description, cast | Form overlay for all fields + poster upload |
| Event card | Image, date, location | Editable date, title, location, status |
| Event detail page | Gallery, text, quotes | Gallery manager (add/remove/reorder), rich text |
| Blog article | Rendered body | Rich text editor (Tiptap or Quill) |
| About / Team grid | Member cards | Add/remove/reorder members, edit name & role |
| Contact info | Static display | Edit email, phone, address, social links |
| Navigation | Links | Reorder / rename nav items (stretch goal) |

### 14.5 Optimistic Updates

Edit mode mutations use React Query's `useMutation` with optimistic updates to feel instant:

```typescript
const updateMovie = useMutation({
  mutationFn: (data) => movieService.update(movie.id, data),
  onMutate: async (newData) => {
    await queryClient.cancelQueries({ queryKey: ['movie', movie.id] })
    const prev = queryClient.getQueryData(['movie', movie.id])
    queryClient.setQueryData(['movie', movie.id], (old) => ({ ...old, ...newData }))
    return { prev }
  },
  onError: (_, __, ctx) => queryClient.setQueryData(['movie', movie.id], ctx?.prev),
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['movie', movie.id] }),
})
```

---

## 15. Mock Async Service Layer

### 15.1 Architecture

A **service interface** defines the contract. Two implementations exist from day one: `MockXService` (static data + simulated delay) and `ApiXService` (real HTTP calls). A factory selects the implementation via env var.

```
src/
  services/
    interfaces/
      movie.service.ts      ← TypeScript interface + types
      event.service.ts
      blog.service.ts
      member.service.ts
      contact.service.ts
      auth.service.ts
    mock/
      movie.mock.ts         ← MockMovieService (uses local JSON, adds delay)
      event.mock.ts
      blog.mock.ts
      member.mock.ts
      contact.mock.ts
      auth.mock.ts
    api/
      movie.api.ts          ← ApiMovieService (fetch + auth headers)
      event.api.ts
      ...
    index.ts                ← factory: exports active implementation
```

### 15.2 Interface Example

```typescript
// services/interfaces/movie.service.ts

export interface MovieFilters {
  genre?: string
  search?: string
  page?: number
  pageSize?: number
}

export interface IMovieService {
  // Read (used at build time AND client runtime)
  list(filters?: MovieFilters): Promise<{ data: Movie[]; total: number }>
  getById(id: string): Promise<Movie>
  getRelated(id: string, by: 'director' | 'genre', limit?: number): Promise<Movie[]>

  // Write (edit mode only — requires auth token)
  create(data: CreateMovieDto): Promise<Movie>
  update(id: string, data: UpdateMovieDto): Promise<Movie>
  delete(id: string): Promise<void>
  uploadPoster(id: string, file: File): Promise<{ url: string }>
}
```

### 15.3 Mock Implementation Example

```typescript
// services/mock/movie.mock.ts
import moviesData from '@/data/movies.json'

const delay = (ms = 150) => new Promise(r => setTimeout(r, ms))

export class MockMovieService implements IMovieService {
  async list(filters?: MovieFilters) {
    await delay()
    let data = moviesData.filter(m => m.public)
    if (filters?.genre) data = data.filter(m => m.genre === filters.genre)
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      data = data.filter(m => m.title.toLowerCase().includes(q))
    }
    return { data, total: data.length }
  }

  async getById(id: string) {
    await delay()
    const movie = moviesData.find(m => m.id === id)
    if (!movie) throw new NotFoundError(`Movie ${id} not found`)
    return movie
  }

  async update(id: string, data: UpdateMovieDto) {
    await delay(300)
    // In mock mode, just return merged data — no persistence
    const movie = await this.getById(id)
    return { ...movie, ...data }
  }

  // ... other methods
}
```

### 15.4 Factory & Environment Switch

```typescript
// services/index.ts
import { MockMovieService } from './mock/movie.mock'
import { ApiMovieService } from './api/movie.api'

const useMock = process.env.NEXT_PUBLIC_USE_MOCK_SERVICES === 'true'

export const movieService: IMovieService = useMock
  ? new MockMovieService()
  : new ApiMovieService({ baseUrl: process.env.NEXT_PUBLIC_API_URL! })
```

At build time on CI, set `NEXT_PUBLIC_USE_MOCK_SERVICES=false` and `NEXT_PUBLIC_API_URL=https://api.ftca-hmmlif.tn` when the backend is ready. Until then, `true`.

### 15.5 React Query Integration

```typescript
// hooks/queries/useMovies.ts
export const useMovies = (filters?: MovieFilters) =>
  useQuery({
    queryKey: ['movies', filters],
    queryFn: () => movieService.list(filters),
    staleTime: 1000 * 60 * 60,   // 1 hour — movies rarely change
  })

export const useMovie = (id: string) =>
  useQuery({
    queryKey: ['movie', id],
    queryFn: () => movieService.getById(id),
    staleTime: 1000 * 60 * 60,
  })

export const useUpdateMovie = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMovieDto }) =>
      movieService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['movie', id] })
      queryClient.invalidateQueries({ queryKey: ['movies'] })
    },
  })
```

---

## 16. Advanced Caching Strategy

### 16.1 Layers Overview

```
Request flow:
Browser → Service Worker → CDN Edge → Origin (static files)

Data flow:
Component → React Query cache → Service layer → (mock | API)
```

### 16.2 CDN / HTTP Cache Headers

Configure in `next.config.ts` `headers()` (or Cloudflare / Netlify rules):

| Asset Type | Cache-Control | Rationale |
|---|---|---|
| JS/CSS chunks (`/_next/static/`) | `public, max-age=31536000, immutable` | Content-hashed filenames, safe to cache forever |
| Images in `/public` (posters, etc.) | `public, max-age=2592000` (30 days) | Rarely change; filename-based |
| HTML pages | `public, s-maxage=86400, stale-while-revalidate=604800` | CDN caches 24h; serves stale up to 7 days while revalidating |
| `robots.txt`, `sitemap.xml` | `public, max-age=86400` | Daily refresh sufficient |
| API responses (if proxied) | `no-store` | Never cache auth/mutation responses |

### 16.3 React Query Cache Policies

| Query Key | `staleTime` | `gcTime` | Rationale |
|---|---|---|---|
| `['movies']` | 1 hour | 24 hours | Catalog changes only on deploy |
| `['movie', id]` | 1 hour | 24 hours | Same as above |
| `['events']` | 15 min | 1 hour | Events update more often |
| `['blog']` | 30 min | 4 hours | Articles posted periodically |
| `['members']` | 1 hour | 24 hours | Team changes rarely |
| `['contact']` | 1 hour | 24 hours | Static contact info |

Configure a default in `QueryClient`:
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30,  // 30 min default
      retry: 2,
      refetchOnWindowFocus: false, // static content, don't over-fetch
    },
  },
})
```

### 16.4 Service Worker (Workbox via `next-pwa`)

Strategies per resource:
- **Static assets** (`/_next/static/`): `CacheFirst` (immutable, no network call)
- **HTML pages**: `NetworkFirst` with 5s timeout, fallback to cache
- **Images** (`/Posters/`, etc.): `CacheFirst`, max 200 entries, 30-day expiry
- **API calls**: `NetworkFirst`, no offline fallback (edit mode requires live API)

### 16.5 Rebuild-on-Save Workflow

```
Admin saves content in edit mode
         │
         ▼
POST /api/movies/:id (backend)
         │
         ▼
Backend updates DB, then calls:
POST https://api.github.com/repos/org/repo/dispatches
   { event_type: "content-updated" }
         │
         ▼
GitHub Actions: run Next.js build + deploy to CDN
         │
         ▼
New static HTML live within ~2 minutes
```

This keeps the public site always static while giving admins near-real-time content updates.

---

## 17. Project TODO List

Tasks are grouped by phase. Each phase must be completed before the next starts.

### Phase 0 — Project Scaffolding
- [ ] `npx create-next-app@latest` with App Router, TypeScript, Tailwind, src/ dir
- [ ] Set `output: 'export'` and `trailingSlash: false` in `next.config.ts`
- [ ] Install and configure shadcn/ui (copy component config from current project)
- [ ] Set up path aliases (`@/` → `src/`)
- [ ] Configure `next/font` for Cinema Sunday (local) and Nunito (Google)
- [ ] Port Tailwind color tokens and custom keyframes from current `tailwind.config.ts`
- [ ] Set up ESLint + Prettier + Husky pre-commit
- [ ] Create `.env.local` with `NEXT_PUBLIC_USE_MOCK_SERVICES=true`
- [ ] Create `.env.production` with `NEXT_PUBLIC_USE_MOCK_SERVICES=false` placeholder
- [ ] Set up GitHub Actions: lint → build → deploy to Cloudflare Pages / GitHub Pages

### Phase 1 — Data Types & Mock Services
- [ ] Define all TypeScript interfaces: `Movie`, `Event`, `BlogArticle`, `Member`, `ContactInfo`
- [ ] Define DTO types: `CreateMovieDto`, `UpdateMovieDto`, etc. for each entity
- [ ] Define service interfaces: `IMovieService`, `IEventService`, `IBlogService`, `IMemberService`, `IContactService`, `IAuthService`
- [ ] Implement `MockMovieService` — port data from `movies.json`, add simulated delay
- [ ] Implement `MockEventService` — extract event data from `Events.tsx` into JSON file
- [ ] Implement `MockBlogService` — port data from `blog.ts`
- [ ] Implement `MockMemberService` — extract team data from `About.tsx`
- [ ] Implement `MockContactService` — extract contact info from `Contact.tsx`
- [ ] Implement `MockAuthService` — mock login/logout, return fake JWT
- [ ] Implement service factory `src/services/index.ts`
- [ ] Write React Query hooks for all service methods (`useMovies`, `useMovie`, `useEvents`, etc.)
- [ ] Write mutation hooks for all write operations
- [ ] Set up `QueryClientProvider` with cache policies defined in §16.3

### Phase 2 — Core Layout & Navigation
- [ ] Port `Navigation.tsx` — sticky, blur-on-scroll, mobile drawer, active link highlighting
- [ ] Port `Footer.tsx`
- [ ] Port `Logo.tsx` (SVG)
- [ ] Port `ThemeProvider.tsx` + `ThemeToggle.tsx` (dark/light)
- [ ] Create root `layout.tsx` with providers (QueryClient, ThemeProvider, EditModeProvider)
- [ ] Port all shadcn/ui components used (copy from current `/components/ui/`)
- [ ] Port custom UI components: `lazy-image`, `loader`, `share-actions`, `event-gallery-slider`, `hover-image`, `instagram-embed`
- [ ] Port `useScrollAnimation` and `use-mobile` hooks

### Phase 3 — Static Pages (SSG)
- [ ] **Home page** (`/`) — hero, featured films, CTA; `generateMetadata`
- [ ] **Films catalog** (`/films`) — grid with genre filter; `generateMetadata`; use `useMovies()` hook
- [ ] **Film detail** (`/films/[id]`) — poster, metadata, related films, YouTube embed; `generateStaticParams`; `generateMetadata` with OG image
- [ ] **Events list** (`/events`) — upcoming/past tabs; `generateMetadata`
- [ ] **Event detail** (`/events/[slug]`) — hero, gallery, quotes; `generateStaticParams`; `generateMetadata` with Event JSON-LD
- [ ] **Blog list** (`/blog`) — featured + grid; `generateMetadata`
- [ ] **Blog article** (`/blog/[slug]`) — full article body; `generateStaticParams`; `generateMetadata` with BlogPosting JSON-LD
- [ ] **About** (`/about`) — team grid, history; `generateMetadata` with Organization JSON-LD
- [ ] **Palmares** (`/palmares`) — scaffold with real data structure (not "coming soon")
- [ ] **Contact** (`/contact`) — form + info; `generateMetadata`
- [ ] **404** (`not-found.tsx`) — static 404 page
- [ ] Add `BreadcrumbList` JSON-LD component used on every page

### Phase 4 — SEO Layer
- [ ] Install and configure `next-sitemap` — include all static and dynamic routes
- [ ] Add image sitemap entries for movie posters and event photos
- [ ] Configure `robots.txt` generation via `next-sitemap`
- [ ] Add `alternates.canonical` to every `generateMetadata` call
- [ ] Add `alternates.languages` (hreflang FR/EN) to every page
- [ ] Configure Next.js `i18n` with `defaultLocale: 'fr'`, `locales: ['fr', 'en']`
- [ ] Install `next-intl` and extract all UI strings to locale JSON files (`fr.json`, `en.json`)
- [ ] Implement `JsonLd` component and add per-page structured data (see §13.3)
- [ ] Add `<link rel="preload">` for Cinema Sunday font and hero image
- [ ] Verify all `<Image>` tags have explicit `width`, `height`, and meaningful `alt`
- [ ] Run Lighthouse CI in GitHub Actions, gate on scores: Performance ≥ 90, SEO ≥ 95, A11y ≥ 90

### Phase 5 — Edit Mode Infrastructure
- [ ] Implement `EditModeContext` + `EditModeProvider` (§14.2)
- [ ] Implement `useEditMode()` hook
- [ ] Implement `MockAuthService` login flow (username + password → fake JWT)
- [ ] Implement `ApiAuthService` (real login endpoint when backend ready)
- [ ] Create admin login page/modal (not public-facing, accessible via keyboard shortcut or hidden URL)
- [ ] Add "Edit Mode" toggle button — only visible when `isAdmin === true`
- [ ] Create `EditableText` component (inline contentEditable for short strings)
- [ ] Create `EditableTextarea` component (multiline)
- [ ] Create `EditableImage` component (click to upload, preview, save)
- [ ] Create `EditableRichText` component (Tiptap editor, used for blog body and event descriptions)
- [ ] Create `EditableList` component (add/remove/reorder items, used for cast, gallery, members)

### Phase 6 — Component Edit Modes
- [ ] **MovieCard** — editable title, year, genre badge
- [ ] **MovieDetail** — full editor: title, director, year, genre, duration, description (FR + EN), cast list, poster upload, YouTube URL
- [ ] **EventCard** — editable title, date, status toggle (upcoming/past)
- [ ] **EventDetail** — editable hero image, title, date, location, description, quotes, gallery manager (upload/delete/reorder)
- [ ] **BlogArticle** — editable title, excerpt, body (rich text), cover image, category, author, date, lang toggle
- [ ] **MemberCard** (About page) — editable name, role, photo upload
- [ ] **ContactInfo** — editable email, phone, address, social links
- [ ] Add optimistic update pattern to all mutation hooks (§14.5)
- [ ] Add unsaved-changes guard (prompt before navigating away with dirty state)

### Phase 7 — Caching & Performance
- [ ] Configure CDN cache headers in `next.config.ts` `headers()` (§16.2)
- [ ] Install `next-pwa` and configure Workbox strategies (§16.4)
- [ ] Implement Service Worker registration
- [ ] Verify `/_next/static/` assets are cached `immutable`
- [ ] Add `prefetch` links for likely next navigations (e.g., film list prefetches first film)
- [ ] Set up bundle analyser (`@next/bundle-analyzer`) and audit bundle size
- [ ] Defer non-critical JS (share widget, Instagram embed, carousels) with `dynamic(() => import(...), { ssr: false })`

### Phase 8 — Backend Integration
- [ ] Implement `ApiMovieService` (GET, POST, PATCH, DELETE with Bearer token)
- [ ] Implement `ApiEventService`
- [ ] Implement `ApiBlogService`
- [ ] Implement `ApiMemberService`
- [ ] Implement `ApiContactService`
- [ ] Implement `ApiAuthService` (login, token refresh, logout)
- [ ] Handle 401 responses globally — redirect to login, clear token
- [ ] Set `NEXT_PUBLIC_USE_MOCK_SERVICES=false` in CI/CD environment
- [ ] Test rebuild webhook integration (backend triggers GitHub Actions on content save)
- [ ] Smoke-test all pages against real API data

### Phase 9 — QA & Launch
- [ ] Cross-browser testing: Chrome, Firefox, Safari, mobile Chrome, mobile Safari
- [ ] Run `axe` accessibility audit — fix all critical issues
- [ ] Validate all JSON-LD with Google's Rich Results Test
- [ ] Submit sitemap to Google Search Console
- [ ] Test share actions on each platform (WhatsApp, Messenger, Twitter)
- [ ] Test edit mode end-to-end: login → edit → save → verify rebuild → verify updated static page
- [ ] Set up uptime monitoring (UptimeRobot or Cloudflare health checks)
- [ ] Configure Cloudflare Web Analytics (privacy-first, no cookies, no GDPR banner needed)

---

*End of report. Requirements for the rebuild will be specified in a follow-up document.*
