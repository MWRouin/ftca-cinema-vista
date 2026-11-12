# data

All site content as static data: movies, people, blog and the helpers that read them. No backend; the same modules feed the app and the build scripts, so they must not depend on a framework.

## Rules

- No `import.meta.env`, `window` or React in this folder. Asset paths in the JSON use `__BASE_URL__/…` and are resolved by `resolveAssetUrl` (`src/lib/base-path.ts`).
- `movies.json`: `public` controls listing, `playerVisible` the embedded video, `duration` is whole minutes like `10'`. Credits are `{ role, personId }` or `{ role, name }`; crew roles are listed in `CreditRole` in `movies.ts`.
- `people.json`: a person is public if `public: true`, an active member, or has any film credit (`isPersonPublic`). `"public": false` never hides anyone who qualifies otherwise. `gender` only selects the actor/actress label.
- `events.json` lists the events (ids match the component registry in `src/views/events/index.ts`); `getEvents()` returns the public ones. It also holds what the events list shows (`time`, `image`, `status`); `status` is set by hand because a static site cannot follow the clock. A new event needs both an entry here and a page component registered there.
- Free-text credits (`name`) don't get a person page; use a `personId` only for people in `people.json`.

## Verify

`npx tsc --noEmit` and `npm run build`; when page output may change, snapshot `out/` with `node tools/parity.mjs` and diff it against `docs/research/parity-baseline.json`.
