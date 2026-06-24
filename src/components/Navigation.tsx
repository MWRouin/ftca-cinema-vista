
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Home, Film, Calendar, Newspaper, Users, Award, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { Logo } from './Logo';
import { LocalLink } from '@/i18n/locale';
import { stripLocale } from '@/i18n/config';

// Icon per route — used to give the mobile menu a little more character.
const navIcons: Record<string, LucideIcon> = {
  '/': Home,
  '/movies': Film,
  '/events': Calendar,
  '/blog': Newspaper,
  '/about': Users,
  '/palmares': Award,
  '/contact': Mail,
};

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const path = stripLocale(location.pathname);
  const isHome = path === '/';

  // `scrolled` (past 20px) and `overlay` (navbar sits transparently over the
  // hero) are the only scroll-derived values the navbar renders from. We
  // compute them in a rAF-throttled scroll handler and only commit them to
  // state when they actually flip, so the navbar re-renders a couple of times
  // per scroll instead of on every frame. The previous version called
  // setState on every scroll event AND read getBoundingClientRect() each time,
  // forcing a synchronous layout per frame — a major source of mobile jank,
  // worst on the home page where the hero is measured.
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
      // On home the navbar overlays the hero transparently until the hero's
      // bottom edge has scrolled up behind the navbar.
      const hero = document.querySelector('.editorial-hero');
      const navHeight = 64; // h-16
      setOverlay(
        hero
          ? hero.getBoundingClientRect().bottom > navHeight
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
      : scrolled
        ? 'bg-background/98 backdrop-blur-xl shadow-lg border-border/30'
        : 'bg-background/90 backdrop-blur-md border-border/30'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-16 flex items-center">
          {/* Logo (left) */}
          <div className="flex items-center p-2">
            <LocalLink to="/" className="flex items-center space-x-3">
              <Logo
                size={50}
                className="hover:scale-110 transition-transform drop-shadow-lg"
                {...(overlay ? { colorMain: '#fff', colorBack: '#7b828d', colorFront: '#cbd1ce' } : {})}
              />
            </LocalLink>
          </div>

          {/* Desktop Navigation (centered on md+) */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-2">
            {navItems.map((item, index) => (
              <LocalLink
                key={item.key}
                to={item.path}
                className={`nav-link text-sm font-medium whitespace-nowrap transition-all duration-300 focus-cinema ${isActive(item.path)
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

          {/* Right side actions: Theme toggle (desktop) and mobile controls */}
          <div className="ml-auto flex items-center space-x-3">
            {/* Theme + language toggles: visible on md and hidden on small screens within this slot (mobile keeps its own toggles) */}
            <div className="hidden md:flex items-center space-x-2">
              <LanguageToggle onDark={overlay} />
              <ThemeToggle onDark={overlay} />
            </div>

            {/* Mobile: language + theme toggle + menu button (unchanged behavior) */}
            <div className="md:hidden flex items-center space-x-2">
              <LanguageToggle onDark={overlay} />
              <ThemeToggle onDark={overlay} />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors group ${overlay
                  ? 'bg-transparent'
                  : 'bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30'
                  }`}
                aria-label="Toggle menu"
              >
                <Menu className={`w-5 h-5 group-hover:scale-110 transition-transform duration-300 ${overlay ? 'text-white' : 'text-primary'} ${isOpen ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

      {/* Tap-outside backdrop: closes the mobile menu when tapping anywhere
          off it. Transparent (no visual change) and below the nav (z-50) so the
          toggle button still works, but above the panel-less page content. */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-30"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation — rendered OUTSIDE <nav> on purpose: the nav has
          its own backdrop-filter off-hero, which would suppress this panel's
          backdrop-blur and make the blur appear only over the hero. */}
      <div
        className={
          `md:hidden fixed top-16 right-3 z-40 w-60 origin-top-right transition-all duration-200 ${isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 -translate-y-3 scale-95 pointer-events-none'}`
        }
      >
        <div className="overflow-hidden rounded-lg border border-white/10 ring-1 ring-white/5 shadow-2xl shadow-black/50 bg-gradient-to-b from-zinc-900/80 to-black/70 backdrop-blur-2xl">
          {/* accent hairline */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="p-2 max-h-[calc(100vh-5rem)] overflow-y-auto overflow-x-hidden flex flex-col gap-1">
            {navItems.map((item, index) => {
              const Icon = navIcons[item.path] ?? Home;
              const active = isActive(item.path);
              return (
                <LocalLink
                  key={item.key}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  style={{ transitionDelay: isOpen ? `${index * 40}ms` : '0ms' }}
                  className={`group relative flex items-center justify-end gap-3 rounded-md px-3.5 py-2.5 text-base font-medium tracking-wide transition-all duration-300 focus-cinema
                    ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'}
                    ${active ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/5'}`}
                >
                  <span>{t(`nav.${item.key}`)}</span>
                  <Icon
                    className={`w-[18px] h-[18px] shrink-0 transition-colors ${active ? 'text-accent' : 'text-white/55 group-hover:text-white'}`}
                  />
                  {/* right-edge active indicator (reserves space so rows don't shift) */}
                  <span
                    className={`absolute right-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-l-sm transition-colors ${active ? 'bg-accent' : 'bg-transparent'}`}
                  />
                </LocalLink>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
