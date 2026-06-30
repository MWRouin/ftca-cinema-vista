import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getMovies, creditName, type Movie } from '@/data/movies';
import { PageTitle } from '@/components/customUi/page-title';
import { MovieCard } from '@/components/customUi/movie-card';
import MetaHeader from '@/lib/metadata/metadata';
import { PAGE_SEO } from '@/lib/metadata/seo-constants';
import { cn } from '@/lib/utils';

type SortOrder = 'newest' | 'oldest' | 'title';

const FOUNDING_YEAR = 1964;

/** Strip accents/diacritics + lowercase so search forgives accent/case mistakes. */
const fold = (value: string) => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

/** Flattened, accent-folded text per movie, indexed for fuzzy search. */
type MovieSearchRecord = {
  movie: Movie;
  title: string;
  people: string;
  description: string;
  genre: string;
  year: string;
};

export default function Movies() {
  const { t } = useTranslation('movies');
  const currentYear = new Date().getFullYear();

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([FOUNDING_YEAR, currentYear]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const movies = getMovies();
  const genres = Array.from(new Set(movies.map((movie) => movie.genre)));

  // Fuzzy index over each movie's full data — title, people (cast/crew/director +
  // characters), descriptions (both languages), genre and year. Built once.
  const searchIndex = useMemo(() => {
    const records: MovieSearchRecord[] = movies.map((movie) => ({
      movie,
      title: fold(movie.title),
      people: fold(movie.credits.flatMap((credit) => [creditName(credit), credit.character ?? '']).join(' ')),
      description: fold([movie.descriptions?.data?.en, movie.descriptions?.data?.fr].filter(Boolean).join(' ')),
      genre: fold(movie.genre),
      year: movie.year === '-' ? '' : String(movie.year),
    }));
    return new Fuse(records, {
      keys: [
        { name: 'title', weight: 0.6 }, // title dominates relevance
        { name: 'people', weight: 0.2 },
        { name: 'description', weight: 0.1 },
        { name: 'genre', weight: 0.06 },
        { name: 'year', weight: 0.04 },
      ],
      threshold: 0.4, // ~typo tolerance: 0 = exact, 1 = match anything
      ignoreLocation: true, // match anywhere in the field, not just the start
      minMatchCharLength: 2,
    });
  }, [movies]);

  const trimmedQuery = searchQuery.trim();
  // null = no active search. Otherwise the fuzzy matches plus their relevance
  // rank (Fuse returns best-first) so results can be ordered by relevance.
  const search = useMemo(() => {
    const folded = fold(trimmedQuery);
    if (folded.length < 2) return null;
    const rank = new Map(searchIndex.search(folded).map((result, index) => [result.item.movie.id, index]));
    return { ids: new Set(rank.keys()), rank };
  }, [searchIndex, trimmedQuery]);

  const yearActive = yearRange[0] !== FOUNDING_YEAR || yearRange[1] !== currentYear;

  const filteredMovies = movies
    .filter((movie) => selectedGenres.length === 0 || selectedGenres.includes(movie.genre))
    .filter((movie) => {
      if (!yearActive) return true;
      // Unknown-year movies can't sit on a timeline, so drop them once the range narrows.
      if (movie.year === '-') return false;
      const movieYear = movie.year as number;
      return movieYear >= yearRange[0] && movieYear <= yearRange[1];
    })
    .filter((movie) => search === null || search.ids.has(movie.id))
    .sort((movieA, movieB) => {
      // While searching, best fuzzy match first — relevance overrides the sort control.
      if (search !== null) {
        return (search.rank.get(movieA.id) ?? 0) - (search.rank.get(movieB.id) ?? 0);
      }
      if (sortOrder === 'title') return movieA.title.localeCompare(movieB.title);
      // Movies with an unknown year ('-') always sort last, in either direction.
      const aUnknown = movieA.year === '-';
      const bUnknown = movieB.year === '-';
      if (aUnknown !== bUnknown) return aUnknown ? 1 : -1;
      if (aUnknown) return 0;
      return sortOrder === 'oldest'
        ? (movieA.year as number) - (movieB.year as number)
        : (movieB.year as number) - (movieA.year as number);
    });

  const hasActiveFilters = selectedGenres.length > 0 || yearActive || trimmedQuery !== '';
  // Filters tucked inside the config card (search stays visible, so it's excluded).
  const hasConfigFilters = selectedGenres.length > 0 || yearActive;

  const toggleGenre = (genre: string) =>
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((value) => value !== genre) : [...prev, genre]));

  const resetFilters = () => {
    setSelectedGenres([]);
    setYearRange([FOUNDING_YEAR, currentYear]);
    setSearchQuery('');
  };

  return (
    <>
      <MetaHeader {...PAGE_SEO.movies} />
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <PageTitle title={t('title')} />
            <div className="section-divider w-24 mx-auto mb-8"></div>
            <div className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </div>
          </div>

          {/* Filter controls */}
          <div className="mb-10 mt-6">
            {/* Search + config toggle (always visible) — narrow & centered */}
            <div className="mx-auto flex max-w-xl items-center gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="pl-9 pr-9 focus-cinema [&::-webkit-search-cancel-button]:hidden"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label={t('clearSearch')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus-cinema"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setShowFilters((open) => !open)}
                aria-expanded={showFilters}
                aria-label={t('filtersToggle')}
                title={t('filtersToggle')}
                className="relative shrink-0 focus-cinema"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {hasConfigFilters && (
                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
                )}
              </Button>
            </div>

            {/* Config card (toggled) */}
            {showFilters && (
              <div className="mt-3 space-y-5 rounded-xl border border-border/70 bg-card/70 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/50 sm:p-5">
                {/* Genre + Year range */}
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Genres (multi-select chips) */}
                  <div>
                    <span className="mb-2.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {t('genreLabel')}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {genres.map((genre) => {
                        const active = selectedGenres.includes(genre);
                        return (
                          <button
                            key={genre}
                            type="button"
                            aria-pressed={active}
                            onClick={() => toggleGenre(genre)}
                            className={cn(
                              'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-cinema',
                              active
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground',
                            )}
                          >
                            {genre}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Year range slider */}
                  <div>
                    <div className="mb-2.5 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {t('yearLabel')}
                      </span>
                      <span className="text-sm font-medium text-foreground tabular-nums">
                        {yearRange[0]} – {yearRange[1]}
                      </span>
                    </div>
                    <Slider
                      min={FOUNDING_YEAR}
                      max={currentYear}
                      step={1}
                      value={yearRange}
                      onValueChange={(value) => setYearRange([value[0], value[1]])}
                      aria-label={t('yearLabel')}
                      className="mt-4"
                    />
                  </div>
                </div>

                {/* Sort + meta */}
                <div className="flex flex-col gap-3 border-t border-border/50 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
                    <SelectTrigger className="w-full focus-cinema sm:w-44">
                      <SelectValue placeholder={t('sortPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">{t('sortNewest')}</SelectItem>
                      <SelectItem value="oldest">{t('sortOldest')}</SelectItem>
                      <SelectItem value="title">{t('sortTitle')}</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <span className="text-sm text-muted-foreground">
                      {t('results', { count: filteredMovies.length })}
                    </span>
                    {hasActiveFilters && (
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 focus-cinema"
                      >
                        <X className="h-3.5 w-3.5" />
                        {t('clearFilters')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Movies grid */}
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-6 lg:gap-8 xl:gap-8">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 gradient-cinema rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
                <span className="text-white font-bold text-2xl">?</span>
              </div>
              <div className="text-xl text-muted-foreground">{t('emptyMessage')}</div>
              <Button onClick={resetFilters} variant="outline" className="mt-4 hover-lift">
                {t('clearFilters')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
