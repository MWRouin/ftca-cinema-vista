// A settings row in the mobile drawer (language, theme, hide the bar): an icon
// and the current state in words, as wide as its content so a tap beside it
// (aiming at the drawer's ×) does nothing. No aria-label: the visible text is
// the accessible name, so voice control can use it.
export const DRAWER_ROW_CLASS =
  'flex h-10 w-fit items-center gap-3 rounded-md px-2 text-left text-sm font-medium text-foreground/80 transition-colors hover:text-brand focus-cinema';
