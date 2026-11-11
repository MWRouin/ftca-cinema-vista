import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import MetaHeader from '@/lib/metadata/metadata';
import { PAGE_SEO } from '@/lib/metadata/seo-constants';
import { LocalLink } from '@/i18n/locale';

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation('static');

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <MetaHeader {...PAGE_SEO["404"]} />
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">{t('notFound.message')}</p>
        <LocalLink to="/" className="text-blue-500 hover:text-blue-700 underline">
          {t('notFound.backHome')}
        </LocalLink>
      </div>
    </div>
    </>
  );
};

export default NotFound;
