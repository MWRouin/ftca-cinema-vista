import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageTitle } from "@/components/customUi/page-title";
import { Calendar, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import { EventGallerySlider } from "@/components/customUi/event-gallery-slider";

export default function FilmsDeHammamLifEvent() {
    const event = {
        title: "Films de Hammam-Lif",
        category: "Screening & Exhibition",
        status: "Past Event",
        date: "December 27, 2025",
        location: "Complexe Culturel Ali Ben Ayed",
        image: "/events/FilmsDeHammamLif/FilmsDeHammamLif-title.jpg",

        overview: `
"Films de Hammam-Lif" was held on December 27, 2025, at the Complexe Culturel Ali Ben Ayed in Hammam-Lif.

The event was conceived as a tribute to the once-vibrant cinematic culture of Hammam-Lif, a culture that has faded over the years as cinemas closed and cultural activity slowly disappeared.

Through this gathering, we invited former FTCA members and longtime cineastes from Hammam-Lif to watch films produced by our FTCA Hammam-Lif club.

The goal was to revive, even briefly, a spirit that had been dormant for years, and perhaps spark something new among the younger generation of "Hammamlifois", who have grown increasingly distant from cinema clubs and cultural initiatives. `,
        quote: {
            text: "Stay tuned to discover upcoming events!",
            callToAction: "Follow us to get the lates news!",
        },

        gallery: [
            "/events/FilmsDeHammamLif/gal1.jpg",
            "/events/FilmsDeHammamLif/gal2.jpg",
            "/events/FilmsDeHammamLif/gal3.jpg",
            "/events/FilmsDeHammamLif/gal4.jpg",
            "/events/FilmsDeHammamLif/gal5.jpg",
            "/events/FilmsDeHammamLif/gal6.jpg",
            "/events/FilmsDeHammamLif/gal7.jpg",
            "/events/FilmsDeHammamLif/gal8.jpg",
            "/events/FilmsDeHammamLif/gal9.jpg",
            "/events/FilmsDeHammamLif/gal10.jpg",
            "/events/FilmsDeHammamLif/gal11.jpg",
            "/events/FilmsDeHammamLif/gal12.jpg",
            "/events/FilmsDeHammamLif/gal13.jpg",
            "/events/FilmsDeHammamLif/gal14.jpg",
            "/events/FilmsDeHammamLif/gal15.jpg",
            "/events/FilmsDeHammamLif/gal16.jpg",
            "/events/FilmsDeHammamLif/gal17.jpg",
        ],
    };

    const media = [
        {
            type: "image",
            src: "/events/FilmsDeHammamLif/theExperience.jpg",
            title: "The Experience",
            caption: `The turnout exceeded our expectations.
Even though the venue can hold over 300 people, welcoming more than 100 attendees felt like a real milestone, especially because many "Hammamlifois" were joined by people who traveled from outside the city just to attend the event.
The atmosphere leaned towards the official side, but overall the energy was positive and supportive.

There were also some challenges. The projection quality was weak, the scaling wasn't adjusted to the screen.
The projector itself altered the film’s colors. These issues made us realize the need for a proper projection booth workshop to learn how to handle screenings in a more professional way.`
        },
        {
            type: "image",
            src: "/events/FilmsDeHammamLif/thePlace.jpg",
            title: "The Place",
            caption: `The Complexe Culturel Ali Ben Ayed proved to be an ideal venue for this event. Its size, history, and location give it the potential for much more than a one-day screening.
Being inside such a significant cultural space highlighted the possibility of future, larger initiatives, maybe even a festival or parallel programs like live music events or extended screenings.`
        },
        {
            type: "image",
            src: "/events/FilmsDeHammamLif/postScreening.jpg",
            title: "Post-Screening Discussion",
            caption: `The debate did not unfold as we had hoped. The hall was simply too large to create a close, interactive atmosphere, and as a team, we struggled to animate the discussion in a space of that scale. We’re not yet used to managing such a big room, so the exchanges felt distant and didn’t develop the way we imagined.

Despite this, the older cineastes appreciated the initiative. Some have shared memories with each other and connected with the younger generation. It became clear that the desire for more opportunities like this still exists, and that the format just needs to be adapted.`
        },
        {
            type: "image",
            src: "/events/FilmsDeHammamLif/clubExhibition.jpg",
            title: "Club Exhibition",
            caption: `The club exhibition was one of the strongest moments of the event. Those who visited were genuinely surprised and impressed. From the outside, the club may look like a simple garage, but once inside, visitors discovered its long and rich history dating back to 1964.

People asked questions, explored the archives, and engaged with the space with real curiosity. For many young attendees, it was their first time encountering this cultural legacy up close. For the older cineastes, it felt like a return to a place filled with memories.

This encounter between generations made us realize something important: the club still has the power to bring people together. The success of the exhibition showed us that we need to make use of this space more often, through exhibitions, screenings, open days, and any initiative that keeps its heritage alive.`
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
                            { <blockquote className="italic text-xl leading-relaxed text-foreground">
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
