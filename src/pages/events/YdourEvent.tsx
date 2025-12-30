import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageTitle } from "@/components/customUi/page-title";
import { Calendar, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { EventGallerySlider } from "@/components/customUi/event-gallery-slider";

export default function YdourEvent() {
    const event = {
        title: "Ydour - يدور",
        category: "Screening & Discussion",
        status: "Past Event",
        date: "February 22, 2025",
        location: "Café culturel LIBER'THÉ",
        image:
            "/events/ydour/ydour-title.jpg",

        overview: `
YDOUR exists to bring together the amateur cinema community and cinema lovers.

We noticed a lack of regular events that allow people to gather, watch films, and exchange ideas outside traditional screening rooms.

There are important moments when the community comes together, such as FIFAK, where screenings and debates create a strong sense of collective experience. However, these opportunities happen only once a year. While FIFAK may be the biggest amateur cinema event, it shouldn’t be the only space where this community exists.
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
            text: "YDOUR will return. Stay tuned for the next edition.",
            callToAction: "Follow us to get the lates news!",
        },

        gallery: [
            "/events/ydour/gal1.jpg",
            "/events/ydour/gal2.jpg",
            "/events/ydour/gal3.jpg",
            "/events/ydour/gal4.jpg",
            "/events/ydour/gal5.jpg",
            "/events/ydour/gal6.jpg",
            "/events/ydour/gal7.jpg",
            "/events/ydour/gal8.jpg",
            "/events/ydour/gal9.jpg",
            "/events/ydour/gal10.jpg",
        ],
    };

    const media = [
        {
            type: "image",
            src: "/About/ydour_web_optimized.jpg",
            title: "Screening",
            caption: "By choosing a coffeeshop as a space for projection and discussion, YDOUR aims to reclaim cinema as a shared ritual accessible to everyone and rooted in everyday life."
        },
        {
            type: "video",
            src: "/events/ydour/talk.webm",
            title: "Post-Screening Discussion",
            caption: "Each film opened the door to conversation. Once the credits rolled, participants engaged in open discussions, exchanging perspectives, interpretations, and emotions. These dialogues created a collective rhythm for the evening, turning YDOUR into a space where cinema was not only watched, but actively experienced and reflected upon together."
        },
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
                    {/* <CardHeader>
                        <CardTitle>Ydour - يدور</CardTitle>
                    </CardHeader> */}
                    <CardContent>
                        <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                            {event.overview}
                        </p>
                    </CardContent>
                </Card>

                <section className="space-y-12">
                    {media.map((item, i) => (
                        <div
                            key={i}
                            className="grid md:grid-cols-2 gap-8 items-center"
                        >
                            {/* Text */}
                            <div
                                className={`text-muted-foreground ${i % 2 === 0 ? "md:order-2" : "md:order-1"
                                    }`}
                            >
                                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                <p>{item.caption}</p>
                            </div>

                            {/* Media */}
                            <div
                                className={`overflow-hidden rounded-xl ${i % 2 === 0 ? "md:order-1" : "md:order-2"
                                    }`}
                            >
                                {item.type === "image" ? (
                                    <img
                                        src={item.src}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <video
                                        src={item.src}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full rounded-xl"
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </section>



                <br />


                {/* Retrospective */}
                {/* <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Retrospective</CardTitle>
                        <CardDescription>Looking back at the experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="leading-relaxed text-muted-foreground whitespace-pre-line">
                            {event.retrospective}
                        </p>
                    </CardContent>
                </Card> */}

                {/* Highlights */}
                {/* <Card className="mb-8">
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
                </Card> */}

                {/* Gallery */}

                {/* <section>
                    <h2 className="text-3xl font-bold mb-6">Event Gallery</h2>
                    <EventGallerySlider images={event.gallery} />
                </section> */}


                {/* <section>
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
                </section> */}

                <br />

                <section>
                    <h2 className="text-3xl font-bold mb-6">Event Gallery</h2>
                    <EventGallerySlider images={event.gallery} />
                </section>

                <br />


                {/* Footer of event and call to action */}
                <Card className="mb-10">
                    <CardContent className="pt-10 pb-8 space-y-8">

                        {/* Quote */}
                        <div className="flex items-start justify-center gap-4">
                            <Clock className="w-6 h-6 text-muted-foreground mt-1" />
                            <blockquote className="italic text-xl leading-relaxed text-foreground">
                                “{event.quote.text}”
                            </blockquote>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-border" />

                        <div className="text-center space-y-4 py-6">
                            <p className="text-lg font-semibold tracking-wide text-foreground">
                                {event.quote.callToAction}
                            </p>

                            <div className="flex justify-center gap-6">
                                <a
                                    href="https://www.facebook.com/ftcahamhama/"
                                    target="_blank"
                                    className="hover:scale-125 w-10 h-10 transition-transform"
                                >
                                    <Facebook className="w-7 h-7 text-[#0866ff]" />
                                </a>
                                <a
                                    href="https://www.instagram.com/ftca.hlif/"
                                    target="_blank"
                                    className="hover:scale-125 w-10 h-10 transition-transform"
                                >
                                    <Instagram className="w-7 h-7 text-[#e7009a]" />
                                </a>
                                <a
                                    href="https://www.youtube.com/@ftcahammamlif/"
                                    target="_blank"
                                    className="hover:scale-125 w-10 h-10 transition-transform"
                                >
                                    <Youtube className="w-7 h-7 text-[#ff0033]" />
                                </a>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </div >
    );
}
