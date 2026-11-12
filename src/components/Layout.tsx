'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { NavigationProgress } from './NavigationProgress';
import { stripLocale } from '@/i18n/config';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // The navbar is fixed (out of flow). The home hero sits under it full-bleed,
  // every other page needs top padding so content clears the navbar.
  const isHome = stripLocale(usePathname()) === '/';
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col ">
      <NavigationProgress />
      <Navigation />
      <main className={`flex-1 ${isHome ? '' : 'pt-16'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
