import { useRef, useState, type TouchEvent } from "react";

// Past this share of the panel's width, or faster than this flick speed
// (px/ms), a swipe closes it.
const CLOSE_FRACTION = 1 / 3;
const FLICK_SPEED = 0.4;
const SLIDE_MS = 200;

/**
 * Swipe right to close a right-side panel: it follows the finger, then closes
 * past a third of its width or on a quick flick, and snaps back otherwise. A
 * mostly vertical move is left alone, so the panel's content can still scroll.
 *
 * Spread `handlers` on the panel. `swipedClosed` is set once a swipe closed it
 * (the panel already slid out under the finger, so its own closing animation
 * must not play again); call `resetSwipe` when it opens.
 */
export function useSwipeToClose(onClose: () => void) {
  const [swipedClosed, setSwipedClosed] = useState(false);
  const swipe = useRef<{ x: number; y: number; time: number; dragging: boolean | null } | null>(null);

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    swipe.current = { x: touch.clientX, y: touch.clientY, time: event.timeStamp, dragging: null };
  };

  const onTouchMove = (event: TouchEvent<HTMLElement>) => {
    const start = swipe.current;
    if (!start) return;
    const dx = event.touches[0].clientX - start.x;
    const dy = event.touches[0].clientY - start.y;
    if (start.dragging === null) {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      start.dragging = dx > 0 && Math.abs(dx) > Math.abs(dy);
    }
    if (!start.dragging) return;
    const panel = event.currentTarget;
    panel.style.transition = "none";
    panel.style.transform = `translateX(${Math.max(0, dx)}px)`;
  };

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start?.dragging) return;
    const panel = event.currentTarget;
    const dx = Math.max(0, event.changedTouches[0].clientX - start.x);
    const speed = dx / Math.max(1, event.timeStamp - start.time);
    panel.style.transition = `transform ${SLIDE_MS}ms ease-out`;
    if (dx > panel.offsetWidth * CLOSE_FRACTION || speed > FLICK_SPEED) {
      panel.style.transform = "translateX(100%)";
      setSwipedClosed(true);
      // A timer, not transitionend: a panel already dragged all the way out
      // has nothing left to animate, and no event would come.
      window.setTimeout(onClose, SLIDE_MS);
    } else {
      panel.style.transform = "";
    }
  };

  return {
    swipedClosed,
    resetSwipe: () => setSwipedClosed(false),
    handlers: { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel: onTouchEnd },
  };
}
