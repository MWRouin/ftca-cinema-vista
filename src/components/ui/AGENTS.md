# ui (shadcn primitives)

shadcn/ui components generated from `components.json` (style `default`, Tailwind CSS variables, `cn` from `@/lib/utils`), built on Radix.

## Boundaries

- Leaf module: imports only Radix, `class-variance-authority`, `lucide-react` and `@/lib/utils`. Nothing app-specific (no data, i18n or routes).
- Used by `components/customUi/` and `src/views/`.

## Conventions

- Treat the files as vendored: change styling through the theme tokens in `src/index.css` and `tailwind.config.ts`, or through `className` at the call site, not by editing a primitive. If a primitive must change, keep the change small and note why at the edit.
- Local edits: `card.tsx` outlines every card in the wheat accent (`border-accent/30`, full on hover) instead of the neutral border. `dialog.tsx`'s `DialogContent` takes a `closeLabel` so the close button's screen-reader text can be translated (pass `t('a11y.close', { ns: 'common' })`). Its close button's focus ring is `focus-visible`, so it doesn't show when a click opens the dialog. `sheet.tsx` (the mobile menu drawer) has the same two edits, and its close button has `p-2` padding (moved to `right-2 top-2`, so the icon stays put) for a 32px tap target.
- Add new primitives with the shadcn CLI (`npx shadcn@latest add <name>`) so they match the config, then run lint.

## Traps

- `input`, `select` and `slider` drive the movie filters, and `input`, `label` and `textarea` the contact form; a change to their look shows up there, not only on the cards.

## Verify

`npx tsc --noEmit`, `npm run lint`, `npm run build`, and check pages that use the primitive in light and dark themes.
