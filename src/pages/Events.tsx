
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageTitle } from '@/components/customUi/page-title';
import { CalendarX, FolderX } from 'lucide-react';
import { Link } from "react-router-dom";

export default function Events() {
  const events = [
    {
      id: 'ydour',
      title: "Ydour",
      date: "2025-02-22",
      time: "18:30",
      location: "Café culturel LIBER'THÉ",
      description: "YDOUR exists to bring together the amateur cinema community and cinema lovers.",
      image: "/events/ydour/ydour-title.jpg",
      status: "past",
      category: "Screening & Discussion"
    },/* 
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
    } */
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
    <Card className="group relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

      {/* Clickable overlay */}
      <Link
        to={`/events/${event.id}`}
        aria-label={`Open event ${event.title}`}
      >

        <div className="aspect-[16/9] overflow-hidden rounded-t-lg relative z-20">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <CardHeader className="relative z-20">
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
            <div className="font-medium">
              {formatDate(event.date)} at {event.time}
            </div>
            <div className="text-sm text-amber-600 dark:text-amber-400">📍 {event.location}</div>
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-20">
          <p className="text-muted-foreground">{event.description}</p>
        </CardContent>
      </Link>
    </Card>
  );


  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <PageTitle title='Events' />
          <div className="section-divider w-24 mx-auto mb-8"></div>
          <div className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join our community events, screenings, and workshops
          </div>
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/50 rounded-lg space-y-4">
              <CalendarX className="w-20 h-20 mx-auto text-muted-foreground" />

              <p className="text-lg text-muted-foreground">
                No upcoming events scheduled.
              </p>

              <p className="text-sm text-muted-foreground">
                Check back soon for new announcements!
              </p>
            </div>
          )}
        </section>}

        {/* Past Events */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Past Events</h2>
          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/50 rounded-lg space-y-4">
              <FolderX className="w-20 h-20 mx-auto text-muted-foreground" />
              <p className="text-lg text-muted-foreground">No past events currently.</p>
              <p className="text-sm text-muted-foreground">Check back soon!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
