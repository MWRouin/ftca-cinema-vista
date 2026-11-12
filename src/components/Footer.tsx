import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Logo } from './Logo';
import { SocialLinks } from '@/components/customUi/social-links';
import { LocalLink } from '@/i18n/locale';
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_MAPS_URL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
} from '@/lib/contact';

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
            <SocialLinks variant="chip" />
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
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">{CONTACT_EMAIL}</span>
              </a>
              <a
                href={CONTACT_PHONE_HREF}
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">{CONTACT_PHONE}</span>
              </a>
              <a
                href={CONTACT_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('a11y.viewOnMaps')}
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{CONTACT_ADDRESS}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/70 mt-10 pt-6 flex flex-col lg:flex-row justify-between items-center text-center lg:text-left gap-2">
          {/* The year in the prerendered HTML is the build's; a page loaded after
              New Year would otherwise fail hydration on this text. */}
          <p className="text-sm text-muted-foreground" suppressHydrationWarning>
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
