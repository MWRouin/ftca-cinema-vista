import { useSyncExternalStore } from "react";

// Whether the visitor chose to hide the navbar. Hidden by default; the choice
// is saved in localStorage. Kept outside React so it survives the remount of a
// language switch. Either way the bar shows when the page loads and a hidden
// one goes after a moment (see `useNavScroll`).
const STORAGE_KEY = "navHidden";
let navHidden: boolean | null = null;
const listeners = new Set<() => void>();

const read = () => {
  if (navHidden === null) {
    try {
      navHidden = localStorage.getItem(STORAGE_KEY) !== "false";
    } catch {
      navHidden = true;
    }
  }
  return navHidden;
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function setNavHidden(hidden: boolean) {
  navHidden = hidden;
  try {
    localStorage.setItem(STORAGE_KEY, String(hidden));
  } catch {
    // Storage blocked: the choice lasts until the page is reloaded.
  }
  listeners.forEach((listener) => listener());
}

/** The saved "hide the navbar" choice (true on the server: the default). */
export const useNavHidden = () => useSyncExternalStore(subscribe, read, () => true);
