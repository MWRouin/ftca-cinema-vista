
import { Moon, Sun, SunMoon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const getOpacityByTheme = (theme: string, targetTheme: string, minOpacity = 0, maxOpacity = 100) => {
  return theme === targetTheme ? `opacity-${maxOpacity}` : `opacity-${minOpacity}`
}

const getclassName = (theme: string, targetTheme: string, onDark = false, minOpacity = 0, maxOpacity = 100) => {
  return (
    "absolute w-5 h-5 group-hover:scale-110 transition-transform transition-opacity duration-200 "
    + (onDark ? "text-white " : "text-primary ")
    + getOpacityByTheme(theme, targetTheme, minOpacity, maxOpacity)
  )
}

const nextLabel: Record<string, string> = {
  light: 'dark',
  dark: 'system',
  system: 'light',
};

export function ThemeToggle({ onDark = false }: { onDark?: boolean }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors group bg-transparent"
      aria-label={`Switch to ${nextLabel[theme]} mode`}
      title={`Theme: ${theme}`}
    >
      <div className="relative w-5 h-5">
        <Sun className={getclassName(theme, 'light', onDark)} />
        <Moon className={getclassName(theme, 'dark', onDark)} />
        <SunMoon className={getclassName(theme, 'system', onDark)} />
      </div>
    </button>
  );
}
