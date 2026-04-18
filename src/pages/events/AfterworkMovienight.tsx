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
import { LazyImage } from "@/components/customUi/lazy-image";


export default function AfterworkMovienight() {
    const event = {
        title: "Afterwork - Movie Night",
        category: "Screenings & Discussion",
        status: "Past Event",
        date: "January 28, 2026",
        location: "DayOne, Marsa – Tunis",
        image: "/events/afterworkMovienight/hero.jpg",

        overview: `
"Afterwork – Movie Night" is an intimate film screening and discussion experience by the Hammam-Lif Amateur Filmmakers' Club. Held at Day One, a cozy limited-capacity space, the event begins with an introduction to the federation, the club, and its activities, before bringing together filmmakers and audience members to discover a selection of short films and engage in conversations around their creative process.

More than just a screening, it’s a moment of exchange: from idea to screen, we explore writing, directing, sound, and visual choices through open discussions with the directors.
`,

        quote: {
            text: "Filmmaking is not about budget, it’s about ideas, intention, and vision.",
            callToAction: "Stay tuned and follow us for updates.",
        },

        gallery: [
            "/events/afterworkMovienight/IMG_2779.jpeg",
            "/events/afterworkMovienight/IMG_2788.jpeg",
            "/events/afterworkMovienight/IMG_2795.jpeg",
            "/events/afterworkMovienight/IMG_2808.jpeg",
            "/events/afterworkMovienight/IMG_2816.jpeg",
            "/events/afterworkMovienight/IMG_2818.jpeg",
            "/events/afterworkMovienight/IMG_8696.jpeg",
            "/events/afterworkMovienight/IMG_8701.jpeg",
            "/events/afterworkMovienight/IMG_8696.jpeg",
            "/events/afterworkMovienight/IMG_8701.jpeg",
        ],
    };

    const media = [
        {
            type: "image",
            src: "/events/afterworkMovienight/experience.jpg",
            title: "The Experience",
            caption: `Step into a warm, intimate setting designed for focus and exchange. This is not a passive screening, but a shared moment where everyone is involved.

From the first frame to the final discussion, the atmosphere encourages curiosity, reflection, and genuine interaction between the audience and the filmmakers.`
        },
        {
            type: "image",
            src: "/events/afterworkMovienight/watchingmovies.jpg",
            title: "The Program",
            caption: `The evening features a selection of our club's short films, each offering a distinct voice and approach:

- And Then, There Was One (2024) — Khalil Said & Wadii Klaii
- Sire Ex Machina (2023) — Safa Khiari
- Wed Trabelsia (2025) — Wadii Klaii

The screenings are followed by an open exchange with the directors.`
        },
        {
            type: "video",
            src: "/events/afterworkMovienight/Afterworkmovienight.webm",
            title: "Post-Screening Discussion",
            caption: `Together with the directors, we break down each work from idea to execution: writing, directing, sound design, visual composition, and on-set choices. The goal is not only to understand the films, but to demystify the filmmaking process.

Every question is welcome, every perspective adds to the conversation. It’s a moment of shared learning and connection between filmmakers and audience.`
        },
        {
            type: "video",
            src: "/events/afterworkMovienight/DayoneLogoAnimated.webm",
            title: "The place",
            caption: `DayOne,📍La Marsa • Tunis,

is a cultural space that welcomes artistic expression and hosts a variety of creative activities and events.

@dayone.tn`
        },
        {
            type: "image",
            src: "/events/afterworkMovienight/community.jpg",
            title: "Community & Spirit",
            caption: `The event reflects the vision of the Hammam-Lif Amateur Filmmakers' Club: making cinema accessible, collaborative, and alive.

We believe filmmaking is not about budget, but about ideas, intention, and vision. Whether you’re a filmmaker, a curious viewer, or just discovering this world, you are part of the experience.`
        },
    ];

    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

    return (
        <>
            <MetaHeader {...PAGE_SEO["events/ydour-v2"]} />
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
                            <br/>
                            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                                Discover the venue{" "}
                                <a
                                    href="https://www.instagram.com/dayone.tn/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-foreground"
                                >
                                    DayOne
                                </a>.
                            </p>
                        </CardContent>
                    </Card>

                    <section className="space-y-12">
                        {media.map((item, i) => (
                            <div
                                key={i}
                                className="grid md:grid-cols-2 gap-8 items-center py-4"
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
                                            <LazyImage
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
