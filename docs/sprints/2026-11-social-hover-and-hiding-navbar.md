# Social icon hovers, closed membership and a hideable navbar (2026-11-23)

Small UI pass: brand-colour hovers on the social icons, a Contact page rework, membership closed behind a popup, a screen-tall hero with a cap, and a navbar the visitor can hide.

## Shipped

- **Social icons** (6c6f1a2, this commit): the footer's green icons take their platform colour on hover (`--social` on each link). The Contact page uses the same style, icons only, a little closer together, and placed between the "Follow us" title and its line (colon dropped). The `labeled` variant is gone; `brand` reads the same variable.
- **Navbar logo** (6c6f1a2): no zoom on hover.
- **Contact page** (this commit): "Follow us" and "Regular meetings" swapped, the meetings card now stretching to the column's height; tighter spacing in the "Follow us" card.
- **Membership closed** (this commit): "Join us now" opens a popup ("Membership is closed") with the social links instead of the Google Form. The old link button is commented out in `Contact.tsx`; `JOIN_FORM_URL` stays in `src/lib/contact.ts`. Adds shadcn's `dialog` (`@radix-ui/react-dialog`), with two local edits: a translatable `closeLabel`, and a close-button ring on keyboard focus only.
- **Home hero** (this commit): at least one screen tall, counting the screen only up to 1080px (`min-height: min(100svh, 1080px)`).
- **Hideable navbar** (this commit): a button beside the theme toggle hides the bar, on every device. A hidden bar comes back on scroll up, while the pointer is on its strip, or on keyboard focus; with a mouse it goes again 5 s after the scroll up, on touch screens at the next scroll down. The same button keeps it visible again.

## Decisions

- **1080px hero cap:** in F11 or projection mode on a 1080p screen the hero fills exactly one screen, while tall screenshot tools (1920×6000) get at most 1080px instead of a huge empty hero. Measured: before, the hero was ~900px on desktop.
- **No zoom on the Contact icons:** a 10% zoom on thin SVG icons looked wobbly (strokes snapping to pixels), even with `will-change`.
- **The hidden navbar isn't saved:** it survives page changes and a language switch, but a reload brings it back, so nobody lands on a page without navigation.
- **Tried and dropped:** wheat in the navbar logo (over the hero, then only outside it), wheat icons on the Contact page, the footer background on the "Follow us" card.

## Left over

- To reopen membership: restore the commented button in `Contact.tsx` and its `JOIN_FORM_URL` import, and remove the popup.
- While the navbar is hidden, its 64px strip catches the pointer, so anything clickable underneath can't be reached there.
- The hide and scroll behaviour was checked in headless Chrome only; bringing the bar back with a tap on the top strip on phones is untested on a real device.
