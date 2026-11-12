'use client';

import { useTranslation } from "react-i18next";
import { LocalLink } from '@/i18n/locale';

const NotFound = () => {
  const { t } = useTranslation('static');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">{t('notFound.message')}</p>
        <LocalLink to="/" className="text-primary hover:text-primary/80 underline">
          {t('notFound.backHome')}
        </LocalLink>
      </div>
    </div>
  );
};

export default NotFound;
