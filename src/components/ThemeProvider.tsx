'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';
type ResolvedTheme = 'dark' | 'light';

interface ThemeProviderContextType {
  theme: Theme;
  // The actual theme applied to the document, with 'system' resolved to the OS preference.
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // The first render must match the server's HTML, which cannot know the saved
  // theme or the OS preference. So start from fixed values and read the real
  // ones after mount (the inline ThemeScript has already set the page class,
  // so there is no visual flash).
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTheme((localStorage.getItem('theme') as Theme) || 'system');
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const applied = theme === 'system' ? getSystemTheme() : theme;
    setResolvedTheme(applied);

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(applied);
    localStorage.setItem('theme', theme);
  }, [theme, ready]);

  // Keep the document in sync when the OS preference changes while in 'system' mode.
  useEffect(() => {
    if (!ready || theme !== 'system') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const applied = getSystemTheme();
      setResolvedTheme(applied);
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(applied);
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [theme, ready]);

  // Cycle through light -> dark -> system.
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light');
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
