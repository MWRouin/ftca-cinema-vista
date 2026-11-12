import { useEffect, useRef } from 'react';

/**
 * Reveals an `.animate-on-scroll` element (adds `in-view`) the first time it
 * enters the viewport. Elements already on screen at mount are revealed at once.
 */
export function useScrollAnimation(threshold = 0.1) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const isAboveFold = element.getBoundingClientRect().top < window.innerHeight;
    if (isAboveFold || !('IntersectionObserver' in window)) {
      element.classList.add('in-view');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          element.classList.add('in-view');
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return elementRef;
}
