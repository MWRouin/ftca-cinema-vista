
import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold = 0.1) {
  const elementRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Immediate fallback for elements above the fold
    const isAboveFold = element.getBoundingClientRect().top < window.innerHeight;
    if (isAboveFold) {
      element.classList.add('in-view');
      setHasAnimated(true);
      return;
    }

    // Fallback timer for intersection observer failures
    const fallbackTimer = setTimeout(() => {
      if (!hasAnimated && element) {
        element.classList.add('in-view', 'animate-on-scroll-fallback');
        setHasAnimated(true);
      }
    }, 200);

    // Check for intersection observer support
    if (!('IntersectionObserver' in window)) {
      element.classList.add('in-view', 'animate-on-scroll-fallback');
      setHasAnimated(true);
      clearTimeout(fallbackTimer);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            entry.target.classList.add('in-view');
            setHasAnimated(true);
            clearTimeout(fallbackTimer);
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [threshold, hasAnimated]);

  return elementRef;
}
