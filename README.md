FTCA Cinema Vista
=================

A modern, responsive cinema club website built with Vite + React + TypeScript and shadcn/ui. It features themed UI, routing, and sample pages like Home, Movies, Events, Blog, About, and Contact.

Features
- Fast Vite build with React and TypeScript
- Themed UI with Tailwind CSS and shadcn/ui
- Client-side routing (react-router) with a configurable base path
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
- `npm run build` – production build
- `npm run preview` – preview the production build

Tech stack
- Vite, React, TypeScript
- Tailwind CSS, shadcn/ui
- React Router
- TanStack Query

Project structure (high level)
- `src/components` – shared UI and layout components
- `src/pages` – route pages (Home, Movies, Events, Blog, About, Contact)
- `src/hooks`, `src/lib` – utilities and custom hooks
- `public` – static assets (logos, icons)

License
This project is for internal/club usage. Add a license file if you plan to open-source it.
