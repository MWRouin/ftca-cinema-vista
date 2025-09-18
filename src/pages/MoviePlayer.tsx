
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function MoviePlayer() {
  const { id } = useParams();

  // Mock movie data - in a real app, this would come from an API
  const movie = {
    id: 1,
    title: "The Grand Budapest Hotel",
    genre: "Comedy/Drama",
    year: 2014,
    director: "Wes Anderson",
    duration: "99 minutes",
    rating: "R",
    description: "The adventures of Gustave H, a legendary concierge at a famous European hotel between the wars, and Zero Moustafa, the protégé who becomes his most trusted friend. The story involves the theft and recovery of a priceless Renaissance painting and the battle for an enormous family fortune.",
    cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric", "Adrien Brody", "Willem Dafoe"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&h=1200&q=80",
    trailerUrl: "https://www.youtube.com/embed/1Fg5iWmQjwk", // Sample trailer URL
  };

  const relatedMovies = [
    { id: 2, title: "Moonrise Kingdom", director: "Wes Anderson", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=300&h=450&q=80" },
    { id: 3, title: "The Royal Tenenbaums", director: "Wes Anderson", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=300&h=450&q=80" },
    { id: 4, title: "Isle of Dogs", director: "Wes Anderson", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=300&h=450&q=80" },
  ];

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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge>{movie.genre}</Badge>
                <Badge variant="outline">{movie.year}</Badge>
                <Badge variant="outline">{movie.duration}</Badge>
                <Badge variant="outline">{movie.rating}</Badge>
              </div>
              <p className="text-lg text-muted-foreground mb-6">{movie.description}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Director</h3>
                <p className="text-muted-foreground">{movie.director}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Cast</h3>
                <p className="text-muted-foreground">{movie.cast.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Watch Trailer</CardTitle>
              <CardDescription>Get a preview of this amazing film</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <iframe
                  src={movie.trailerUrl}
                  title={`${movie.title} Trailer`}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Movies */}
        <section>
          <h2 className="text-3xl font-bold mb-8">More from {movie.director}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedMovies.map((relatedMovie) => (
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
      </div>
    </div>
  );
}
