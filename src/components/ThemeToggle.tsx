
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const getOpacityByTheme = (theme: string, targetTheme: string, minOpacity = 0, maxOpacity = 100) => {
  return theme === targetTheme ? `opacity-${maxOpacity}` : `opacity-${minOpacity}`
}

const getclassName = (theme: string, targetTheme: string, minOpacity = 0, maxOpacity = 100) => {
  return (
    "absolute w-5 h-5 text-primary group-hover:scale-110 transition-transform transition-opacity duration-200 "
    + getOpacityByTheme(theme, targetTheme, minOpacity, maxOpacity)
  )
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      //className="relative p-2 rounded-lg bg-secondary hover:bg-accent transition-colors duration-200 focus-cinema"
      className="w-9 h-9 bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 rounded-lg flex items-center justify-center transition-colors group"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun className={getclassName(theme, 'light')} />
        <Moon className={getclassName(theme, 'dark')} />
      </div>
    </button>
  );
}
