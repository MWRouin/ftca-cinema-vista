import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ElementTitle } from '@/components/customUi/element-title';
import { Calendar, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import { EventGallerySlider } from "@/components/customUi/event-gallery-slider";
import MetaHeader from '@/lib/metadata/metadata';
import { PAGE_SEO } from '@/lib/metadata/seo-constants';
import { X } from "lucide-react";
import { useState } from "react";
import { LazyImage } from "@/components/customUi/lazy-image";
import ShareActions from "@/components/customUi/share-actions";
import { LocalLink } from "@/i18n/locale";

const SLUG = "ydour-v2";

export default function YdourEventV2() {
    const { t } = useTranslation("eventDetail");

    const event = {
        title: t(`${SLUG}.title`),
        category: t(`${SLUG}.category`),
        status: t(`${SLUG}.status`),
        date: t(`${SLUG}.date`),
        location: t(`${SLUG}.location`),
        image: "/events/ydour2/ydour2Hero.jpg",
        overview: t(`${SLUG}.overview`),
        quote: {
            text: t(`${SLUG}.quoteText`),
            callToAction: t(`${SLUG}.quoteCta`),
        },
        gallery: [
            "/events/ydour2/ydour2.webp",
            "/events/ydour2/ydour2_2.jpg",
            "/events/ydour2/ydour2_3.jpg",
            "/events/ydour2/ydour2_4.jpg",
        ],
    };

    const media = [
        { type: "image", src: "/events/ydour2/ydour2_4.jpg" },
        { type: "image", src: "/events/ydour2/lecurie.png" },
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
                            <LocalLink to="/events">{t("backToEvents")}</LocalLink>
                        </Button>
                    </div>

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
                            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                                <Trans
                                    t={t}
                                    i18nKey={`${SLUG}.follow`}
                                    components={{
                                        ig: (
                                            <a
                                                href="https://www.instagram.com/ydour.cine/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline hover:text-foreground"
                                            />
                                        ),
                                        venue: (
                                            <a
                                                href="https://www.instagram.com/lecurie.tn/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline hover:text-foreground"
                                            />
                                        ),
                                    }}
                                />
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
                                    className={`overflow-hidden rounded-lg ${i % 2 === 0 ? "md:order-1" : "md:order-2"}`}
                                >
                                    {item.type === "image" ? (
                                        <div
                                            className="cursor-zoom-in"
                                            onClick={() => setLightboxSrc(item.src)}
                                        >
                                            <LazyImage
                                                src={item.src}
                                                alt={t(`${SLUG}.media.${i}.title`)}
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
                                            className="w-full rounded-lg"
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
                        <h2 className="text-3xl font-bold mb-6">{t("gallery")}</h2>
                        <EventGallerySlider images={event.gallery} />
                    </section>
                </div>
            </div >
        </>
    );
}
