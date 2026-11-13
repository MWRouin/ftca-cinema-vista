'use client';

import { Button } from '@/components/ui/button';
import { Trans, useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { getMovies } from '@/data/movies';
import { PageTitle } from '@/components/customUi/page-title';
import { MovieCard } from '@/components/customUi/movie-card';
import { LocalLink } from '@/i18n/locale';
import './home-hero.css';
import { publicUrl } from '@/lib/base-path';

export default function Home() {
  const { t } = useTranslation('home');
  const moviesRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();

  const featuredMovies = getMovies().slice(0, 4);

  return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section
          className="editorial-hero"
          style={{
            ["--hero-bg-image" as string]: `url(${publicUrl('Backgrounds/hero-image-hlif.jpg')})`,
          }}
        >
          <div className="grain"></div>

          <div className="container">
            <div className="content">

              <div className="eyebrow">
                <span className="eyebrow-text">
                  <span className="eyebrow-seg">{t('hero.eyebrowAmateur')}</span>
                  <span className="eyebrow-sep" aria-hidden="true">·</span>
                  <span className="eyebrow-seg">{t('hero.eyebrowSince')}</span>
                </span>
              </div>

              <h1>
                <span className="line">{t('hero.titleLine1')}</span>
                <span className="line">{t('hero.titleLine2')}</span>
                <span className="line accent">{t('hero.titleLine3')}</span>
              </h1>

              <p className="tagline">
                {t('hero.tagline')}
              </p>

              <p className="description">
                <Trans t={t} i18nKey="hero.description" components={{ strong: <strong /> }} />
              </p>

              <div className="quote">
                {t('hero.quote')}
              </div>

              <div className="actions">
                <LocalLink to="/about" className="btn btn-primary">
                  {t('hero.ctaStory')} <span className="arrow">&rarr;</span>
                </LocalLink>
                <LocalLink to="/movies" className="btn btn-secondary">
                  {t('hero.ctaFilms')} <span className="arrow">&rarr;</span>
                </LocalLink>
              </div>

            </div>

            <div className="side-note">
              {t('hero.sideNote')}
            </div>
          </div>

          <div className="credits">
            <span className="key">1964</span>
            <span>Hammam-Lif</span>
            <span>{t('hero.creditTunisia')}</span>
            <span>FTCA</span>
            <span>{t('hero.creditYears')}</span>
          </div>
        </section>

        {/* Featured Movies */}
        <section
          ref={moviesRef}
          className="py-20 lg:py-28 animate-on-scroll"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <PageTitle as="h2" title={t('films.title')} />
              <div className="section-divider w-24 mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground">{t('films.subtitle')}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6 lg:gap-8 xl:gap-8">
              {featuredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <div className="text-center mt-16">
              <Button asChild variant="outline" className="btn-cinema text-primary-foreground border-primary/30 hover:bg-primary/10 hover-lift">
                <LocalLink to="/movies">{t('films.viewAll')}</LocalLink>
              </Button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section
          ref={ctaRef}
          className="py-20 lg:py-28 animate-on-scroll relative overflow-hidden"
        >
          <div className="absolute inset-0 gradient-dark"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>

          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
            <PageTitle as="h2" title={t('cta.title')} />
            <div className="section-divider w-24 mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              {t('cta.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="btn-cinema hover-lift text-lg px-8 py-4">
                <LocalLink to="/contact">{t('cta.getInTouch')}</LocalLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/30 hover-lift text-lg px-8 py-4">
                <LocalLink to="/about">{t('cta.learnMore')}</LocalLink>
              </Button>
            </div>
          </div>
        </section>
      </div>
  );
}
