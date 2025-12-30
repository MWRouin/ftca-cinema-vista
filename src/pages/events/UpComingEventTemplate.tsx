import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageTitle } from "@/components/customUi/page-title";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function UpComingEventTemplate() {
  // Static event (later: fetched by id)
  const event = {
    title: "Classic Film Night: Casablanca",
    category: "Screening",
    status: "Upcoming",
    date: "March 15, 2024",
    time: "19:00",
    location: "Main Theater",
    image:
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1400&q=80",
    description: `
Join us for a special screening of the timeless classic *Casablanca*.
  
After the screening, a discussion will follow exploring the film’s themes,
historical context, and lasting cultural impact.

Whether you're discovering it for the first time or revisiting a masterpiece,
this evening is a celebration of cinema at its finest.
    `,
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <div className="mb-6">
          <Button asChild variant="outline">
            <Link to="/events">← Back to Events</Link>
          </Button>
        </div>

        {/* Hero Image */}
        <div className="aspect-[16/9] overflow-hidden rounded-xl mb-10">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge>{event.category}</Badge>
            <Badge variant="outline">{event.status}</Badge>
          </div>

          <PageTitle title={event.title} titleLevel={2} />
        </div>

        {/* Event Info */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>Everything you need to know</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <span>{event.location}</span>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>About the Event</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
              {event.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
