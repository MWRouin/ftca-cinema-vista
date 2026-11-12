Official Website for "Club des cinéastes amateurs d'Hammam-Lif"
=================

The website of the Hammam-Lif Amateur Filmmakers Club (FTCA): films, events, blog, members and palmarès, in English and French. Built with Next.js (App Router, static export), React, TypeScript, Tailwind CSS and shadcn/ui. There is no backend: all content lives in the repo and the site is published as static files.

Features
- Fully static output (`out/`), deployable to GitHub Pages or any CDN
- English and French, with locale-prefixed URLs (`/en/…/`, `/fr/…/`) and automatic locale redirect
- Server-rendered SEO: per-page title, description, canonical, hreflang, Open Graph and Twitter tags
- JSON-LD structured data (Organization, WebSite, Movie, Event, BlogPosting, Person, breadcrumbs)
- Generated `sitemap.xml` with language alternates
- Light, dark and system themes

Quick start
1) Install dependencies
```bash
npm install
```

2) Start the dev server (http://localhost:3000)
```bash
npm run dev
```

3) Build for production
```bash
npm run build
npx serve out
```

Scripts
- `npm run dev` – start the Next.js dev server
- `npm run build` – static production build into `out/` (pages, metadata and sitemap)
- `npm run lint` – ESLint
- `node tools/parity.mjs snapshot out <file.json>` and `diff <a> <b>` – record and compare the pages and head data of a build

Deployment
Pushes to the `Production` branch build the site and publish `out/` to GitHub Pages (`.github/workflows/deploy.yml`).

Tech stack
- Next.js (App Router, `output: 'export'`), React, TypeScript
- Tailwind CSS, shadcn/ui (Radix)
- i18next / react-i18next

Project structure (high level)
- `src/app` – routes, layouts, sitemap, 404 and locale redirects
- `src/views` – page UI components used by the routes
- `src/components` – shared UI and layout components
- `src/data` – movies, people, events and blog content
- `src/i18n` – locales and translation catalogs
- `src/lib/metadata` – SEO data and metadata builders
- `public` – static assets (posters, portraits, icons, robots.txt)
- `docs` – plans, sprint logs and research; `AGENTS.md` files hold conventions for contributors and coding agents

License
This project is for internal/club usage. Add a license file if you plan to open-source it.
