import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Logo } from '@/components/Logo';
import { getMovies } from '@/data/movies';
import { PageTitle } from '@/components/customUi/page-title';
import MetaHeader from '@/lib/metadata/metadata';
import { LazyImage } from '@/components/customUi/lazy-image';
import { useTheme } from '@/components/ThemeProvider';

export default function Home() {
  const heroRef = useScrollAnimation();
  const moviesRef = useScrollAnimation();
  const eventsRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();
  const { theme } = useTheme()
  const BASE = import.meta.env.BASE_URL || "/";

  const featuredMovies = getMovies().slice(0, 4);

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
          className="relative min-h-[calc(100svh-4rem)] flex items-center justify-center py-24 lg:py-32 animate-on-scroll overflow-hidden bg-background"
          style={{ backgroundColor: theme === "dark" ? "#1b1614" : "#9eb2c2" }}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-40"
            style={{ backgroundImage: `url(/Backgrounds/hero-image-hlif.jpg)` }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-secondary/20" />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                theme === "dark"
                  ? "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)"
                  : "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.60) 100%)",
            }}
          />

          {/* Film grain overlay */}
          {/* <div
            className="absolute pointer-events-none opacity-[0.4] mix-blend-overlay"
            style={{
              inset: "-200px",
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "128px 128px",
              animation: "grain 1s steps(2) infinite",
            }}
          /> */}

          {/* Scanlines */}
          {/* <div
            className="absolute inset-0 pointer-events-none opacity-[0.01]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 4px)",
            }}
          /> */}

          {/* Content */}
          <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">

              {/* Logo */}
              <div
                className="flex justify-center mb-8"
                style={{ animation: "fadeSlideDown 0.9s ease both" }}
              >
                <Logo
                  size={310}
                  className="drop-shadow-2xl max-w-[calc(100vw/2)]"
                />
              </div>

              {/* Title */}
              <div style={{ animation: "fadeSlideUp 0.9s ease 0.15s both" }}>
                <PageTitle title="Hammam-lif Amateur Filmmakers' Club" />
              </div>

              {/* Decorative divider */}
              <div
                className="flex items-center justify-center gap-3 my-6"
                style={{ animation: "fadeSlideUp 0.9s ease 0.25s both" }}
              >
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
              </div>

              {/* Description */}
              <p
                className="text-lg text-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
                style={{ animation: "fadeSlideUp 0.9s ease 0.35s both" }}
              >
                A filmmakers' club based in Hammam-Lif, active since 1964 and operating
                under the "Fédération Tunisienne des Cinéastes Amateurs (FTCA)".
              </p>

              {/* Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-6 justify-center"
                style={{ animation: "fadeSlideUp 0.9s ease 0.45s both" }}
              >
                <Button
                  asChild
                  size="lg"
                  className="btn-cinema hover-lift text-lg px-10 py-4"
                >
                  <Link to="/movies">Explore Movies</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary/30 hover:bg-secondary/80 hover-lift text-lg px-8 py-4"
                >
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
              <PageTitle title="Featured Films" />
              <div className="section-divider w-24 mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground">Discover our Movies</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6 lg:gap-8 xl:gap-8">
              {featuredMovies.map((movie, index) => (
                <div
                  key={movie.id}
                  className="opacity-100 visible"
                >
                  <Card className="bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 group overflow-hidden h-full">
                    <Link to={`/movies/${movie.id}`} className="block">
                      <div className="aspect-[2/3] overflow-hidden bg-muted">
                        <LazyImage
                          src={movie.image}
                          alt={movie.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
                <PageTitle title="Upcoming Events" />
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
                <Button asChild variant="outline" className="btn-cinema text-white border-primary/30 hover-lift">
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
            <PageTitle title="Join Our Community" />
            <div className="section-divider w-24 mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Connect with fellow film enthusiasts and be part of memorable cinematic experiences that transcend the ordinary
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="btn-cinema hover-lift text-lg px-8 py-4">
                <Link to="/contact">Get in Touch</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/30 hover-lift text-lg px-8 py-4">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
