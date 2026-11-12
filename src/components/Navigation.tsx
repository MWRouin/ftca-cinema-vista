'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { Logo } from './Logo';
import { LocalLink } from '@/i18n/locale';
import { stripLocale } from '@/i18n/config';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
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

    const measure = () => {
      rafId = 0;
      const y = window.scrollY;
      setScrolled(y > 20);

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

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isHome]);

  // Escape closes the mobile menu, as it does for any popover.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'movies', path: '/movies' },
    { key: 'events', path: '/events' },
    { key: 'blog', path: '/blog' },
    { key: 'about', path: '/about' },
    { key: 'palmares', path: '/palmares' },
    { key: 'contact', path: '/contact' },
  ];

  const normalize = (p: string) => (p.endsWith('/') && p !== '/' ? p.slice(0, -1) : p);
  const isActive = (target: string) => normalize(path) === normalize(target);

  return (
    <>
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${overlay
      ? 'bg-transparent text-white border-transparent'
      : `bg-background/85 border-border/30 ${scrolled ? 'shadow-lg' : ''}`
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-16 flex items-center">
          {/* Logo (left) */}
          <div className="flex items-center p-2">
            <LocalLink
              to="/"
              className="flex items-center space-x-3"
              onClick={() => {
                setIsOpen(false);
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              }}
            >
              <Logo
                size={50}
                className="hover:scale-110 transition-transform drop-shadow-lg"
                {...(overlay ? { colorMain: '#fff', colorBack: '#7b828d', colorFront: '#cbd1ce' } : {})}
              />
            </LocalLink>
          </div>

          {/* Desktop Navigation (centered on md+) */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-2">
            {navItems.map((item, index) => (
              <LocalLink
                key={item.key}
                to={item.path}
                className={`nav-link ${overlay ? 'nav-overlay ' : ''}text-sm font-medium whitespace-nowrap transition-all duration-300 focus-cinema ${isActive(item.path)
                  ? overlay
                    ? 'text-white active' // active over hero: white stays legible
                    : 'text-primary active' // keep underline via .active, remove bg/border
                  : overlay
                    ? 'text-white/90 hover:text-white'
                    : 'text-foreground/80 hover:text-primary'
                  }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {t(`nav.${item.key}`)}
              </LocalLink>
            ))}
          </div>

          {/* Right side: language and theme toggles, plus the menu button below lg */}
          <div className="ml-auto flex items-center space-x-2">
            <LanguageToggle onDark={overlay} />
            <ThemeToggle onDark={overlay} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors group bg-transparent"
              aria-label={t('a11y.toggleMenu')}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {/* Both icons are stacked and cross-fade, so the button turns into a close button. */}
              <span className={`relative w-5 h-5 group-hover:scale-110 transition-transform duration-300 ${overlay ? 'text-white' : 'text-primary'}`}>
                <Menu className={`absolute inset-0 w-5 h-5 transition-[transform,opacity] duration-300 ${isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                <X className={`absolute inset-0 w-5 h-5 transition-[transform,opacity] duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>

      {/* Tap-outside backdrop: closes the mobile menu when tapping anywhere
          off it. Transparent (no visual change) and below the nav (z-50) so the
          toggle button still works, but above the panel-less page content. */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation — a theme-aware popover panel matching the site UI.
          `inert` while closed: the panel is only faded out, and its links must
          not take keyboard focus or be read out. */}
      <div
        id="mobile-menu"
        inert={!isOpen}
        className={
          `lg:hidden fixed top-16 right-3 z-40 w-fit origin-top-right transition-all duration-200 ${isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 -translate-y-3 scale-95 pointer-events-none'}`
        }
      >
        <div className="overflow-hidden rounded-md border border-border bg-card/95 shadow-xl backdrop-blur-md">
          {/* accent hairline */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="p-2 max-h-[calc(100dvh-5rem)] overflow-y-auto overflow-x-hidden flex flex-col gap-0.5">
            {navItems.map((item, index) => {
              const active = isActive(item.path);
              return (
                <LocalLink
                  key={item.key}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  style={{ transitionDelay: isOpen ? `${index * 40}ms` : '0ms' }}
                  aria-current={active ? 'page' : undefined}
                  className={`nav-link nav-menu-item group relative flex items-center justify-center rounded-sm px-6 py-2.5 text-base font-medium tracking-wide transition-all duration-300 focus-cinema
                    ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'}
                    ${active ? 'text-primary active' : 'text-foreground/80 hover:text-primary'}`}
                >
                  <span>{t(`nav.${item.key}`)}</span>
                </LocalLink>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
