
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';

export default function Movies() {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const movies = [
    { id: 1, title: "The Grand Budapest Hotel", genre: "Comedy", year: 2014, director: "Wes Anderson", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&h=600&q=80" },
    { id: 2, title: "Parasite", genre: "Thriller", year: 2019, director: "Bong Joon-ho", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&h=600&q=80" },
    { id: 3, title: "Moonlight", genre: "Drama", year: 2016, director: "Barry Jenkins", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&h=600&q=80" },
    { id: 4, title: "The Shape of Water", genre: "Romance", year: 2017, director: "Guillermo del Toro", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&h=600&q=80" },
    { id: 5, title: "Mad Max: Fury Road", genre: "Action", year: 2015, director: "George Miller", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&h=600&q=80" },
    { id: 6, title: "Her", genre: "Romance", year: 2013, director: "Spike Jonze", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&h=600&q=80" },
  ];

  const genres = ['all', ...Array.from(new Set(movies.map(movie => movie.genre)))];

  const filteredMovies = selectedGenre === 'all' 
    ? movies 
    : movies.filter(movie => movie.genre === selectedGenre);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Movie Catalog</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Explore our curated collection of cinematic masterpieces
          </p>
          
          {/* Filter */}
          <div className="flex justify-center">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre === 'all' ? 'All Genres' : genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <Card key={movie.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <Link to={`/movie/${movie.id}`}>
                <div className="aspect-[2/3] overflow-hidden rounded-t-lg">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg leading-tight">{movie.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {movie.genre} • {movie.year}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">Directed by {movie.director}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No movies found for the selected genre.</p>
          </div>
        )}
      </div>
    </div>
  );
}
