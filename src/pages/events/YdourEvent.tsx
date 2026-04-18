import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageTitle } from "@/components/customUi/page-title";
import { Calendar, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import { EventGallerySlider } from "@/components/customUi/event-gallery-slider";
import MetaHeader from '@/lib/metadata/metadata';
import { PAGE_SEO } from '@/lib/metadata/seo-constants';
import { LazyImage } from "@/components/customUi/lazy-image";

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

There are important moments when the community comes together, such as FIFAK, where screenings and debates create a strong sense of collective experience. However, these opportunities happen only once a year. While FIFAK may be the biggest amateur cinema event, it shouldn’t be the only space where this community exists.`,

        quote: {
            text: "Stay tuned for the next edition!",
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
            title: "The Experience",
            caption: `The screening went smoothly. We expected a chill coffeeshop session, some people interacting with the film and discussion, others simply having a coffee with friends and passing by.

Instead, the event quickly filled up. The café was full before the projection even started, and many people couldn’t find a place. We didn’t expect this number of attendees. `
        },
        {
            type: "image",
            src: "/events/ydour/theplace.jpg",
            title: "The Place",
            caption: `Café Culturel Liberthé, located in Lafayette, downtown Tunis, has long been a gathering point for cultural events.

Thanks to its history and active community, Liberthé attracts an audience that is curious, engaged, and always up to date with cultural initiatives. The café has been hosting events for years, and successfully so, making it the perfect place for an event like YDOUR.`
        },
        {
            type: "video",
            src: "/events/ydour/talk.webm",
            title: "Post-Screening Discussion",
            caption: `We initially worried that attendees might feel timid during the debate, but the discussions exceeded our expectations. Many people actively engaged, creating thoughtful and meaningful exchanges.

From the start, we had structured the screening into three parts, each followed by a discussion. While intended to deepen engagement, this format gradually slowed the event. As the evening went on, some attendees showed signs of fatigue and distraction, slowly leaving. This highlighted that the structure, rather than the debate itself, should be reconsidered for future editions.`
        },
    ];


    return (
        <>
        <MetaHeader {...PAGE_SEO["events/ydour"]} />
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

                    <PageTitle title={event.title} />

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
                                <p className="whitespace-pre-line">{item.caption}</p>
                            </div>

                            {/* Media */}
                            <div
                                className={`overflow-hidden rounded-xl ${i % 2 === 0 ? "md:order-1" : "md:order-2"
                                    }`}
                            >
                                {item.type === "image" ? (
                                    <LazyImage
                                        src={item.src}
                                        alt={item.title || `Event highlight ${i + 1}`}
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

                <br />

                <section>
                    <h2 className="text-3xl font-bold mb-6">Event Gallery</h2>
                    <EventGallerySlider images={event.gallery} />
                </section>

                <br />

                <section className="space-y-12">

                    <div className="items-center">
                        {/* Text */}
                        <div
                            className="text-muted-foreground">
                            <p className="whitespace-pre-line text-center">
                                Building on this first edition, YDOUR will continue to evolve as a space for shared viewing and dialogue.
                                <br />Future editions will refine their rhythm and structure while preserving what matters most: closeness, exchange, and accessibility.
                                <br />Attendees can also expect new cultural layers and surprises that will enrich the experience even further.`,
                            </p>
                        </div>
                    </div>
                </section>

                <br />


                {/* Footer of event and call to action */}
                <Card className="mb-10">
                    <CardContent className="pt-10 pb-8 space-y-8">

                        {/* Quote */}
                        <div className="flex items-start justify-center gap-4">
                            {<Clock className="w-6 h-6 text-muted-foreground mt-1" />}
                            {<blockquote className="italic text-xl leading-relaxed text-foreground">
                                “{event.quote.text}”
                            </blockquote>}
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
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="hover:scale-125 w-10 h-10 transition-transform"
                                >
                                    <Facebook className="w-7 h-7 text-[#0866ff]" />
                                </a>
                                <a
                                    href="https://www.instagram.com/ftca.hlif/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="hover:scale-125 w-10 h-10 transition-transform"
                                >
                                    <Instagram className="w-7 h-7 text-[#e7009a]" />
                                </a>
                                <a
                                    href="https://www.youtube.com/@ftcahammamlif/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="YouTube"
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
        </>
    );
}
