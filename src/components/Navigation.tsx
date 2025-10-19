
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'Events', path: '/events' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Palmarès', path: '/palmares' },
    { name: 'Contact', path: '/contact' },
  ];

  const normalize = (p: string) => (p.endsWith('/') && p !== '/' ? p.slice(0, -1) : p);
  const isActive = (path: string) => normalize(location.pathname) === normalize(path);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 border-b ${
      scrolled 
        ? 'bg-background/98 backdrop-blur-xl shadow-lg border-border' 
        : 'bg-background/90 backdrop-blur-md border-border/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-16 flex items-center">
          {/* Logo (left) */}
          <div className="flex items-center p-2">
            <Link to="/" className="flex items-center space-x-3">
              <Logo size={50} className="drop-shadow-lg" />
            </Link>
          </div>

          {/* Desktop Navigation (centered on md+) */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-2">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link text-sm font-medium transition-all duration-300 focus-cinema ${
                  isActive(item.path)
                    ? 'text-primary active' // keep underline via .active, remove bg/border
                    : 'text-muted-foreground hover:text-primary'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side actions: Theme toggle (desktop) and mobile controls */}
          <div className="ml-auto flex items-center space-x-3">
            {/* Theme toggle: visible on md and hidden on small screens within this slot (mobile keeps its own toggle) */}
            <div className="hidden md:flex">
              <ThemeToggle />
            </div>

            {/* Mobile: Theme toggle + menu button (unchanged behavior) */}
            <div className="md:hidden flex items-center space-x-3">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg transition-all duration-300 border border-border/30 hover:bg-accent hover:border-border focus-cinema ${
                  isOpen ? 'bg-accent border-border' : ''
                }`}
                aria-label="Toggle menu"
              >
                <Menu className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-4 space-y-1 card-cinema rounded-lg mt-2 mb-4 border border-border/50">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 border ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10 border-primary/20'
                    : 'text-muted-foreground hover:text-primary hover:bg-accent/50 border-transparent hover:border-border/30'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
