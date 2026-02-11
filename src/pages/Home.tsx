import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Logo } from '@/components/Logo';
import { getMovies } from '@/data/movies';
import { PageTitle } from '@/components/customUi/page-title';
import MetaHeader from '@/lib/metadata/metadata';

export default function Home() {
  const heroRef = useScrollAnimation();
  const moviesRef = useScrollAnimation();
  const eventsRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();
  const BASE = import.meta.env.BASE_URL || "/";

  const featuredMovies = getMovies().slice(0, 3);

  const featuredEvents = [
    /* {
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
    } */
  ];

  return (
    <>
      <MetaHeader />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-[calc(100svh-4rem)] flex items-center justify-center  py-24 lg:py-32 animate-on-scroll overflow-hidden bg-background"
        >
          {/* Background SVG at 10% opacity */}
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-40 dark:opacity-30"
            style={{ backgroundImage: `url(/Backgrounds/hero-image-hlif.jpg)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/20"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <Logo size={310} className="drop-shadow-2xl max-w-[calc(100vw/2)]" />
              </div>
              <PageTitle title="Hammam-lif Amateur Filmmakers' Club" />

              {/* <div className="text-2xl md:text-3xl text-primary mb-4 font-medium animate-on-scroll-delay-2">
              Club des Cinéastes Amateurs de Hammamlif
            </div> */}

              <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto animate-on-scroll-delay-3 leading-relaxed">
                A filmmakers’ club based in Hammam-Lif, active since 1964 and operating under the "Fédération Tunisienne des Cinéastes Amateurs (FTCA)".
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
              <PageTitle title="Featured Films" titleLevel={2} />
              <div className="section-divider w-24 mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground">Discover our Movies</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredMovies.map((movie, index) => (
                <div key={movie.id} className={`animate-on-scroll-delay-${index + 1}`}>
                  <Card className="card-cinema hover-lift group overflow-hidden">
                    <Link to={`/movies/${movie.id}`} className="block">
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
                    </Link>
                  </Card>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Button asChild variant="outline" className="btn-cinema text-white border-primary/30 hover:bg-primary/10 hover-lift">
                <Link to="/movies">View All Movies</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Events */}
        {featuredEvents.length > 0 ?
          <section
            ref={eventsRef}
            className="py-20 lg:py-28 gradient-subtle animate-on-scroll relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <PageTitle title="Upcoming Events" titleLevel={2} />
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
                <Button asChild variant="outline" className="btn-cinema text-white border-primary/30 hover:bg-primary/10 hover-lift">
                  <Link to="/events">View All Events</Link>
                </Button>
              </div>
            </div>
          </section>
          : ""}

        {/* Call to Action */}
        <section
          ref={ctaRef}
          className="py-20 lg:py-28 animate-on-scroll relative overflow-hidden"
        >
          <div className="absolute inset-0 gradient-dark"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>

          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
            <PageTitle title="Join Our Community" titleLevel={2} />
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
    </>
  );
}
