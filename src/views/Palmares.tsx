'use client';

import { PageHeader } from '@/components/customUi/page-header'
import { PageContainer } from '@/components/customUi/page-container'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { LocalLink } from '@/i18n/locale'
import { ArrowLeft } from 'lucide-react'
import { publicUrl } from '@/lib/base-path'

/** A pointed leaf, 0..len along +x. */
const leaf = (len: number, w: number) => `M0,0 Q${len / 2},${-w} ${len},0 Q${len / 2},${w} 0,0Z`

/** One laurel branch: leaves in pairs along the left arc (from the bottom up,
 *  open at the top), mirrored for the right side. */
function LaurelBranch({ mirror }: { mirror?: boolean }) {
  const count = 8
  const leaves = Array.from({ length: count }, (_, i) => {
    const deg = 112 + (i * (246 - 112)) / (count - 1)
    const a = (deg * Math.PI) / 180
    const growth = deg + 90 // direction the branch grows in
    return { x: 100 + 78 * Math.cos(a), y: 100 + 78 * Math.sin(a), growth, size: 24 - i * 1.4 }
  })
  return (
    <g transform={mirror ? 'translate(200,0) scale(-1,1)' : undefined}>
      <path d="M70.8,172.3 A78,78 0 0 1 68.3,28.7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {leaves.map(({ x, y, growth, size }, i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <path d={leaf(size, 6)} transform={`rotate(${growth - 42})`} fill="currentColor" />
          <path d={leaf(size * 0.8, 5)} transform={`rotate(${growth + 38})`} fill="currentColor" opacity="0.8" />
        </g>
      ))}
    </g>
  )
}

export default function Palmares() {
  const { t } = useTranslation('static')
  return (
    <PageContainer className="pb-16">
        <PageHeader title={t('palmares.title')} subtitle={t('palmares.subtitle')} className="mb-4" />

        <div className="text-center space-y-8">
          {/* Decorative emblem: the trophy (in the site's wheat and green)
              framed by festival laurels. */}
          {/* The viewBox is cropped to the wreath (y 12–184), so the emblem
              adds no empty space above or below. The trophy's artwork is
              centred in its file, so y=52 puts it on the wreath's centre (100). */}
          <svg viewBox="0 12 200 172" className="w-52 mx-auto text-accent" aria-hidden>
            <LaurelBranch />
            <LaurelBranch mirror />
            <image href={publicUrl('palmares-trophy.svg')} x="52" y="52" width="96" height="96" />
          </svg>

          {/* Message */}
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {t('palmares.message')}
            <br /><br />
            <span className="font-display text-2xl font-medium italic text-foreground">{t('palmares.comingSoon')}</span>
          </p>

          {/* CTA */}
          <div className="space-x-4">
            <Button asChild>
              <LocalLink to="/"><ArrowLeft className="rtl:rotate-180" aria-hidden />{t('palmares.backHome')}</LocalLink>
            </Button>
          </div>

        </div>
    </PageContainer>
  )
}
