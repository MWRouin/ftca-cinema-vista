# Next.js cleanup and cutover prep (2026-11-12)

## Shipped

- **M11, cleanup:**
  - Removed the frozen Vite app (`index.html`, `vite.config.ts`, `src/App.tsx`, `src/main.tsx`, `src/vite-env.d.ts`, `src/i18n/index.ts`), `scripts/` (static page and sitemap generators, `pages.json`), the Vite tsconfigs and the tracked `.env` (it only held `VITE_BASE_PATH`).
  - Dependencies removed: `react-router-dom`, `@tanstack/react-query`, `vite`, `@vitejs/plugin-react-swc`, `tsx`, `eslint-plugin-react-refresh`.
  - One `tsconfig.json`; npm scripts are now `dev`, `build` and `lint`; the package is named `ftca-cinema-vista` (it was still the scaffold's `vite_react_shadcn_ts`).
  - `src/lib/base-path.ts` no longer reads Vite's env. README rewritten for the Next.js setup. `AGENTS.md` files updated, including a rule about server-rendered markup.
