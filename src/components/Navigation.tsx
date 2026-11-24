'use client';

import { useState, useEffect, useRef, useSyncExternalStore, type TouchEvent } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Menu, PanelTopClose, PanelTopOpen } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { Logo } from './Logo';
import { LocalLink } from '@/i18n/locale';
import { stripLocale } from '@/i18n/config';
import { NAV_ITEMS } from '@/lib/site-nav';
import { cn } from '@/lib/utils';
import { SocialLinks } from '@/components/customUi/social-links';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// Whether the navbar is hidden. Hidden by default; the visitor's choice is
// saved in localStorage. Kept outside React so it survives the remount of a
// language switch. The prerendered HTML has the bar hidden, and a saved
// "shown" takes effect right after load.
const NAV_HIDDEN_KEY = 'navHidden';
let navHidden: boolean | null = null;
const readNavHidden = () => {
  if (navHidden === null) {
    try {
      navHidden = localStorage.getItem(NAV_HIDDEN_KEY) !== 'false';
    } catch {
      navHidden = true;
    }
  }
  return navHidden;
};
const navHiddenListeners = new Set<() => void>();
const subscribeNavHidden = (listener: () => void) => {
  navHiddenListeners.add(listener);
  return () => navHiddenListeners.delete(listener);
};
const setNavHidden = (hidden: boolean) => {
  navHidden = hidden;
  try {
    localStorage.setItem(NAV_HIDDEN_KEY, String(hidden));
  } catch {
    // Storage blocked: the choice lasts until the page is reloaded.
  }
  navHiddenListeners.forEach((listener) => listener());
};

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  // Set when a swipe closed the drawer: it has already slid out under the
  // finger, so its own closing slide must not play from the start again.
  const [swipedClosed, setSwipedClosed] = useState(false);
  // Set when "Hide the bar" closes the drawer: focus must not go back to the
  // menu button, inside the bar, or the bar would stay shown for it.
  const hidingFromDrawer = useRef(false);
  const swipe = useRef<{ x: number; y: number; time: number; dragging: boolean | null } | null>(null);
  const hidden = useSyncExternalStore(subscribeNavHidden, readNavHidden, () => true);
  // Set when the visitor last scrolled up, cleared when they scroll down.
  const [scrolledUp, setScrolledUp] = useState(false);
  // Hidden, the bar slides up out of view and comes back while the visitor
  // scrolls up, the pointer is on its strip (a tap on touch screens) or a
  // keyboard user tabs into it; an open menu keeps it shown.
  const tucked = hidden && !isOpen && !scrolledUp;
  const pathname = usePathname();
  const { t } = useTranslation();
  const path = stripLocale(pathname);
  const isHome = path === '/';

  // `scrolled` (past 20px) and `overlay` (navbar sits transparently over the
  // hero) are the only scroll-derived values the navbar renders from. We
  // compute them in a rAF-throttled scroll handler and only commit them to
  // state when they actually flip, so the navbar re-renders a couple of times
  // per scroll instead of on every frame (measuring the hero on every scroll
  // event forces a layout per frame, which janks on mobile).
  const [scrolled, setScrolled] = useState(false);
  const [overlay, setOverlay] = useState(isHome);

  useEffect(() => {
    let rafId = 0;
    let lastY = window.scrollY;
    let hideTimer = 0;
    let touchStartY: number | null = null;

    // Brings a hidden bar back, as a scroll up does. With a mouse it goes
    // again after 5 s (hovering its strip keeps it shown); touch screens keep
    // it until the next scroll down.
    const reveal = () => {
      setScrolledUp(true);
      clearTimeout(hideTimer);
      if (window.matchMedia('(hover: hover)').matches) {
        hideTimer = window.setTimeout(() => setScrolledUp(false), 5000);
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
          setScrolledUp(false);
          clearTimeout(hideTimer);
        }
        lastY = y;
      }

      if (!isHome) {
        setOverlay(false);
        return;
      }
      // On home the navbar overlays the hero transparently until the navbar's
      // vertical middle reaches the hero's bottom edge.
      const hero = document.querySelector('.editorial-hero');
      const navHeight = 64; // h-16
      setOverlay(
        hero
          ? hero.getBoundingClientRect().bottom > navHeight / 3 * 2
          : y < window.innerHeight * 0.8
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
    const onTouchStart = (event: globalThis.TouchEvent) => {
      touchStartY = window.scrollY <= 0 ? event.touches[0].clientY : null;
    };
    const onTouchMove = (event: globalThis.TouchEvent) => {
      if (touchStartY !== null && event.touches[0].clientY - touchStartY > 30) {
        touchStartY = null;
        reveal();
      }
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(hideTimer);
    };
  }, [isHome]);

  // The drawer exists below lg only: widening the window past it closes the
  // drawer, or its backdrop would stay over the page.
  useEffect(() => {
    if (!isOpen) return;
    const wide = window.matchMedia('(min-width: 1024px)');
    const onChange = () => { if (wide.matches) setIsOpen(false); };
    wide.addEventListener('change', onChange);
    return () => wide.removeEventListener('change', onChange);
  }, [isOpen]);

  // Hiding must take effect even if the last scroll was upwards; hiding from
  // the drawer closes it, so the bar can go.
  const toggleNavHidden = () => {
    if (!hidden) setScrolledUp(false);
    setNavHidden(!hidden);
    setIsOpen(false);
  };
  const HideIcon = hidden ? PanelTopOpen : PanelTopClose;

  const openDrawer = (open: boolean) => {
    if (open) setSwipedClosed(false);
    setIsOpen(open);
  };

  // Swipe right to close the drawer: it follows the finger, then closes past
  // a third of its width or on a quick flick, and snaps back otherwise. A
  // mostly vertical move is left alone, so the link list can still scroll.
  const onSwipeStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    swipe.current = { x: touch.clientX, y: touch.clientY, time: event.timeStamp, dragging: null };
  };
  const onSwipeMove = (event: TouchEvent<HTMLDivElement>) => {
    const start = swipe.current;
    if (!start) return;
    const dx = event.touches[0].clientX - start.x;
    const dy = event.touches[0].clientY - start.y;
    if (start.dragging === null) {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      start.dragging = dx > 0 && Math.abs(dx) > Math.abs(dy);
    }
    if (!start.dragging) return;
    const drawer = event.currentTarget;
    drawer.style.transition = 'none';
    drawer.style.transform = `translateX(${Math.max(0, dx)}px)`;
  };
  const onSwipeEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start?.dragging) return;
    const drawer = event.currentTarget;
    const dx = Math.max(0, event.changedTouches[0].clientX - start.x);
    const speed = dx / Math.max(1, event.timeStamp - start.time); // px per ms
    drawer.style.transition = 'transform 200ms ease-out';
    if (dx > drawer.offsetWidth / 3 || speed > 0.4) {
      drawer.style.transform = 'translateX(100%)';
      setSwipedClosed(true);
      // A timer, not transitionend: a drawer already dragged all the way out
      // has nothing left to animate, and no event would come.
      window.setTimeout(() => setIsOpen(false), 200);
    } else {
      drawer.style.transform = '';
    }
  };

  const normalize = (p: string) => (p.endsWith('/') && p !== '/' ? p.slice(0, -1) : p);
  const isActive = (target: string) => normalize(path) === normalize(target);

  return (
    <>
    {/* The navbar's strip: the hover area that brings a hidden bar back. */}
    <div className="group/nav fixed top-0 inset-x-0 z-50 h-16">
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${overlay
      ? 'bg-transparent text-white border-transparent'
      : `bg-background/90 border-border/30 ${scrolled ? (tucked ? 'group-hover/nav:shadow-lg' : 'shadow-lg') : ''}`
      } ${tucked
      ? '-translate-y-full group-hover/nav:translate-y-0 group-has-[:focus-visible]/nav:translate-y-0'
      : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-16 flex items-center">
          {/* Logo (left) */}
          <div className="flex items-center p-2">
            <LocalLink
              to="/"
              className="flex items-center space-x-3"
              aria-label={t('a11y.homeLink')}
              onClick={() => {
                setIsOpen(false);
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              }}
            >
              <Logo
                size={50}
                className="drop-shadow-lg"
                {...(overlay ? { colorMain: '#fff', colorBack: '#8fa39a', colorFront: '#cbd1ce' } : {})}
              />
            </LocalLink>
          </div>

          {/* Desktop Navigation (centered on md+) */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-2">
            {NAV_ITEMS.map((item, index) => (
              <LocalLink
                key={item.key}
                to={item.path}
                className={`nav-link ${overlay ? 'nav-overlay ' : ''}text-base font-semibold whitespace-nowrap transition-all duration-300 focus-cinema ${isActive(item.path)
                  ? overlay
                    ? 'text-white active' // active over hero: white stays legible
                    : 'text-brand active' // keep underline via .active, remove bg/border
                  : overlay
                    ? 'text-white/90 hover:text-white'
                    : 'text-foreground/80 hover:text-brand'
                  }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {t(`nav.${item.key}`)}
              </LocalLink>
            ))}
          </div>

          {/* Right side: the settings on lg+, the menu button below lg */}
          <div className="ml-auto flex items-center space-x-2">
            <div className="hidden lg:flex items-center space-x-2">
              <LanguageToggle onDark={overlay} />
              <ThemeToggle onDark={overlay} />
              <button
                onClick={toggleNavHidden}
                className={`w-9 h-9 rounded-lg flex items-center justify-center bg-transparent group ${overlay ? 'text-white' : 'text-brand'}`}
                aria-label={t(hidden ? 'a11y.showNav' : 'a11y.hideNav')}
                title={t(hidden ? 'a11y.showNav' : 'a11y.hideNav')}
              >
                <HideIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
            {/* Below lg: the menu, a drawer from the right (Radix dialog: focus
                trap, Escape, scroll lock, focus back to this button). */}
            <Sheet open={isOpen} onOpenChange={openDrawer}>
              <SheetTrigger asChild>
                <button
                  className={`lg:hidden w-9 h-9 rounded-lg flex items-center justify-center bg-transparent group ${overlay ? 'text-white' : 'text-brand'}`}
                  aria-label={t('a11y.toggleMenu')}
                >
                  <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </SheetTrigger>
              <SheetContent
                closeLabel={t('a11y.close')}
                aria-describedby={undefined}
                onCloseAutoFocus={(event) => {
                  if (!hidingFromDrawer.current) return;
                  hidingFromDrawer.current = false;
                  event.preventDefault();
                }}
                onTouchStart={onSwipeStart}
                onTouchMove={onSwipeMove}
                onTouchEnd={onSwipeEnd}
                onTouchCancel={onSwipeEnd}
                className={cn(
                  'lg:hidden flex w-64 max-w-[80vw] flex-col gap-0 border-accent/30 bg-card dark:bg-background p-0',
                  swipedClosed && 'data-[state=closed]:animate-none',
                )}
              >
                <SheetTitle className="sr-only">{t('a11y.menu')}</SheetTitle>
                {/* The settings, in words; the × sits at the right of the first row,
                    whose label is short enough to leave it room. */}
                <div className="px-4 py-3">
                  <LanguageToggle labeled />
                  <ThemeToggle labeled />
                  <button
                    onClick={() => {
                      hidingFromDrawer.current = !hidden;
                      toggleNavHidden();
                    }}
                    className="flex h-10 w-full items-center gap-3 rounded-md px-2 text-left text-sm font-medium text-foreground/80 transition-colors hover:text-brand"
                  >
                    <HideIcon className="w-5 h-5 text-brand" />
                    <span>{t(hidden ? 'a11y.showNavShort' : 'a11y.hideNavShort')}</span>
                  </button>
                </div>
                {/* Separators are wheat hairlines starting at the text's left edge
                    and fading out to the right: full-width rules read as hard
                    edges, and centred ones look off against left-aligned text. */}
                <div className="ml-6 mr-4 h-px bg-gradient-to-r from-accent/60 to-transparent" />
                {/* The pages, underlined like the bar's links */}
                <nav className="flex flex-1 flex-col items-start overflow-y-auto py-3">
                  {NAV_ITEMS.map((item) => {
                    const active = isActive(item.path);
                    return (
                      <LocalLink
                        key={item.key}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={`nav-link nav-menu-item ml-2 text-lg font-semibold focus-cinema ${active
                          ? 'text-brand active'
                          : 'text-foreground/80 hover:text-brand'}`}
                      >
                        {t(`nav.${item.key}`)}
                      </LocalLink>
                    );
                  })}
                </nav>
                {/* Sign-off: the social links and the club's logo (home) */}
                <div className="ml-6 mr-4 h-px bg-gradient-to-r from-accent/60 to-transparent" />
                <div className="flex items-center justify-between py-3 pl-4 pr-5">
                  <SocialLinks variant="chip" className="space-x-1" />
                  <LocalLink to="/" onClick={() => setIsOpen(false)} aria-label={t('a11y.homeLink')}>
                    <Logo size={44} />
                  </LocalLink>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
    </div>

    </>
  );
}
