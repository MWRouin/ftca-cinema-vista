
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-secondary hover:bg-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun className={`absolute w-5 h-5 transition-opacity duration-200 ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`} />
        <Moon className={`absolute w-5 h-5 transition-opacity duration-200 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </button>
  );
}
