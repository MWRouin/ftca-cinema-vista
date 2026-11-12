'use client';

import React, { useLayoutEffect, useSyncExternalStore } from 'react';

type Theme = 'dark' | 'light' | 'system';
type ResolvedTheme = 'dark' | 'light';

const STORAGE_KEY = 'theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

// The theme is kept outside React: it belongs to the visitor, not to a
// component, and the whole tree remounts on a language switch (the locale
// segment owns <html>). The saved choice lives in localStorage; this copy is
// only used when storage is unavailable (private mode).
let fallbackTheme: Theme = 'system';
const listeners = new Set<() => void>();

const isTheme = (value: unknown): value is Theme =>
  value === 'light' || value === 'dark' || value === 'system';

const readTheme = (): Theme => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isTheme(saved) ? saved : 'system';
  } catch {
    return fallbackTheme;
  }
};

const readSystemTheme = (): ResolvedTheme =>
  window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';

const writeTheme = (theme: Theme) => {
  fallbackTheme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage unavailable (private mode); the choice lasts for this visit */
  }
  listeners.forEach((listener) => listener());
};

// Notifies on a theme change here, in another tab, or in the OS preference.
const subscribe = (listener: () => void) => {
  const media = window.matchMedia(DARK_QUERY);
  listeners.add(listener);
  media.addEventListener('change', listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    media.removeEventListener('change', listener);
    window.removeEventListener('storage', listener);
  };
};

// The server cannot know the saved theme or the OS preference, so the static
// HTML is rendered with these and the real values take over after hydration.
const getServerTheme = (): Theme => 'system';
const getServerSystemTheme = (): ResolvedTheme => 'dark';

// Reads the store directly instead of taking the hook's values: while
// hydrating, those are still the server's.
const applyThemeClass = () => {
  const theme = readTheme();
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme === 'system' ? readSystemTheme() : theme);
};

export const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, readTheme, getServerTheme);
  const systemTheme = useSyncExternalStore(subscribe, readSystemTheme, getServerSystemTheme);

  return {
    theme,
    // The actual theme applied to the document, with 'system' resolved to the OS preference.
    resolvedTheme: theme === 'system' ? systemTheme : theme,
    setTheme: writeTheme,
    // Cycle through light -> dark -> system.
    toggleTheme: () =>
      writeTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'),
  };
};

/** Keeps the `light`/`dark` class on <html> in sync with the theme. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  // A layout effect, so the class is in place before the browser paints. The
  // inline theme script sets it on page load, but React resets the attributes
  // of <html> when the tree remounts on a language switch, and an effect that
  // ran after paint would show one frame of the wrong theme.
  useLayoutEffect(applyThemeClass, [resolvedTheme]);

  return <>{children}</>;
}
