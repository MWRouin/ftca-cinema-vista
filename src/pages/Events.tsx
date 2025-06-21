
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Events() {
  const events = [
    {
      id: 1,
      title: "Classic Film Night: Casablanca",
      date: "2024-03-15",
      time: "19:00",
      location: "Main Theater",
      description: "Join us for a screening of the timeless classic Casablanca, followed by a discussion about its cultural impact.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80",
      status: "upcoming",
      category: "Screening"
    },
    {
      id: 2,
      title: "Director Spotlight: Akira Kurosawa",
      date: "2024-03-28",
      time: "18:30",
      location: "Conference Room A",
      description: "An in-depth exploration of Kurosawa's filmmaking techniques and his influence on modern cinema.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80",
      status: "upcoming",
      category: "Workshop"
    },
    {
      id: 3,
      title: "Film Analysis Workshop",
      date: "2024-02-20",
      time: "17:00",
      location: "Study Hall",
      description: "Interactive workshop on analyzing cinematography, narrative structure, and visual storytelling.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80",
      status: "past",
      category: "Workshop"
    },
    {
      id: 4,
      title: "International Cinema Festival",
      date: "2024-02-10",
      time: "14:00",
      location: "Main Theater",
      description: "A celebration of world cinema featuring films from various countries and cultures.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&h=400&q=80",
      status: "past",
      category: "Festival"
    }
  ];

  const upcomingEvents = events.filter(event => event.status === 'upcoming');
  const pastEvents = events.filter(event => event.status === 'past');

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const EventCard = ({ event }: { event: typeof events[0] }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
            {event.category}
          </Badge>
          <Badge variant={event.status === 'upcoming' ? 'default' : 'outline'}>
            {event.status === 'upcoming' ? 'Upcoming' : 'Past Event'}
          </Badge>
        </div>
        <CardTitle className="text-xl">{event.title}</CardTitle>
        <CardDescription className="space-y-1">
          <div className="text-amber-600 dark:text-amber-400 font-medium">
            {formatDate(event.date)} at {event.time}
          </div>
          <div className="text-sm">📍 {event.location}</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{event.description}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shimmer">Events</h1>
          <div className="section-divider w-24 mx-auto mb-8"></div>
          <div className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join our community events, screenings, and workshops
          </div>
        </div>

        {/* Upcoming Events */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <p className="text-lg text-muted-foreground">No upcoming events scheduled.</p>
              <p className="text-sm text-muted-foreground mt-2">Check back soon for new announcements!</p>
            </div>
          )}
        </section>

        {/* Past Events */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
