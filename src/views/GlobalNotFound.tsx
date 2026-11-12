'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { Layout } from '@/components/Layout';
import { dirForLocale, type Locale } from '@/i18n/config';
import { I18nProvider } from '@/i18n/provider';
import { localeForUrl } from '@/lib/locale-redirect';
import NotFound from './NotFound';

// The URL does not change while this page is shown, so there is nothing to subscribe to.
const subscribe = () => () => {};
const getServerLocale = (): Locale | null => null;

/**
 * Body of 404.html. That one file answers every unknown URL, so the static
 * HTML cannot know the language or which page was asked for: it is empty, and
 * the site shell and the right message are rendered once the URL can be read
 * in the browser.
 */
export default function GlobalNotFound() {
  const locale = useSyncExternalStore(subscribe, localeForUrl, getServerLocale);

  useEffect(() => {
    if (!locale) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = dirForLocale(locale);
  }, [locale]);

  if (!locale) return null;
  return (
    <I18nProvider locale={locale}>
      <Layout>
        <NotFound />
      </Layout>
    </I18nProvider>
  );
}
