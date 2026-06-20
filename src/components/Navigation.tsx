
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  const scrolled = scrollY > 20;
  // On the home page the navbar overlays the hero transparently until the
  // hero's bottom edge has scrolled up behind the navbar. We measure the
  // actual hero element (re-evaluated each scroll-driven render) so the
  // switch tracks the real hero height instead of a fixed viewport guess.
  const overlay = isHome && (() => {
    if (typeof window === 'undefined') return true;
    const hero = document.querySelector('.editorial-hero');
    const navHeight = 64; // h-16
    if (hero) return hero.getBoundingClientRect().bottom > navHeight;
    return scrollY < window.innerHeight * 0.8;
  })();

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
    <>
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${overlay
      ? 'bg-transparent text-white'
      : scrolled
        ? 'bg-background/98 backdrop-blur-xl shadow-lg border-b border-border/30'
        : 'bg-background/90 backdrop-blur-md border-b border-border/30'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-16 flex items-center">
          {/* Logo (left) */}
          <div className="flex items-center p-2">
            <Link to="/" className="flex items-center space-x-3">
              <Logo
                size={50}
                className="hover:scale-110 transition-transform drop-shadow-lg"
                {...(overlay ? { colorMain: '#fff', colorBack: '#7b828d', colorFront: '#cbd1ce' } : {})}
              />
            </Link>
          </div>

          {/* Desktop Navigation (centered on md+) */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-2">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link text-sm font-medium transition-all duration-300 focus-cinema ${isActive(item.path)
                  ? overlay
                    ? 'text-white active' // active over hero: white stays legible
                    : 'text-primary active' // keep underline via .active, remove bg/border
                  : overlay
                    ? 'text-white/90 hover:text-white'
                    : 'text-foreground/80 hover:text-primary'
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
              <ThemeToggle onDark={overlay} />
            </div>

            {/* Mobile: Theme toggle + menu button (unchanged behavior) */}
            <div className="md:hidden flex items-center space-x-3">
              <ThemeToggle onDark={overlay} />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors group ${overlay
                  ? 'bg-transparent'
                  : 'bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30'
                  }`}
                aria-label="Toggle menu"
              >
                <Menu className={`w-5 h-5 group-hover:scale-110 transition-transform duration-300 ${overlay ? 'text-white' : 'text-primary'} ${isOpen ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

      {/* Mobile Navigation — rendered OUTSIDE <nav> on purpose: the nav has
          its own backdrop-filter off-hero, which would suppress this panel's
          backdrop-blur and make the blur appear only over the hero. */}
      <div
        className={
          `md:hidden fixed top-16 right-3 z-40 w-52 transition-all duration-200 ${isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'}`
        }
      >
        <div className="border border-white/15 shadow-xl backdrop-blur-2xl bg-black/50">
          <div className="px-2 py-3 max-h-[calc(100vh-5rem)] overflow-y-auto flex flex-col items-end text-right gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link nav-link-dark text-lg font-medium transition-all duration-300 focus-cinema ${isActive(item.path)
                  ? 'text-white active'
                  : 'text-white/90 hover:text-white'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
