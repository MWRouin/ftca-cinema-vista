
import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col ">
      <Navigation />
      <main className="flex-1">{/* <main className="flex-1 bg-texture"> */}
        {children}
      </main>
      <Footer />
    </div>
  );
}
