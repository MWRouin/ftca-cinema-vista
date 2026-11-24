'use client';

import { useEffect, useState } from 'react';
import { useIsNavigating, useNavigationRun } from '@/lib/navigation-progress';
import { cn } from '@/lib/utils';

// A navigation that finishes sooner than this shows no bar at all.
const SHOW_DELAY_MS = 150;

/**
 * Thin bar at the top of the viewport while a page navigation is loading. The
 * previous page stays visible meanwhile. The bar only appears if loading takes
 * longer than a moment, so a prefetched, instant navigation shows nothing. Once
 * the page arrives it fills to the end and fades out (`.nav-progress` in
 * index.css).
 *
 * Each navigation gets its own bar (keyed by its run). A navigation that
 * starts while the previous bar is still finishing must not reuse it: dropping
 * the finished state would send that full bar back towards 90%, visibly
 * shrinking. The old bar keeps fading and the new one grows from zero.
 */
export function NavigationProgress() {
  const navigating = useIsNavigating();
  const run = useNavigationRun();
  // The run the bar on screen belongs to, or null when there is none.
  const [shownRun, setShownRun] = useState<number | null>(null);

  useEffect(() => {
    if (!navigating) return;
    const timer = setTimeout(() => setShownRun(run), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [navigating, run]);

  if (shownRun === null) return null;
  const done = !navigating || shownRun !== run;
  return (
    <div
      key={shownRun}
      className={cn('nav-progress', done && 'nav-progress-done')}
      aria-hidden="true"
      // The fade is the last step of the finish; remove the bar once it is over.
      onTransitionEnd={(event) => {
        if (done && event.propertyName === 'opacity') {
          setShownRun((current) => (current === shownRun ? null : current));
        }
      }}
    />
  );
}
