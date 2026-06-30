import { BackButton } from "@/components/customUi/back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ElementTitle } from '@/components/customUi/element-title';
import { Calendar, MapPin, Clock } from "lucide-react";
import { SocialLinks } from "@/components/customUi/social-links";
import { useTranslation } from "react-i18next";
import { EventGallerySlider } from "@/components/customUi/event-gallery-slider";
import MetaHeader from '@/lib/metadata/metadata';
import { PAGE_SEO } from '@/lib/metadata/seo-constants';
import { LazyImage } from "@/components/customUi/lazy-image";
import ShareActions from "@/components/customUi/share-actions";

const SLUG = "ydour";

export default function YdourEvent() {
    const { t } = useTranslation("eventDetail");

    const event = {
        title: t(`${SLUG}.title`),
        category: t(`${SLUG}.category`),
        status: t(`${SLUG}.status`),
        date: t(`${SLUG}.date`),
        location: t(`${SLUG}.location`),
        image: "/events/ydour/ydour-title.jpg",
        overview: t(`${SLUG}.overview`),
        quote: {
            text: t(`${SLUG}.quoteText`),
            callToAction: t(`${SLUG}.quoteCta`),
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
        { type: "image", src: "/About/ydour_web_optimized.jpg" },
        { type: "image", src: "/events/ydour/theplace.jpg" },
        { type: "video", src: "/events/ydour/talk.webm" },
    ];

    return (
        <>
            <MetaHeader {...PAGE_SEO["events/ydour"]} />
            <div className="min-h-screen py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Back */}
                    <BackButton to="/events" label={t("backToEvents")} />

                    {/* Hero */}
                    <div className="aspect-[16/9] overflow-hidden rounded-lg mb-10">
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

                        <ElementTitle title={event.title} />

                        <div className="flex flex-col gap-3 mt-2 sm:flex-row sm:items-center sm:justify-between">
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

                            {/* Actions */}
                            <div className="self-start sm:self-auto">
                                <ShareActions title={event.title} text={event.overview} />
                            </div>
                        </div>
                    </div>

                    {/* Overview */}
                    <Card className="mb-8">
                        <CardContent className="pt-6">
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
                                    <h3 className="text-xl font-semibold mb-3">{t(`${SLUG}.media.${i}.title`)}</h3>
                                    <p className="whitespace-pre-line">{t(`${SLUG}.media.${i}.caption`)}</p>
                                </div>

                                {/* Media */}
                                <div
                                    className={`overflow-hidden rounded-lg ${i % 2 === 0 ? "md:order-1" : "md:order-2"
                                        }`}
                                >
                                    {item.type === "image" ? (
                                        <LazyImage
                                            src={item.src}
                                            alt={t(`${SLUG}.media.${i}.title`)}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <video
                                            src={item.src}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="w-full rounded-lg"
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </section>

                    <br />

                    <br />

                    <section>
                        <h2 className="text-3xl font-bold mb-6">{t("gallery")}</h2>
                        <EventGallerySlider images={event.gallery} />
                    </section>

                    <br />

                    <section className="space-y-12">
                        <div className="items-center">
                            {/* Text */}
                            <div className="text-muted-foreground">
                                <p className="whitespace-pre-line text-center">
                                    {t(`${SLUG}.closing`)}
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

                                <SocialLinks variant="brand" />
                            </div>

                        </CardContent>
                    </Card>
                </div>
            </div >
        </>
    );
}
