'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { PanelTopClose, PanelTopOpen } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { LocalLink } from '@/i18n/locale';
import { stripLocale } from '@/i18n/config';
import { NAV_ITEMS } from '@/lib/site-nav';
import { setNavHidden, useNavHidden } from '@/lib/nav-hidden';
import { cn } from '@/lib/utils';
import { useNavScroll } from '@/hooks/useNavScroll';

const normalize = (p: string) => (p.endsWith('/') && p !== '/' ? p.slice(0, -1) : p);

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const hidden = useNavHidden();
  const pathname = usePathname();
  const { t } = useTranslation();
  const path = stripLocale(pathname);
  const isHome = path === '/';
  const { scrolled, overlay, revealed, conceal } = useNavScroll(isHome);
  // Hidden, the bar slides up out of view and comes back while it is revealed
  // (see useNavScroll), the pointer is on its strip (a tap on touch screens)
  // or a keyboard user tabs into it; an open menu keeps it shown.
  const tucked = hidden && !isOpen && !revealed;

  // The drawer exists below lg only: widening the window past it closes the
  // drawer, or its backdrop would stay over the page.
  useEffect(() => {
    if (!isOpen) return;
    const wide = window.matchMedia('(min-width: 1024px)');
    const onChange = () => { if (wide.matches) setIsOpen(false); };
    wide.addEventListener('change', onChange);
    return () => wide.removeEventListener('change', onChange);
  }, [isOpen]);

  // Hiding takes effect even if the last scroll was upwards; hiding from the
  // drawer closes it, so the bar can go.
  const toggleNavHidden = () => {
    if (!hidden) conceal();
    setNavHidden(!hidden);
    setIsOpen(false);
  };
  const HideIcon = hidden ? PanelTopOpen : PanelTopClose;
  const iconButton = cn(
    'w-9 h-9 rounded-lg flex items-center justify-center bg-transparent group',
    overlay ? 'text-white' : 'text-brand',
  );
  const isActive = (target: string) => normalize(path) === normalize(target);

  return (
    // The navbar's strip: the hover area that brings a hidden bar back.
    <div className="group/nav fixed top-0 inset-x-0 z-50 h-16">
      <nav
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b',
          overlay
            ? 'bg-transparent text-white border-transparent'
            : ['bg-background/90 border-border/30', scrolled && (tucked ? 'group-hover/nav:shadow-lg' : 'shadow-lg')],
          tucked && '-translate-y-full group-hover/nav:translate-y-0 group-has-[:focus-visible]/nav:translate-y-0',
        )}
      >
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

            {/* Desktop links (centred, lg+) */}
            <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-2">
              {NAV_ITEMS.map((item, index) => {
                const active = isActive(item.path);
                return (
                  <LocalLink
                    key={item.key}
                    to={item.path}
                    className={cn(
                      'nav-link text-base font-semibold whitespace-nowrap transition-all duration-300 focus-cinema',
                      overlay && 'nav-overlay',
                      // Over the hero the links stay white to remain legible;
                      // `.active` keeps the underline.
                      overlay
                        ? active ? 'text-white active' : 'text-white/90 hover:text-white'
                        : active ? 'text-brand active' : 'text-foreground/80 hover:text-brand',
                    )}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {t(`nav.${item.key}`)}
                  </LocalLink>
                );
              })}
            </div>

            {/* Right side: the settings on lg+, the menu button below lg */}
            <div className="ml-auto flex items-center space-x-2">
              <div className="hidden lg:flex items-center space-x-2">
                <LanguageToggle onDark={overlay} />
                <ThemeToggle onDark={overlay} />
                <button
                  onClick={toggleNavHidden}
                  className={iconButton}
                  aria-label={t(hidden ? 'a11y.showNav' : 'a11y.hideNav')}
                  title={t(hidden ? 'a11y.showNav' : 'a11y.hideNav')}
                >
                  <HideIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
              <MobileMenu
                open={isOpen}
                onOpenChange={setIsOpen}
                triggerClassName={iconButton}
                navHidden={hidden}
                onToggleNavHidden={toggleNavHidden}
                isActive={isActive}
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
