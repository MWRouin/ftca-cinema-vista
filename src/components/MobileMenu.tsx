'use client';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, PanelTopClose, PanelTopOpen } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { Logo } from './Logo';
import { DRAWER_ROW_CLASS } from './drawer-row';
import { LocalLink } from '@/i18n/locale';
import { NAV_ITEMS } from '@/lib/site-nav';
import { cn } from '@/lib/utils';
import { useSwipeToClose } from '@/hooks/useSwipeToClose';
import { SocialLinks } from '@/components/customUi/social-links';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// The drawer's separators: wheat hairlines starting at the text's left edge and
// fading out to the right. Full-width rules read as hard edges, and centred
// ones look off against left-aligned text.
const Hairline = () => <div className="ml-6 mr-4 h-px bg-gradient-to-r from-accent/60 to-transparent" />;

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Classes of the menu button in the bar. */
  triggerClassName: string;
  /** Whether the navbar is set to hidden, and the button that flips it. */
  navHidden: boolean;
  onToggleNavHidden: () => void;
  isActive: (path: string) => boolean;
}

/**
 * The menu below lg: a drawer from the right (Radix dialog: focus trap,
 * Escape, scroll lock, focus back to the menu button) with the settings in
 * words, the pages, then the social links and the logo. Swipe right to close.
 */
export function MobileMenu({
  open,
  onOpenChange,
  triggerClassName,
  navHidden,
  onToggleNavHidden,
  isActive,
}: MobileMenuProps) {
  const { t } = useTranslation();
  const close = () => onOpenChange(false);
  const { swipedClosed, resetSwipe, handlers } = useSwipeToClose(close);
  // Set when "Hide the bar" closes the drawer: focus must not go back to the
  // menu button, inside the bar, or the bar would stay shown for it.
  const hidingFromDrawer = useRef(false);
  const HideIcon = navHidden ? PanelTopOpen : PanelTopClose;

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (next) resetSwipe();
        onOpenChange(next);
      }}
    >
      <SheetTrigger asChild>
        <button className={cn('lg:hidden', triggerClassName)} aria-label={t('a11y.toggleMenu')}>
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
        {...handlers}
        className={cn(
          'lg:hidden flex w-64 max-w-[80vw] flex-col gap-0 border-accent/30 bg-card dark:bg-background p-0',
          swipedClosed && 'data-[state=closed]:animate-none',
        )}
      >
        <SheetTitle className="sr-only">{t('a11y.menu')}</SheetTitle>
        {/* The settings, in words; the × sits right of the first row. */}
        <div className="flex flex-col items-start px-4 py-3">
          <LanguageToggle labeled />
          <ThemeToggle labeled />
          <button
            onClick={() => {
              hidingFromDrawer.current = !navHidden;
              onToggleNavHidden();
            }}
            className={DRAWER_ROW_CLASS}
          >
            <HideIcon className="w-5 h-5 text-brand" />
            <span>{t(navHidden ? 'a11y.showNavShort' : 'a11y.hideNavShort')}</span>
          </button>
        </div>
        <Hairline />
        {/* The pages, underlined like the bar's links */}
        <nav className="flex flex-1 flex-col items-start overflow-y-auto py-3">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <LocalLink
                key={item.key}
                to={item.path}
                onClick={close}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'nav-link nav-menu-item ml-2 text-lg font-semibold focus-cinema',
                  active ? 'text-brand active' : 'text-foreground/80 hover:text-brand',
                )}
              >
                {t(`nav.${item.key}`)}
              </LocalLink>
            );
          })}
        </nav>
        {/* Sign-off: the social links and the club's logo (home) */}
        <Hairline />
        <div className="flex items-center justify-between py-3 pl-4 pr-5">
          <SocialLinks variant="chip" className="space-x-1" />
          <LocalLink to="/" onClick={close} aria-label={t('a11y.homeLink')}>
            <Logo size={44} />
          </LocalLink>
        </div>
      </SheetContent>
    </Sheet>
  );
}
