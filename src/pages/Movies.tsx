
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { getMovies } from '@/data/movies';

export default function Movies() {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const movies = getMovies();

  const genres = ['all', ...Array.from(new Set(movies.map(movie => movie.genre)))];

  const filteredMovies = selectedGenre === 'all' 
    ? movies 
    : movies.filter(movie => movie.genre === selectedGenre);

  //console.log('Movies component rendered');
  //console.log('Filtered movies:', filteredMovies);
  //console.log('Selected genre:', selectedGenre);
  //console.log('Movie cards should now be visible');

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shimmer">Movie Catalog</h1>
          <div className="section-divider w-24 mx-auto mb-8"></div>
          <div className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore our curated collection of cinematic masterpieces
          </div>
          
          {/* Filter */}
          <div className="flex justify-center">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-64 card-cinema hover-lift focus-cinema">
                <SelectValue placeholder="Filter by genre" />
              </SelectTrigger>
              <SelectContent className="card-cinema">
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre} className="hover:bg-primary/10">
                    {genre === 'all' ? 'All Genres' : genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMovies.map((movie, index) => {
            console.log(`Rendering visible movie card ${index + 1}:`, movie.title);
            return (
              <div 
                key={movie.id} 
                className="opacity-100 visible"
              >
                <Card className="bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 group overflow-hidden h-full">
                  <Link to={`/movie/${movie.id}`} className="block">
                    <div className="aspect-[2/3] overflow-hidden bg-muted">
                      <img
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
                        Directed by {movie.director}
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            );
          })}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 gradient-cinema rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
              <span className="text-white font-bold text-2xl">?</span>
            </div>
            <div className="text-xl text-muted-foreground">No movies found for the selected genre.</div>
            <Button 
              onClick={() => setSelectedGenre('all')} 
              variant="outline" 
              className="mt-4 hover-lift"
            >
              View All Movies
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
