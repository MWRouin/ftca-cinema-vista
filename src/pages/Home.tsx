
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
        className="relative gradient-dark py-24 lg:py-32 animate-on-scroll overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="w-28 h-28 gradient-cinema rounded-3xl flex items-center justify-center mx-auto mb-8 animate-on-scroll-delay hover-lift">
              <span className="text-white font-bold text-3xl">FC</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-on-scroll-delay-1">
              <span className="text-shimmer">FTCA Hammemlif</span>
            </h1>
            
            <div className="text-2xl md:text-3xl text-primary mb-4 font-medium animate-on-scroll-delay-2">
              Where Cinema Comes Alive
            </div>
            
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto animate-on-scroll-delay-3 leading-relaxed">
              Welcome to our passionate community of film enthusiasts. We celebrate the art of cinema through screenings, discussions, and shared experiences that bring stories to life in the darkness of the theater.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-on-scroll-delay-4">
              <Button asChild size="lg" className="btn-cinema hover-lift text-lg px-8 py-4">
                <Link to="/movies">Explore Movies</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10 hover-lift text-lg px-8 py-4">
                <Link to="/events">Upcoming Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section 
        ref={moviesRef}
        className="py-20 lg:py-28 animate-on-scroll"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-shimmer">Featured Films</h2>
            <div className="section-divider w-24 mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground">Discover our handpicked selection of cinematic masterpieces</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMovies.map((movie, index) => (
              <div key={movie.id} className={`animate-on-scroll-delay-${index + 1}`}>
                <Card className="card-cinema hover-lift group overflow-hidden">
                  <div className="aspect-[2/3] overflow-hidden">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                      {movie.title}
                    </CardTitle>
                    <CardDescription className="text-primary/80">
                      {movie.genre} • {movie.year}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button asChild variant="outline" className="btn-cinema border-primary/30 hover:bg-primary/10 hover-lift">
              <Link to="/movies">View All Movies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section 
        ref={eventsRef}
        className="py-20 lg:py-28 gradient-subtle animate-on-scroll relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-shimmer">Upcoming Events</h2>
            <div className="section-divider w-24 mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground">Join us for exclusive screenings and film discussions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredEvents.map((event, index) => (
              <div key={event.id} className={`animate-on-scroll-delay-${index + 1}`}>
                <Card className="card-cinema hover-lift group overflow-hidden">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                      {event.title}
                    </CardTitle>
                    <div className="space-y-3">
                      <div className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full inline-block">
                        {event.date}
                      </div>
                      <div className="text-muted-foreground leading-relaxed">
                        {event.description}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button asChild variant="outline" className="btn-cinema border-primary/30 hover:bg-primary/10 hover-lift">
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        ref={ctaRef}
        className="py-20 lg:py-28 animate-on-scroll relative overflow-hidden"
      >
        <div className="absolute inset-0 gradient-dark"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-shimmer">Join Our Community</h2>
          <div className="section-divider w-24 mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Connect with fellow film enthusiasts and be part of memorable cinematic experiences that transcend the ordinary
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="btn-cinema hover-lift text-lg px-8 py-4">
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10 hover-lift text-lg px-8 py-4">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
