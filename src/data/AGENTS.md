# data

All site content as static data: movies, people, blog and the helpers that read them. No backend; the same modules feed the app and the build scripts, so they must not depend on a framework.

## Rules

- No `import.meta.env`, `window` or React in this folder. Asset paths in the JSON use `__BASE_URL__/…` and are resolved by `resolveAssetUrl` (`src/lib/base-path.ts`).
- `movies.json`: `public` controls listing, `playerVisible` the embedded video, `duration` is whole minutes like `10'`. Credits are `{ role, personId }` or `{ role, name }`; crew roles are listed in `CreditRole` in `movies.ts`.
- `people.json`: a person is public if `public: true`, an active member, or has any film credit (`isPersonPublic`). `"public": false` never hides anyone who qualifies otherwise. `gender` only selects the actor/actress label.
- Free-text credits (`name`) don't get a person page; use a `personId` only for people in `people.json`.

## Verify

`npx tsc --noEmit -p tsconfig.app.json`, then `npm run build` and diff against the baseline with `node tools/parity.mjs` when page output may change.
