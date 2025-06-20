
import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold = 0.1) {
  const elementRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Fallback: make visible after 100ms if intersection observer fails
    const fallbackTimer = setTimeout(() => {
      if (!hasAnimated) {
        element.classList.add('in-view', 'animate-on-scroll-fallback');
        setHasAnimated(true);
      }
    }, 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            entry.target.classList.add('in-view');
            setHasAnimated(true);
            clearTimeout(fallbackTimer);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      clearTimeout(fallbackTimer);
    };
  }, [threshold, hasAnimated]);

  return elementRef;
}
