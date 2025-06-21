import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/ftca-cinema-vista/' },
    { name: 'Movies', path: '/ftca-cinema-vista/movies' },
    { name: 'Events', path: '/ftca-cinema-vista/events' },
    { name: 'Blog', path: '/ftca-cinema-vista/blog' },
    { name: 'Contact', path: '/ftca-cinema-vista/contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-muted/50 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Club Info */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <Logo size={40} className="drop-shadow-lg" />
              <div>
                <h3 className="font-bold text-lg">FTCA Hammemlif</h3>
                <p className="text-sm text-muted-foreground">Where Cinema Comes Alive</p>
              </div>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              A passionate community of film enthusiasts celebrating the art of cinema through 
              screenings, discussions, and shared experiences that bring stories to life.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors group"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <a
                href="mailto:contact@ftcahammemlif.org"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">contact@ftcahammemlif.org</span>
              </a>
              <a
                href="tel:+216-XX-XXX-XXX"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+216 XX XXX XXX</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} FTCA Hammemlif – All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
            Made with ❤️ for cinema lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
