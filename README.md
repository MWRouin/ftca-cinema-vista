Official Website for "Club des cinéastes amateurs d'Hammam-Lif"
=================

A modern, responsive cinema club website built with Vite + React + TypeScript and shadcn/ui. It features themed UI, routing, and sample pages like Home, Movies, Events, Blog, About, and Contact.

Features
- Fast Vite build with React and TypeScript
- Themed UI with Tailwind CSS and shadcn/ui
- Client-side routing (react-router) with a configurable base path
- Per-page SEO meta tags (title, description, canonical, Open Graph, Twitter Cards)
- JSON-LD structured data (Organization, WebSite, Event, Movie schemas)
- Auto-generated sitemap.xml and static HTML pages with unique SEO at build time
- Ready-to-extend pages and components

Quick start
1) Install dependencies
```bash
npm install
```

2) Start the dev server
```bash
npm run dev
```

3) Build for production
```bash
npm run build
npm run preview
```

Configuration
- Base path: If deploying under a subfolder (e.g., GitHub Pages), set the public base path via `.env`:
```bash
# .env
VITE_BASE_PATH=/ftca-cinema-vista/
```
The app and assets will automatically respect this base path.

Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – production build (includes sitemap generation)
- `npm run preview` – preview the production build

Post-build scripts (run automatically or manually after `vite build`):
- `node scripts/sitemapGenerator.js dist` – generates `sitemap.xml` from pages, movies, and events data
- `node scripts/staticPagesGenerator.js dist` – creates per-route HTML files with unique SEO meta tags for GitHub Pages

SEO
The site uses `react-helmet-async` for client-side meta tags and a build-time static page generator for crawler-friendly HTML.


Tech stack
- Vite, React, TypeScript
- Tailwind CSS, shadcn/ui
- React Router
- TanStack Query

Project structure (high level)
- `src/components` – shared UI and layout components
- `src/pages` – route pages (Home, Movies, Events, Blog, About, Contact)
- `src/lib/metadata` – SEO utilities (MetaHeader, constants, html-lang)
- `src/hooks`, `src/lib` – utilities and custom hooks
- `scripts` – build-time generators (static pages, sitemap)
- `public` – static assets (logos, icons, robots.txt, sitemap.xml)

License
This project is for internal/club usage. Add a license file if you plan to open-source it.
