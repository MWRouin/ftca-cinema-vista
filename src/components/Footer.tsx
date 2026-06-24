import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Logo } from './Logo';
import { LocalLink } from '@/i18n/locale';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { key: 'home', path: '/' },
    { key: 'movies', path: '/movies' },
    { key: 'events', path: '/events' },
    { key: 'blog', path: '/blog' },
    { key: 'contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/ftcahamhama/', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/ftca.hlif/', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@ftcahammamlif', label: 'YouTube' },
  ];

  return (
    <footer className="relative mt-auto border-t border-border bg-secondary dark:bg-muted">
      {/* Designed top edge: a faint accent line so the footer reads as a
          distinct base rather than a continuation of the page. */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Club Info */}
          <div className="md:col-span-2">
            <LocalLink to="/" className="flex items-center space-x-3 mb-4">
              <Logo size={40} className="drop-shadow-lg" />
              <div>
                <h3 className="font-bold text-lg">{t('footer.clubName')}</h3>
                <p className="text-sm text-muted-foreground">{t('footer.tagline')}</p>
              </div>
            </LocalLink>
            <p className="text-muted-foreground mb-4 max-w-md">
              {t('footer.mission')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 rounded-lg flex items-center justify-center transition-colors group"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <LocalLink
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(`nav.${link.key}`)}
                  </LocalLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">{t('footer.contact')}</h4>
            <div className="space-y-2">
              <a
                href="mailto:contact@cineamateur-hlif.com"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">contact@cineamateur-hlif.com</span>
              </a>
              <a
                href="tel:+21655466297"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+216 55 466 297</span>
              </a>
              <a
                href="https://www.google.com/maps/place/80+RN1,+Hammam-Lif/@36.7269597,10.3343537,636m/data=!3m1!1e3!4m6!3m5!1s0x12fd492504981c43:0x7772fc5d93b2f677!8m2!3d36.7270195!4d10.336157!16s%2Fg%2F11bw43n7d7?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View location on Google Maps"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm">80 RN1, Hammam-Lif</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/70 mt-10 pt-6 flex flex-col lg:flex-row justify-between items-center text-center lg:text-left gap-2">
          <p className="text-sm text-muted-foreground">
            {t('footer.rights', { year: currentYear })}
          </p>
          <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
            {t('footer.critique')}
          </p>
        </div>
      </div>
    </footer>
  );
}
