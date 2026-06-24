import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import './movie-player.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getMovieById, getRelatedMoviesByDirector, getRelatedMoviesByGenre } from '@/data/movies';
import { getCurrentLang } from '@/lib/metadata/html-lang';
import MetaHeader from '@/lib/metadata/metadata';
import { SITE_URL, SITE_NAME, SITE_NAME_FULL } from '@/lib/metadata/seo-constants';
import { ElementTitle } from '@/components/customUi/element-title';
import { LocalLink } from '@/i18n/locale';

export default function MoviePlayer() {
  const { id } = useParams();
  const { t } = useTranslation('movie');
  const movie = getMovieById(id);
  const relatedMoviesByDirector = movie ? getRelatedMoviesByDirector(movie, 3) : [];
  const relatedMoviesByGenre = movie ? getRelatedMoviesByGenre(movie, 3) : [];

  /* ---------- Language handling ---------- */

  //const [lang, setLang] = useState<string>(availableLanguages[0] || 'en');
  const [lang, setLang] = useState<string>(getCurrentLang() ?? 'en');

  useEffect(() => {
    /*if (availableLanguages.length) {
      setLang(availableLanguages[0]);
    }*/
    setLang(getCurrentLang() ?? 'en');
  }, [movie]);

  /* ---------- Not found ---------- */
  if (!movie) {
    return (
      <div className="min-h-screen py-12 flex items-center">
        <div className="max-w-3xl mx-auto px-4 w-full">
          <Card className="text-center">
            <CardHeader>
              <img
                src="/cinema-film-remove-svgrepo-com.svg"
                alt={t('notFoundAlt')}
                className="mx-auto mb-6 h-48 opacity-80"
              />
              <CardTitle>{t('notFoundTitle')}</CardTitle>
              <CardDescription>
                {t('notFoundDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <LocalLink to="/movies">{t('backToMovies')}</LocalLink>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <MetaHeader
        title={movie.title}
        description={movie.description?.[lang] || movie.description || `${movie.title} – Amateur film by ${movie.director}. ${SITE_NAME}.`}
        pagePathname={`movies/${movie.id}`}
        ogType="video.movie"
        imageUrl={movie.image?.startsWith('http') ? movie.image : `${SITE_URL}${movie.image}`}
        imageAlt={`${movie.title} – poster`}
        author={movie.director}
        authorLabel={t('directedByLabel')}
        lang={lang}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Movie",
          "name": movie.title,
          "description": movie.description?.[lang] || movie.description,
          "director": { "@type": "Person", "name": movie.director },
          "dateCreated": String(movie.year),
          "genre": movie.genre,
          "duration": movie.duration,
          "url": `${SITE_URL}/movies/${movie.id}`,
          "image": movie.image?.startsWith('http') ? movie.image : `${SITE_URL}${movie.image}`,
          "productionCompany": {
            "@type": "Organization",
            "name": SITE_NAME_FULL
          }
        }}
      />
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="outline">
            <LocalLink to="/movies">{t('backToMovies')}</LocalLink>
          </Button>
        </div>

        {/* Movie Header */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-8 mb-12">

          {/* Poster */}
          <div className="col-span-1 md:row-span-3">
            <div className="aspect-[2/3] overflow-hidden rounded-lg">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Title + Badges */}
          <div className="col-span-2 space-y-4">
            <ElementTitle title={movie.title} />
            <div className="flex flex-wrap gap-2">
              <Badge>{movie.genre}</Badge>
              <Badge variant="outline">{movie.year}</Badge>
              {movie.duration && <Badge variant="outline">{movie.duration}</Badge>}
            </div>
          </div>

          {/* Description + Language + Details */}
          <div className="col-span-3 md:col-span-2 space-y-6">
            {((movie as any).descriptions?.data?.[lang] ?? movie.description) && (
              <p
                key={lang}
                lang={lang}
                className="text-lg text-muted-foreground lang-fade-enter"
                aria-live="polite"
              >
                {(movie as any).descriptions?.data?.[lang] ?? movie.description}
              </p>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded text-xs ${lang === 'en'
                    ? 'bg-accent text-white'
                    : 'bg-muted hover:bg-muted/80'
                  }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('fr')}
                className={`px-2 py-1 rounded text-xs ${lang === 'fr'
                    ? 'bg-accent text-white'
                    : 'bg-muted hover:bg-muted/80'
                  }`}
              >
                FR
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('director')}</h3>
                <p className="text-muted-foreground">{movie.director}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('cast')}</h3>
                <p className="text-muted-foreground">
                  {movie.cast?.join(", ") || '—'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player — shown only when this movie is flagged playerVisible
            (independent of `public`, which controls listing). Minimal chrome so
            the player stands out: edge-to-edge on mobile, a clean rounded frame
            on larger screens. */}
        {movie.playerVisible && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{t('watchNow')}</h2>
            {/* -mx-4 cancels the page's px-4 so the player goes full-bleed on phones */}
            <div className="-mx-4 sm:mx-0">
              <div className="aspect-video w-full overflow-hidden bg-black shadow-2xl sm:rounded-xl sm:ring-1 sm:ring-border">
                {movie.movieUrl ? (
                  <iframe
                    src={movie.movieUrl}
                    title={movie.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    {t('noVideo')}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Related sections unchanged */}
        {relatedMoviesByDirector.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8">{t('moreFrom', { director: movie.director })}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-6 lg:gap-8 xl:gap-8">
              {relatedMoviesByDirector.map((relatedMovie) => (
                <Card key={relatedMovie.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <LocalLink to={`/movies/${relatedMovie.id}`}>
                    <div className="aspect-[2/3] overflow-hidden rounded-t-lg">
                      <img
                        src={relatedMovie.image}
                        alt={relatedMovie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{relatedMovie.title}</CardTitle>
                      <CardDescription>{t('directedBy', { director: relatedMovie.director })}</CardDescription>
                    </CardHeader>
                  </LocalLink>
                </Card>
              ))}
            </div>
          </section>
        )}

        {relatedMoviesByDirector.length === 0 && relatedMoviesByGenre.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8">{t('moreLike', { title: movie.title })}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-6 lg:gap-8 xl:gap-8">
              {relatedMoviesByGenre.map((relatedMovie) => (
                <Card key={relatedMovie.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <LocalLink to={`/movies/${relatedMovie.id}`}>
                    <div className="aspect-[2/3] overflow-hidden rounded-t-lg">
                      <img
                        src={relatedMovie.image}
                        alt={relatedMovie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{relatedMovie.title}</CardTitle>
                      <CardDescription>{t('directedBy', { director: relatedMovie.director })}</CardDescription>
                    </CardHeader>
                  </LocalLink>
                </Card>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
    </>
  );
}
