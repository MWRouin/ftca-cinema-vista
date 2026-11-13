import { useSyncExternalStore } from "react";
import { stripLocale } from "@/i18n/config";

// The pages this tab has visited inside the site, as localized pathnames,
// mirroring the browser's history from the first page loaded: a link pushes
// an entry and the browser's back button pops one. Kept outside React so it
// survives the remount a language switch causes. A full reload starts over.
let entries: string[] = [];
let popping = false;
let listening = false;
const listeners = new Set<() => void>();

/** Records the current pathname; `Layout` calls it on every page change. */
export function recordPage(pathname: string) {
  if (!listening) {
    listening = true;
    // Fires before the router updates the pathname, so the next record knows
    // the change came from the browser's back or forward button.
    window.addEventListener("popstate", () => {
      popping = true;
    });
  }
  const wasPopping = popping;
  popping = false;
  if (pathname === entries.at(-1)) return;
  if (wasPopping && pathname === entries.at(-2)) entries = entries.slice(0, -1);
  else entries = [...entries, pathname];
  listeners.forEach((listener) => listener());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/**
 * The locale-neutral path one step back in history from `current`, or null
 * when going back would leave the site or only switch language (a language
 * switch adds a history entry for the same page). A new page renders before
 * `Layout` records it, so `current` may not be in `entries` yet.
 */
const getPreviousPage = (current: string) => {
  let previous: string | undefined;
  if (current === entries.at(-1)) previous = entries.at(-2);
  else if (popping && current === entries.at(-2)) previous = entries.at(-3);
  else previous = entries.at(-1);
  if (!previous || stripLocale(previous) === stripLocale(current)) return null;
  return stripLocale(previous);
};

/**
 * See `getPreviousPage`; `pathname` is the current localized pathname. Null on
 * the server and on the first page loaded.
 */
export const usePreviousPage = (pathname: string) =>
  useSyncExternalStore(subscribe, () => getPreviousPage(pathname), () => null);
