'use client';

import { Moon, Sun, SunMoon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';
import { DRAWER_ROW_CLASS } from './drawer-row';

const ICONS = { light: Sun, dark: Moon, system: SunMoon } as const;

// The toggle cycles light -> dark -> system (see ThemeProvider.toggleTheme).
const NEXT_THEME = { light: 'dark', dark: 'system', system: 'light' } as const;

/** `labeled`: a row with the current theme in words (the mobile drawer). */
export function ThemeToggle({ onDark = false, labeled = false }: { onDark?: boolean; labeled?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  if (labeled) {
    const Icon = ICONS[theme];
    return (
      <button onClick={toggleTheme} className={DRAWER_ROW_CLASS}>
        <Icon className="w-5 h-5 text-brand" />
        <span>{t('theme.current', { mode: t(`theme.${theme}`) })}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors group bg-transparent"
      aria-label={t('theme.switchTo', { mode: t(`theme.${NEXT_THEME[theme]}`) })}
      title={t('theme.current', { mode: t(`theme.${theme}`) })}
    >
      <div className="relative w-5 h-5">
        {Object.entries(ICONS).map(([name, Icon]) => (
          <Icon
            key={name}
            className={cn(
              'absolute w-5 h-5 group-hover:scale-110 transition-[transform,opacity] duration-200',
              onDark ? 'text-white' : 'text-brand',
              theme === name ? 'opacity-100' : 'opacity-0'
            )}
          />
        ))}
      </div>
    </button>
  );
}
