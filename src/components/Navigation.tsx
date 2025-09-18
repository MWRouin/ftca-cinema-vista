
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
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover-glow group transition-all duration-300 rounded-lg p-2"
          >
            <div className="hover-lift group-hover:scale-105 transition-all duration-300">
              <Logo size={40} className="drop-shadow-lg" />
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
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link text-sm font-medium transition-all duration-300 focus-cinema ${
                  isActive(item.path) 
                    ? 'text-primary active bg-primary/10 border border-primary/20' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
              </Link>
            ))}
            <div className="ml-4 pl-4 border-l border-border">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
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
