'use client';

import { THEME_SCRIPT } from '@/lib/theme-script';

/**
 * Applies the saved theme before first paint. The server render emits a real
 * inline <script> in <head>; on a client re-render (language switch, hot reload)
 * React would warn about a script it cannot run, so there the type becomes
 * text/template, which is inert and harmless because the class is already set.
 */
export function ThemeScript() {
  return (
    <script
      suppressHydrationWarning
      type={typeof window === 'undefined' ? undefined : 'text/template'}
      dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
    />
  );
}
