import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageTitle } from "@/components/customUi/page-title";
import { Calendar, MapPin, Quote } from "lucide-react";

export default function EventTest() {
    const event = {
        title: "Classic Film Night: Casablanca",
        category: "Screening",
        status: "Past Event",
        date: "February 10, 2024",
        location: "Main Theater",
        image:
            "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1400&q=80",

        overview: `
A special screening dedicated to one of the most enduring classics in cinema history.
This event brought together cinephiles and newcomers alike for a shared experience
of nostalgia, romance, and political tension.
    `,

        retrospective: `
The discussion following the screening focused on Casablanca’s layered narrative,
its portrayal of wartime morality, and its influence on contemporary storytelling.

Participants reflected on how the film continues to resonate decades after its release,
particularly in its themes of sacrifice, exile, and resistance.
    `,

        highlights: [
            "Introduction on the historical context of World War II in Hollywood cinema",
            "Post-screening discussion moderated by the FTCA cinema group",
            "Audience exchange on timeless dialogue and iconic scenes",
        ],

        quote: {
            text: "Some films don’t age. They accumulate meaning.",
            author: "FTCA Cinema Club",
        },

        gallery: [
            "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=800&q=80",
        ],
    };

    const media = [
        {
            type: "video",
            src: "/videos/Athena2019.mp4",
            title: "Opening Introduction",
            caption: "A brief contextual introduction before the screening."
        },
        {
            type: "image",
            src: "/ftca-hmmlif-logo.png",
            title: "Post-Screening Discussion",
            caption: "Audience exchange around the film’s themes."
        }
    ];


    return (
        <div className="min-h-screen py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Back */}
                <div className="mb-6">
                    <Button asChild variant="outline">
                        <Link to="/events">← Back to Events</Link>
                    </Button>
                </div>

                {/* Hero */}
                <div className="aspect-[16/9] overflow-hidden rounded-xl mb-10">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary">{event.category}</Badge>
                        <Badge variant="outline">{event.status}</Badge>
                    </div>

                    <PageTitle title={event.title} titleLevel={2} />

                    <div className="mt-4 flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                        </div>
                    </div>
                </div>

                {/* Overview */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Event Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                            {event.overview}
                        </p>
                    </CardContent>
                </Card>

                {/* Hero2 */}
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl mb-10">
                    <video
                        src="/videos/Athena2019.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Title overlay */}
                    <div className="relative z-10 h-full flex items-end p-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            Classic Film Night: Casablanca
                        </h1>
                    </div>
                </div>

                <section className="space-y-12">
                    {media.map((item, i) => (
                        <div
                            key={i}
                            className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Media */}
                            <div className="overflow-hidden rounded-xl">
                                {item.type === "image" ? (
                                    <img
                                        src={item.src}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <video
                                        src={item.src}
                                        controls
                                        className="w-full rounded-xl"
                                    />
                                )}
                            </div>

                            {/* Text */}
                            <div className="text-muted-foreground">
                                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                <p>{item.caption}</p>
                            </div>
                        </div>
                    ))}
                </section>

                <br />

                <section className="overflow-x-auto pb-6">
                    <div className="flex gap-6 w-max">
                        {media.map((item, i) => (
                            <div
                                key={i}
                                className="w-[320px] flex-shrink-0 group"
                            >
                                <div className="aspect-video overflow-hidden rounded-lg">
                                    {item.type === "image" ? (
                                        <img
                                            src={item.src}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <video
                                            src={item.src}
                                            muted
                                            loop
                                            autoPlay
                                            playsInline
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {item.caption}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <br />


                {/* Retrospective */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Retrospective</CardTitle>
                        <CardDescription>Looking back at the experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="leading-relaxed text-muted-foreground whitespace-pre-line">
                            {event.retrospective}
                        </p>
                    </CardContent>
                </Card>

                {/* Highlights */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Highlights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            {event.highlights.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Quote */}
                <Card className="mb-10">
                    <CardContent className="pt-8">
                        <div className="flex items-start gap-4">
                            <Quote className="w-6 h-6 text-muted-foreground mt-1" />
                            <blockquote className="italic text-lg text-muted-foreground">
                                “{event.quote.text}”
                                <footer className="mt-2 text-sm not-italic">
                                    — {event.quote.author}
                                </footer>
                            </blockquote>
                        </div>
                    </CardContent>
                </Card>

                {/* Gallery */}
                <section>
                    <h2 className="text-3xl font-bold mb-6">Event Gallery</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {event.gallery.map((img, i) => (
                            <div
                                key={i}
                                className="aspect-[16/9] overflow-hidden rounded-lg"
                            >
                                <img
                                    src={img}
                                    alt={`Event photo ${i + 1}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div >
    );
}
