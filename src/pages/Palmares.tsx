import { PageTitle } from '@/components/customUi/page-title'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import MetaHeader from '@/lib/metadata/metadata'
import { PAGE_SEO } from '@/lib/metadata/seo-constants'
import { LocalLink } from '@/i18n/locale'

export default function Palmares() {
  const { t } = useTranslation('static')
  const BASE = import.meta.env.BASE_URL || "/"
  return (
    <>
      <MetaHeader {...PAGE_SEO.palmares} />
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <PageTitle title={t('palmares.title')}/>
          <div className="section-divider w-24 mx-auto mb-8"></div>
          <div className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t('palmares.subtitle')}
          </div>
        </div>

        <div className="text-center space-y-12">
          {/* Trophy — Twemoji SVG (same image across all browsers) */}
          <img
            src={`${BASE}palmares-trophy.svg`}
            alt={t('palmares.trophyAlt')}
            className="w-44 h-44 mx-auto drop-shadow-md"
            width={176}
            height={176}
          />

          {/* Message */}
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {t('palmares.message')}
            <br /><br />
            <span className="italic">{t('palmares.comingSoon')}</span>
          </p>

          {/* CTA */}
          <div className="space-x-4">
            <Button asChild>
              <LocalLink to="/">{t('palmares.backHome')}</LocalLink>
            </Button>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}
