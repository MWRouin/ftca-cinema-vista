
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { getMovies, getDirectorNames } from '@/data/movies';
import { PageTitle } from '@/components/customUi/page-title';
import { LazyImage } from '@/components/customUi/lazy-image';
import MetaHeader from '@/lib/metadata/metadata';
import { PAGE_SEO } from '@/lib/metadata/seo-constants';
import { LocalLink } from '@/i18n/locale';

export default function Movies() {
  const { t } = useTranslation('movies');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');


  const movies = getMovies();

  const genres = ['all', ...Array.from(new Set(movies.map(movie => movie.genre)))];

  const filteredMovies = selectedGenre === 'all'
    ? movies
    : movies.filter(movie => movie.genre === selectedGenre);

  return (
    <>
      <MetaHeader {...PAGE_SEO.movies} />
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <PageTitle title={t('title')} />
          <div className="section-divider w-24 mx-auto mb-8"></div>
          <div className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t('subtitle')}
          </div>

          {/* Filter */}
          <div className="flex justify-center">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-64 card-cinema hover-lift focus-cinema">
                <SelectValue placeholder={t('filterPlaceholder')} />
              </SelectTrigger>
              <SelectContent className="card-cinema">
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre} className="hover:bg-primary/10">
                    {genre === 'all' ? t('allGenres') : genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-6 lg:gap-8 xl:gap-8">
          {filteredMovies.map((movie, index) => (
            <div
              key={movie.id}
              className="opacity-100 visible"
            >
              <Card className="bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 group overflow-hidden h-full">
                <LocalLink to={`/movies/${movie.id}`} className="block">
                  <div className="aspect-[2/3] overflow-hidden bg-muted">
                    <LazyImage
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    //onLoad={() => console.log(`Image loaded for ${movie.title}`)}
                    //onError={() => console.log(`Image failed to load for ${movie.title}`)}
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors text-foreground">
                      {movie.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-primary/80">
                      {movie.genre} • {movie.year}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-sm text-muted-foreground">
                      {t('directedBy', { director: getDirectorNames(movie) })}
                    </div>
                  </CardContent>
                </LocalLink>
              </Card>
            </div>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 gradient-cinema rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
              <span className="text-white font-bold text-2xl">?</span>
            </div>
            <div className="text-xl text-muted-foreground">{t('emptyMessage')}</div>
            <Button
              onClick={() => setSelectedGenre('all')}
              variant="outline"
              className="mt-4 hover-lift"
            >
              {t('viewAll')}
            </Button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
