import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Logo } from './Logo';
import { SocialLinks } from '@/components/customUi/social-links';
import { LocalLink } from '@/i18n/locale';
import { NAV_ITEMS } from '@/lib/site-nav';
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_MAPS_URL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  FEDERATION_URL,
} from '@/lib/contact';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-border bg-secondary dark:bg-muted">
      {/* Designed top edge: a faint accent line so the footer reads as a
          distinct base rather than a continuation of the page. */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Three blocks with equal space between them on large screens
            (justify-between over content-sized columns); on tablets the club
            text takes the first row. */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[minmax(0,30rem)_auto_auto] lg:justify-between lg:gap-12">
          {/* Club Info */}
          <div className="md:col-span-2 lg:col-span-1">
            <LocalLink to="/" className="flex items-center space-x-3 mb-4">
              <Logo size={40} className="drop-shadow-lg" />
              <div>
                <p className="font-display text-xl font-semibold leading-tight">{t('footer.clubName')}</p>
                <p className="text-sm text-muted-foreground">{t('footer.tagline')}</p>
              </div>
            </LocalLink>
            <p className="text-muted-foreground max-w-md">
              {t('footer.mission')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">{t('footer.quickLinks')}</h2>
            {/* Two columns of four, filled top to bottom. */}
            <ul className="grid grid-flow-col grid-rows-4 gap-x-8 gap-y-2">
              {NAV_ITEMS.map((link) => (
                <li key={link.key}>
                  <LocalLink
                    to={link.path}
                    className="text-muted-foreground hover:text-brand transition-colors"
                  >
                    {t(`nav.${link.key}`)}
                  </LocalLink>
                </li>
              ))}
              <li>
                <a
                  href={FEDERATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-brand transition-colors"
                >
                  {t('footer.federation')}
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">{t('footer.contact')}</h2>
            <div className="space-y-2">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center space-x-2 text-muted-foreground hover:text-brand transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">{CONTACT_EMAIL}</span>
              </a>
              <a
                href={CONTACT_PHONE_HREF}
                className="flex items-center space-x-2 text-muted-foreground hover:text-brand transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">{CONTACT_PHONE}</span>
              </a>
              <a
                href={CONTACT_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('a11y.viewOnMaps')}
                className="flex items-center space-x-2 text-muted-foreground hover:text-brand transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{CONTACT_ADDRESS}</span>
              </a>
            </div>
            {/* -ml-2: the icons sit centred in 36px tap targets; this lines
                the first one up with the contact icons above. */}
            <SocialLinks variant="chip" className="mt-4 -ml-2" />
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
