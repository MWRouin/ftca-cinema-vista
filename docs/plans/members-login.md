# Plan: Members login

Status: draft · Issue: none yet (rename this file to `<issue#>-members-login.md` once it exists) · Branch: not started

## Context

A person in `people.json` can be given credentials and sign in. The site is a static export on GitHub Pages with no server, and hosting must stay free, so accounts live in **Firebase Auth on the free Spark plan**. Supabase was set aside because free projects pause after a week of inactivity; Cloudflare D1 has no auth and would need our own Worker code.

## Scope

Only this, for now:

- **Account ↔ person, 1 to 0..1.** A person has at most one account; an account belongs to exactly one person. People without an account are unchanged.
- **The account** holds a login identifier, a password (hashed by Firebase, never by us), the session tokens (issued and refreshed by Firebase) and a status: active or blocked. Blocked is Firebase's "disabled" flag.
- **Signed-in menu:** the person's portrait (from `people.json`) next to the language and theme buttons. Clicking it opens a menu with **My profile** (their `/people/<id>/` page) and **Sign out**. Nothing else.
- **A sign-in page** at an unlinked address (`/<locale>/members/`): no link to it anywhere, not in the sitemap, `noindex`. Members are given the address.
- **Client-side only:** the portrait button, its menu and the sign-in form render in the browser only, never in the prerendered HTML. The server output has no trace of them (no placeholder that depends on auth).

Out of scope: members-only content, profile editing, admin pages and invitations from the site, sign-up.

## Design decisions

- **Accounts are managed by hand in the Firebase console** until the club has a real backend on a VM. No admin page and no admin script: the club's Google account, which owns the project, is the admin.
- **Giving a member an account:** in the console, add a user with their email and a random password nobody keeps, then use the console's *Reset password* on it, which sends Firebase's "set your password" email (its text is editable in the console, in French or English). The member follows the link, chooses a password and signs in. The club never sees or sends a password. A wrong email gives the account to whoever owns that address, so check it first.
- **Linking an account to a person:** a Firestore document `members/<uid>` with a `personId` field, added in the Firestore console after creating the user. Security rules let a signed-in user read only their own document and let no browser write any. One person per account and one account per person is kept by hand: check that a `personId` isn't already used before adding it. (Firebase custom claims would avoid the database but can only be set from a server.)
- **Blocking:** the console's *Disable account*. Sign-in fails, and an open session ends when its token next refreshes (within an hour). Fine for a menu that only links to public pages. Deleting the user and their `members` document removes the account.
- **Login identifier: real emails.** Members sign in with their own email and can reset their own password from the sign-in page.
- **Emails are never in the repo.** Emails are personal data and stay out of `people.json` and the repo; they live only in Firebase Auth.
- **Public pages carry no login code.** Firebase and the sign-in form are in the sign-in page's own code, which other pages never download. Signing in leaves a member note in the browser (`localStorage`: the person's id and portrait path, both public data). Every page runs a tiny check for it: with no note (every ordinary visitor) nothing else loads; with one, the portrait shows at once from the note, then the members bundle (Firebase and the menu) loads in the background, checks the session and reads the user's `members` document. If the session is gone, the account is blocked, or there is no `members` document or its `personId` differs from the note, it removes the portrait and clears the note. Sign out clears it too.
- **The note is a display hint, not a credential.** Editing it only changes the portrait on that person's own screen until the background check corrects it; it grants nothing, since the menu only links to public pages. Anything that needs protecting later (members-only data) is checked against the token by Firebase on Google's side (Firestore rules), never by the page.
- **State:** the auth state lives in a store outside React (the language switch remounts the tree), read through `useSyncExternalStore` whose server snapshot is "no member", so the prerendered HTML has no account markup and the portrait appears only in the browser. Firebase keeps the session across visits.
- **The Firebase web config is public by design** and can be committed. Security rests on the authorized domains (`cineamateur-hlif.com`, localhost), on sign-up being disabled if the free plan allows it (check at M1), and on the Firestore rules: an account created any other way has no `members` document, so it gets nothing.

## Milestones

**M1. Firebase project.** Create the project (Spark, owned by the club's Google account, decided), enable email and password sign-in, disable sign-up if possible, set the authorized domains, adapt the "set your password" email, create Firestore with its security rules (tested with the emulator). Write a short guide in `docs/` for adding, blocking and removing a member in the console.

**M2. Sign-in.** The sign-in page (client-rendered form, both locales) with clear errors for a wrong password and a blocked account; on success it reads the `members` document, writes the member note and goes to the home page; an account with no `members` document is signed out with a message. Check that no public page's JavaScript includes Firebase.

**M3. Account menu.** The member-note check, the background members bundle that verifies the session, and the portrait button beside the language and theme buttons (initials when the person has no portrait), a menu with My profile and Sign out, on desktop and in the mobile menu, keyboard and screen-reader accessible, strings in `common`.

**M4. Wrap up.** Deploy config, a free-tier check (Auth is free up to 50k monthly users), `AGENTS.md` updates and the new module's `AGENTS.md`, sprint log.

## Later

- A real backend on a VM: then the club account becomes an admin user on the site, with an Invite button on people pages that creates the account, links it to the person and sends the invitation; the hand-kept `members` documents move there.
