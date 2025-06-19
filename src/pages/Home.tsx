
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Home() {
  const heroRef = useScrollAnimation();
  const moviesRef = useScrollAnimation();
  const eventsRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();

  const featuredMovies = [
    {
      id: 1,
      title: "The Grand Budapest Hotel",
      genre: "Comedy/Drama",
      year: 2014,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&h=600&q=80"
    },
    {
      id: 2,
      title: "Parasite",
      genre: "Thriller",
      year: 2019,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&h=600&q=80"
    },
    {
      id: 3,
      title: "Moonlight",
      genre: "Drama",
      year: 2016,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&h=600&q=80"
    }
  ];

  const featuredEvents = [
    {
      id: 1,
      title: "Classic Film Night",
      date: "March 15, 2024",
      description: "Join us for an evening of timeless cinema classics",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 2,
      title: "Director Spotlight: Kurosawa",
      date: "March 28, 2024",
      description: "Exploring the masterworks of Akira Kurosawa",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative bg-gradient-to-br from-background to-muted py-20 lg:py-32 animate-on-scroll"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-on-scroll-delay">
              <span className="text-white font-bold text-2xl">FC</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent animate-on-scroll-delay-2">
              FTCA Hammemlif
            </h1>
            <p className="text-xl md:text-2xl text-primary mb-8 max-w-3xl mx-auto font-medium animate-on-scroll-delay-3">
              Where Cinema Comes Alive
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-on-scroll-delay-3">
              Welcome to our passionate community of film enthusiasts. We celebrate the art of cinema through screenings, discussions, and shared experiences that bring stories to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll-delay-3">
              <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800">
                <Link to="/movies">Explore Movies</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/events">Upcoming Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section 
        ref={moviesRef}
        className="py-16 lg:py-24 animate-on-scroll"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Films</h2>
            <p className="text-lg text-muted-foreground">Discover our handpicked selection of cinematic masterpieces</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMovies.map((movie, index) => (
              <Card key={movie.id} className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-on-scroll animate-on-scroll-delay-${index + 1}`}>
                <div className="aspect-[2/3] overflow-hidden rounded-t-lg">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{movie.title}</CardTitle>
                  <CardDescription>{movie.genre} • {movie.year}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link to="/movies">View All Movies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section 
        ref={eventsRef}
        className="py-16 lg:py-24 bg-muted/50 animate-on-scroll"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-lg text-muted-foreground">Join us for exclusive screenings and film discussions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredEvents.map((event, index) => (
              <Card key={event.id} className={`group hover:shadow-lg transition-all duration-300 animate-on-scroll animate-on-scroll-delay-${index + 1}`}>
                <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="text-sm text-primary font-medium">{event.date}</CardDescription>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        ref={ctaRef}
        className="py-16 lg:py-24 animate-on-scroll"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Connect with fellow film enthusiasts and be part of memorable cinematic experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800">
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
