import { useEffect, useRef, useState } from "react";

// How long a hidden bar stays after it was brought back (page load, scroll up).
const HIDE_DELAY_MS = 5000;
// The navbar's height (h-16).
const NAV_HEIGHT = 64;

/**
 * Scroll-derived state of the navbar:
 * - `scrolled`: past 20px (adds the shadow);
 * - `overlay`: on home, the bar sits transparently over the hero until its
 *   lower third reaches the hero's bottom edge;
 * - `revealed`: a hidden bar is brought back. True on load, then false after
 *   5 s; set again by a scroll up (or a pull down / wheel up at the top, which
 *   can't scroll), cleared by a scroll down. With a mouse it also clears 5 s
 *   after the scroll up; touch screens keep it until the next scroll down.
 *
 * The values are computed in a rAF-throttled scroll handler and only change
 * state when they flip, so the bar re-renders a few times per scroll, not on
 * every frame (measuring the hero each event forces a layout, janky on phones).
 */
export function useNavScroll(isHome: boolean) {
  const [scrolled, setScrolled] = useState(false);
  const [overlay, setOverlay] = useState(isHome);
  const [revealed, setRevealed] = useState(true);
  // The pending "hide again" timer. A ref, so a route change that re-runs the
  // scroll effect doesn't drop it and leave the bar shown.
  const hideTimer = useRef(0);

  const conceal = () => {
    clearTimeout(hideTimer.current);
    setRevealed(false);
  };

  // Shown on load, the bar goes after 5 s on every device (touch included:
  // no scroll down may come to hide it).
  useEffect(() => {
    hideTimer.current = window.setTimeout(() => setRevealed(false), HIDE_DELAY_MS);
    return () => clearTimeout(hideTimer.current);
  }, []);

  useEffect(() => {
    let rafId = 0;
    let lastY = window.scrollY;
    let touchStartY: number | null = null;

    const reveal = () => {
      setRevealed(true);
      clearTimeout(hideTimer.current);
      if (window.matchMedia("(hover: hover)").matches) {
        hideTimer.current = window.setTimeout(() => setRevealed(false), HIDE_DELAY_MS);
      }
    };

    const measure = () => {
      rafId = 0;
      const y = window.scrollY;
      setScrolled(y > 20);
      // A few pixels of slack, so a tremor or an overscroll bounce doesn't
      // flip the direction.
      if (Math.abs(y - lastY) > 8) {
        if (y < lastY) {
          reveal();
        } else {
          clearTimeout(hideTimer.current);
          setRevealed(false);
        }
        lastY = y;
      }

      if (!isHome) {
        setOverlay(false);
        return;
      }
      const hero = document.querySelector(".editorial-hero");
      setOverlay(
        hero
          ? hero.getBoundingClientRect().bottom > (NAV_HEIGHT / 3) * 2
          : y < window.innerHeight * 0.8,
      );
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(measure);
    };
    // At the top of the page a pull down (finger) or a wheel turned up can't
    // scroll, so no scroll event comes; count it as a scroll up all the same.
    const onWheel = (event: WheelEvent) => {
      if (event.deltaY < 0 && window.scrollY <= 0) reveal();
    };
    const onTouchStart = (event: TouchEvent) => {
      touchStartY = window.scrollY <= 0 ? event.touches[0].clientY : null;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (touchStartY !== null && event.touches[0].clientY - touchStartY > 30) {
        touchStartY = null;
        reveal();
      }
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isHome]);

  return { scrolled, overlay, revealed, conceal };
}
