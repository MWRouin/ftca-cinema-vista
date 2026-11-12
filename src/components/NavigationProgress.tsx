'use client';

import { useEffect, useState } from 'react';
import { useIsNavigating } from '@/lib/navigation-progress';
import { cn } from '@/lib/utils';

// A navigation that finishes sooner than this shows no bar at all.
const SHOW_DELAY_MS = 150;

/**
 * Thin bar at the top of the viewport while a page navigation is loading. The
 * previous page stays visible meanwhile. The bar only appears if loading takes
 * longer than a moment, so a prefetched, instant navigation shows nothing. Once
 * the page arrives it fills to the end and fades out (`.nav-progress` in
 * index.css).
 */
export function NavigationProgress() {
  const navigating = useIsNavigating();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!navigating) return;
    const timer = setTimeout(() => setShown(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [navigating]);

  if (!shown) return null;
  return (
    <div
      className={cn('nav-progress', !navigating && 'nav-progress-done')}
      aria-hidden="true"
      // The fade is the last step of the finish; remove the bar once it is over.
      onTransitionEnd={(event) => {
        if (!navigating && event.propertyName === 'opacity') setShown(false);
      }}
    />
  );
}
