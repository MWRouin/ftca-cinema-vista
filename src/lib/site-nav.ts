/**
 * The site's main sections, in menu order. Shared by the navbar and the
 * footer so the two lists can't drift apart. `key` is the `nav.*` label in
 * the `common` i18n namespace; `path` is locale-neutral (use `LocalLink`).
 */
export const NAV_ITEMS = [
  { key: "home", path: "/" },
  { key: "movies", path: "/movies" },
  { key: "events", path: "/events" },
  { key: "blog", path: "/blog" },
  { key: "about", path: "/about" },
  { key: "palmares", path: "/palmares" },
  { key: "contact", path: "/contact" },
] as const;
