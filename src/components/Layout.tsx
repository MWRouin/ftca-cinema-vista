'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { NavigationProgress } from './NavigationProgress';
import { stripLocale } from '@/i18n/config';
import { recordPage } from '@/lib/back-navigation';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // The navbar is fixed (out of flow). The home hero sits under it full-bleed,
  // every other page needs top padding so content clears the navbar.
  const pathname = usePathname();
  const isHome = stripLocale(pathname) === '/';
  const { t } = useTranslation();

  // Lets BackButton tell whether the visitor came from another page of the site.
  useEffect(() => recordPage(pathname), [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col ">
      {/* First tab stop: lets keyboard users jump past the navbar. With JS it
          only moves focus, without adding a #content history entry (which
          BackButton's step back would land on). */}
      <a
        href="#content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('content')?.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg focus:ring-2 focus:ring-ring"
      >
        {t('a11y.skipToContent')}
      </a>
      <NavigationProgress />
      <Navigation />
      <main id="content" tabIndex={-1} className={`flex-1 outline-none ${isHome ? '' : 'pt-16'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
