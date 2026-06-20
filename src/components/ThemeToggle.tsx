
import { Moon, Sun } from 'lucide-react';
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

export function ThemeToggle({ onDark = false }: { onDark?: boolean }) {
  const { theme, toggleTheme } = useTheme();

  // Over the hero the navbar is transparent on a dark-tinted photo, so the
  // toggle needs light colors to stay visible regardless of the active theme.
  const buttonClass = onDark
    ? "bg-transparent"
    : "bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30";

  return (
    <button
      onClick={toggleTheme}
      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors group ${buttonClass}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun className={getclassName(theme, 'light', onDark)} />
        <Moon className={getclassName(theme, 'dark', onDark)} />
      </div>
    </button>
  );
}
