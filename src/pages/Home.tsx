
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
      image: "https://images.unsplash.com/photo-1489599077873-6aa4d5b7e8f3?auto=format&fit=crop&w=400&h=600&q=80"
    },
    {
      id: 3,
      title: "Moonlight",
      genre: "Drama",
      year: 2016,
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=400&h=600&q=80"
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
      image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=600&h=400&q=80"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative gradient-dark py-20 lg:py-32 animate-on-scroll overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="w-24 h-24 gradient-cinema rounded-2xl flex items-center justify-center mx-auto mb-8 animate-on-scroll-delay shadow-lg">
              <span className="text-white font-bold text-2xl">FC</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-on-scroll-delay-2">
              FTCA Hammemlif
            </h1>
            <p className="text-xl md:text-2xl text-primary mb-8 max-w-3xl mx-auto font-medium animate-on-scroll-delay-3">
              Where Cinema Comes Alive
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-on-scroll-delay-3 leading-relaxed">
              Welcome to our passionate community of film enthusiasts. We celebrate the art of cinema through screenings, discussions, and shared experiences that bring stories to life in the darkness of the theater.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll-delay-3">
              <Button asChild size="lg" className="gradient-cinema hover:opacity-90 transition-opacity shadow-lg">
                <Link to="/movies">Explore Movies</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10">
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
              <Card key={movie.id} className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-on-scroll animate-on-scroll-delay-${index % 3 + 1} border-border/50 bg-card/50 backdrop-blur-sm`}>
                <div className="aspect-[2/3] overflow-hidden rounded-t-lg">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="p-6">
                  <CardTitle className="text-xl text-foreground">{movie.title}</CardTitle>
                  <CardDescription className="text-primary/80">{movie.genre} • {movie.year}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="border-primary/30 hover:bg-primary/10">
              <Link to="/movies">View All Movies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section 
        ref={eventsRef}
        className="py-16 lg:py-24 bg-muted/30 animate-on-scroll relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-lg text-muted-foreground">Join us for exclusive screenings and film discussions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredEvents.map((event, index) => (
              <Card key={event.id} className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-on-scroll animate-on-scroll-delay-${index + 1} border-border/50 bg-card/50 backdrop-blur-sm`}>
                <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="p-6">
                  <CardTitle className="text-xl text-foreground">{event.title}</CardTitle>
                  <CardDescription className="text-sm text-primary font-medium mb-2">{event.date}</CardDescription>
                  <CardDescription className="text-muted-foreground">{event.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="border-primary/30 hover:bg-primary/10">
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        ref={ctaRef}
        className="py-16 lg:py-24 animate-on-scroll relative overflow-hidden"
      >
        <div className="absolute inset-0 gradient-dark"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Connect with fellow film enthusiasts and be part of memorable cinematic experiences that transcend the ordinary
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gradient-cinema hover:opacity-90 transition-opacity shadow-lg">
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
