import { useEffect, useSyncExternalStore } from "react";

// Navigations in flight, counted outside React so that any link can report
// one and the single progress bar (components/NavigationProgress) can show it.
let pendingCount = 0;
const listeners = new Set<() => void>();

const setPendingCount = (count: number) => {
  pendingCount = count;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const isNavigating = () => pendingCount > 0;
const isNavigatingOnServer = () => false;

/** Reports a navigation as in flight for as long as `pending` is true. */
export function useReportNavigation(pending: boolean) {
  useEffect(() => {
    if (!pending) return;
    setPendingCount(pendingCount + 1);
    return () => setPendingCount(pendingCount - 1);
  }, [pending]);
}

/** True while any reported navigation is still loading. */
export const useIsNavigating = () =>
  useSyncExternalStore(subscribe, isNavigating, isNavigatingOnServer);
