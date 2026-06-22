import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { getMovies } from '@/data/movies';
import { PageTitle } from '@/components/customUi/page-title';
import MetaHeader from '@/lib/metadata/metadata';
import { PAGE_SEO } from '@/lib/metadata/seo-constants';
import { LazyImage } from '@/components/customUi/lazy-image';
import './home-hero.css';

export default function Home() {
  const moviesRef = useScrollAnimation();
  const eventsRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();
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
      <MetaHeader {...PAGE_SEO[""]} />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section
          className="editorial-hero"
          style={{
            ["--hero-bg-image" as string]: `url(${BASE}Backgrounds/hero-image-hlif.jpg)`,
          }}
        >
          <div className="grain"></div>

          <div className="container">
            <div className="content">

              <div className="eyebrow">
                <span className="eyebrow-text">
                  <span className="eyebrow-seg">Amateur Cinema</span>
                  <span className="eyebrow-sep" aria-hidden="true">·</span>
                  <span className="eyebrow-seg">Active Since 1964</span>
                </span>
              </div>

              <h1>
                <span className="line">Hammam-Lif</span>
                <span className="line">Amateur</span>
                <span className="line accent">Filmmakers' Club</span>
              </h1>

              <p className="tagline">
                A home where cinema becomes memory, thought, and shared imagination.
              </p>

              <p className="description">
                Founded in <strong>1964</strong> and operating under the{" "}
                <strong>Fédération Tunisienne des Cinéastes Amateurs (FTCA)</strong>,
                our club in Hammam-Lif explores cinema not only as an art form,
                but as a way to question reality, reflect together, and give shape to ideas.
              </p>

              <div className="quote">
                We use film to observe the world with tenderness,
                curiosity, and a deep desire to understand.
              </div>

              <div className="actions">
                <Link to="/about" className="btn btn-primary">
                  Discover Our Story <span className="arrow">&rarr;</span>
                </Link>
                <Link to="/movies" className="btn btn-secondary">
                  Explore Our Films <span className="arrow">&rarr;</span>
                </Link>
              </div>

            </div>

            <div className="side-note">
              Creation • Reflection • Resistance • Cinema
            </div>
          </div>

          <div className="credits">
            <span className="key">1964</span>
            <span>Hammam-Lif</span>
            <span>Tunisia</span>
            <span>FTCA</span>
            <span>60+ Years of Independent Cinema</span>
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
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
