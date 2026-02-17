import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import './movie-player.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getMovieById, getRelatedMoviesByDirector, getRelatedMoviesByGenre } from '@/data/movies';
import { PageTitle } from '@/components/customUi/page-title';
import { getCurrentLang } from '@/lib/metadata/html-lang';

export default function MoviePlayer() {
  const { id } = useParams();
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
                alt="Movie not found"
                className="mx-auto mb-6 h-48 opacity-80"
              />
              <CardTitle>Movie not found</CardTitle>
              <CardDescription>
                The movie you are looking for does not exist.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link to="/movies">← Back to Movies</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="outline">
            <Link to="/movies">← Back to Movies</Link>
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
            <PageTitle title={movie.title} titleLevel={2} />
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
                <h3 className="text-lg font-semibold mb-2">Director</h3>
                <p className="text-muted-foreground">{movie.director}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Cast</h3>
                <p className="text-muted-foreground">
                  {movie.cast?.join(", ") || '—'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Watch Now</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                {movie.movieUrl ? (
                  <iframe
                    src={movie.movieUrl}
                    title={movie.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No video available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related sections unchanged */}
        {relatedMoviesByDirector.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8">More from {movie.director}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-6 lg:gap-8 xl:gap-8">
              {relatedMoviesByDirector.map((relatedMovie) => (
                <Card key={relatedMovie.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <Link to={`/movies/${relatedMovie.id}`}>
                    <div className="aspect-[2/3] overflow-hidden rounded-t-lg">
                      <img
                        src={relatedMovie.image}
                        alt={relatedMovie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{relatedMovie.title}</CardTitle>
                      <CardDescription>Directed by {relatedMovie.director}</CardDescription>
                    </CardHeader>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        )}

        {relatedMoviesByDirector.length === 0 && relatedMoviesByGenre.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8">More like "{movie.title}"</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-6 lg:gap-8 xl:gap-8">
              {relatedMoviesByGenre.map((relatedMovie) => (
                <Card key={relatedMovie.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <Link to={`/movies/${relatedMovie.id}`}>
                    <div className="aspect-[2/3] overflow-hidden rounded-t-lg">
                      <img
                        src={relatedMovie.image}
                        alt={relatedMovie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{relatedMovie.title}</CardTitle>
                      <CardDescription>Directed by {relatedMovie.director}</CardDescription>
                    </CardHeader>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
