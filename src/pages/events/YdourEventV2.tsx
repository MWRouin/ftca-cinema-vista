import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageTitle } from "@/components/customUi/page-title";
import { Calendar, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import { EventGallerySlider } from "@/components/customUi/event-gallery-slider";
import MetaHeader from '@/lib/metadata/metadata';
import { PAGE_SEO } from '@/lib/metadata/seo-constants';
import { X } from "lucide-react";
import { useState } from "react";


export default function YdourEventV2() {
    // inside your component:
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
    const event = {
        title: "Ydour - يدور (2nd Edition)",
        category: "Screenings • Workshops • Exhibition • Music",
        status: "Upcoming Event",
        date: "May 15–17, 2026",
        location: "L’Écurie, Lafayette – Tunis",
        image: "/events/ydour2/ydour2_2.jpg",

        overview: `
We are back again with the second edition of YDOUR / يدور.

A space dedicated to amateur cinema. - من أجل سينما الهواة

Over three days, YDOUR brings together filmmakers, artists, and curious minds through screenings, discussions, workshops, exhibitions, and music.

Following the energy of the first edition, this new chapter expands the experience into a richer and more open cultural space.

`,

        quote: {
            text: "Places are limited — reservation details coming soon.",
            callToAction: "Stay tuned and follow us for updates.",
        },

        gallery: [
            "/events/ydour2/ydour2.webp",
            "/events/ydour2/ydour2_2.jpg",
            "/events/ydour2/ydour2_3.jpg",
            "/events/ydour2/ydour2_4.jpg",
        ],
    };

    const media = [
        {
            type: "image",
            src: "/events/ydour2/ydour2_4.jpg",
            title: "Event Program",
            caption: `Screenings & Debate:
From the 1980s to the present, a selection of FTCA Hammam-Lif films. After screening, there is an open discussion.

Workshops:
Practical lessons encompassing the fundamentals of filmmaking. Anyone who wishes to learn and try new things is welcome.

Photo Exhibition:
A collective exhibition of works across generations, exploring different visual themes.

Music:
A curated music program fostering an area for gathering and exchange, showcasing local alternative sounds.`
        },
        {
            type: "image",
            src: "/events/ydour2/lecurie.png",
            title: "The place",
            caption: `L’Écurie,

📍Tunis • Lafayette - Belvédère ,

is a cultural space that welcomes artistic expression and hosts a variety of creative activities and events.

@lecurie.tn`
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
                            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                                Follow the event on{" "}
                                <a
                                    href="https://www.instagram.com/ydour.cine/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-foreground"
                                >
                                    Instagram
                                </a>{" "}
                                and discover the venue{" "}
                                <a
                                    href="https://www.instagram.com/lecurie.tn/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-foreground"
                                >
                                    L’Écurie
                                </a>.
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
                                    className={`overflow-hidden rounded-xl ${i % 2 === 0 ? "md:order-1" : "md:order-2"}`}
                                >
                                    {item.type === "image" ? (
                                        <div
                                            className="cursor-zoom-in"
                                            onClick={() => setLightboxSrc(item.src)}
                                        >
                                            <img
                                                src={item.src}
                                                alt={item.title || `Event highlight ${i + 1}`}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
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

                                {/* Lightbox — outside the map, once at component root level */}
                                {lightboxSrc && (
                                    <div
                                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
                                        onClick={() => setLightboxSrc(null)}
                                    >
                                        <button
                                            onClick={() => setLightboxSrc(null)}
                                            aria-label="Close"
                                            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full"
                                        >
                                            <X />
                                        </button>
                                        <img
                                            src={lightboxSrc}
                                            alt="Full size preview"
                                            className="max-w-full max-h-full object-contain select-none"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </section>

                    <br />

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


                    <br />

                    <section>
                        <h2 className="text-3xl font-bold mb-6">Event Gallery</h2>
                        <EventGallerySlider images={event.gallery} />
                    </section>
                </div>
            </div >
        </>
    );
}
