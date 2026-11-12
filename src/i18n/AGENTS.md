# i18n

Locales (`en`, `fr`), translation catalogs and locale helpers. Every URL is locale-prefixed (`/en/…/`), and the locale comes from the route.

## Layout

- `config.ts`: locale constants and pure path helpers (`localizePath`, `stripLocale`, `localeFromPath`). No React, no i18next; safe in scripts and server code.
- `resources.ts`: all catalogs, one namespace per page (`common` holds nav/footer). **Register a new namespace here.**
- `instance.ts`: `createI18n(locale)` and `getT(locale, ns)` for server code and `generateMetadata`. Synchronous.
- `provider.tsx`: client `I18nProvider`, mounted in `src/app/[locale]/layout.tsx`; gives client components `useTranslation()` and `useLocale()`.
- `locale.tsx`: `useLocale` and `LocalLink` (wraps `next/link` and adds the locale prefix).

## Rules

- Catalogs are plain JSON in `locales/<lang>/<ns>.json`; keep `en` and `fr` keys identical.
- Don't import `next/*`, React or `window` in `config.ts`, `resources.ts` or `instance.ts`; they run in server code and scripts.
- Use `localizePath`/`LocalLink`, not hand-built `/en/...` strings.

## Verify

`npm run build`, then check `out/en/index.html` and `out/fr/index.html` contain translated text (server and client).
