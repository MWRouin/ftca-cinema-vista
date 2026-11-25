# i18n

Locales (`en`, `fr`), translation catalogs and locale helpers. Every URL is locale-prefixed (`/en/…/`), and the locale comes from the route.

## Layout

- `config.ts`: locale constants and pure path helpers (`localizePath`, `stripLocale`). No React, no i18next; safe in scripts and server code.
- `resources.ts`: all catalogs, one namespace per page (`common` holds nav/footer). **Register a new namespace here.** Server only: imported from a client component, it would put every catalog of both languages in the browser bundle.
- `server.tsx`: `<Translations locale ns={[...]}>`, the server component that hands its client subtree only the listed namespaces, in the route's locale. The locale layout gives `common`; each page in `src/app/[locale]/` wraps its view with its own list. `bundlesByLocale` and `TranslationsForParentLocale` serve the two not-found pages, which can't know the locale on the server.
- `instance.ts`: `createI18n(locale, bundles)`, synchronous, holds no catalogs.
- `provider.tsx`: client `I18nProvider`; nested providers add their namespaces to the parent's. Gives client components `useTranslation()` and `useLocale()`.
- `locale.tsx`: `useLocale` and `LocalLink` (wraps `next/link` and adds the locale prefix).

## Rules

- Catalogs are plain JSON in `locales/<lang>/<ns>.json`; keep `en` and `fr` keys identical (there is no fallback language: each page gets one locale only).
- **A page's `ns` list must cover every namespace its components use**: `useTranslation('x')`, `useTranslation()` (= `common`, already given by the layout) and `{ ns: 'x' }` lookups, through every component the view imports. When a component starts using a namespace, add it to the list of each page that renders it. A missing one shows the raw key; `npm run dev` logs `i18n: "ns:key" used, but the "ns" namespace isn't loaded`.
- Don't import `next/*`, React or `window` in `config.ts`, `resources.ts` or `instance.ts`.
- Use `localizePath`/`LocalLink`, not hand-built `/en/...` strings.

## Verify

`npm run build`, then check `out/en/index.html` and `out/fr/index.html` contain translated text (server and client), and that no JS chunk contains catalog text (`grep -l "Masquer la barre" out/_next/static/chunks/*.js` finds nothing). In `npm run dev`, open the pages you touched and watch the console for the missing-namespace warning.
