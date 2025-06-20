
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

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
    { name: 'Home', path: '/ftca-hammemlif/' },
    { name: 'Movies', path: '/ftca-hammemlif/movies' },
    { name: 'Events', path: '/ftca-hammemlif/events' },
    { name: 'Blog', path: '/ftca-hammemlif/blog' },
    { name: 'About', path: '/ftca-hammemlif/about' },
    { name: 'Contact', path: '/ftca-hammemlif/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/50' 
        : 'bg-background/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover-glow group transition-all duration-300"
          >
            <div className="w-10 h-10 gradient-cinema rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg">FC</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                FTCA Hammemlif
              </span>
              <div className="text-xs text-muted-foreground tracking-wide">
                Where Cinema Comes Alive
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-accent/50 focus-cinema ${
                  isActive(item.path) 
                    ? 'text-primary active bg-primary/10' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
              </Link>
            ))}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-all duration-300 hover:bg-accent focus-cinema ${
                isOpen ? 'bg-accent' : ''
              }`}
              aria-label="Toggle menu"
            >
              <Menu className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-4 space-y-1 card-cinema rounded-lg mt-2 mb-4">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10 border-l-2 border-primary'
                    : 'text-muted-foreground hover:text-primary hover:bg-accent/50'
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
