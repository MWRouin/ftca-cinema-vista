'use client';

import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocalLink } from '@/i18n/locale';

// Laid out in the hero's vocabulary: a tracked eyebrow with wheat hairlines,
// the display title, one solid button.
const NotFound = () => {
  const { t } = useTranslation('static');

  return (
    <div className="flex items-center justify-center px-4 pt-16 pb-32">
      <div className="text-center">
        <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-10 bg-accent" aria-hidden />
          404
          <span className="h-px w-10 bg-accent" aria-hidden />
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand mb-10">
          {t('notFound.message')}
        </h1>
        <Button asChild>
          <LocalLink to="/">
            <ArrowLeft className="rtl:rotate-180" aria-hidden />
            {t('notFound.backHome')}
          </LocalLink>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
