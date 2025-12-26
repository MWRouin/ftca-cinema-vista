import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getMovieById, getRelatedMoviesByDirector, getRelatedMoviesByGenre } from '@/data/movies';
import { PageTitle } from '@/components/customUi/page-title';
import { cn } from '@/lib/utils';

export default function MoviePlayer() {
  const { id } = useParams();
  const movie = getMovieById(id);

  const relatedMoviesByDirector = movie ? getRelatedMoviesByDirector(movie, 3) : [];
  const relatedMoviesByGenre = movie ? getRelatedMoviesByGenre(movie, 3) : [];

  /* ---------- Language handling ---------- */
  const availableLanguages = movie?.description
    ? Object.keys(movie.description)
    : [];

  const [lang, setLang] = useState<string>(availableLanguages[0]);

  useEffect(() => {
    if (availableLanguages.length) {
      setLang(availableLanguages[0]);
    }
  }, [movie]);

  const description =
    movie?.description?.[lang] ??
    movie?.description?.[availableLanguages[0]];

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="aspect-[2/3] overflow-hidden rounded-lg">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              <PageTitle title={movie.title} titleLevel={2} />

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge>{movie.genre}</Badge>
                <Badge variant="outline">{movie.year}</Badge>
                {movie.duration && <Badge variant="outline">{movie.duration}</Badge>}
              </div>
              {movie.description && (
                <p className="text-lg text-muted-foreground mb-6">{movie.description}</p>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Director</h3>
                <p className="text-muted-foreground">{movie.director}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Cast</h3>
                <p className="text-muted-foreground">{movie.cast?.join(", ") || '—'}</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedMoviesByDirector.map((relatedMovie) => (
                <Card key={relatedMovie.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <Link to={`/movie/${relatedMovie.id}`}>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedMoviesByGenre.map((relatedMovie) => (
                <Card key={relatedMovie.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <Link to={`/movie/${relatedMovie.id}`}>
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
