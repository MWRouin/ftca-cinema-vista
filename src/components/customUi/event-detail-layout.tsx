import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/customUi/back-button";
import { ElementTitle } from "@/components/customUi/element-title";
import { SocialLinks } from "@/components/customUi/social-links";
import { EventGallerySlider } from "@/components/customUi/event-gallery-slider";
import { LazyImage } from "@/components/customUi/lazy-image";
import { Lightbox } from "@/components/customUi/lightbox";
import { useLightbox } from "@/hooks/useLightbox";
import ShareActions from "@/components/customUi/share-actions";
import MetaHeader from "@/lib/metadata/metadata";
import { PAGE_SEO } from "@/lib/metadata/seo-constants";
import { PageContainer } from "@/components/customUi/page-container";

export type EventMedia = { type: "image" | "video"; src: string };

export type EventDetailData = {
  /** i18n key under eventDetail.json (e.g. "ydour"). */
  slug: string;
  /** PAGE_SEO key (e.g. "events/ydour"). */
  seoKey: string;
  heroImage: string;
  /** Alternating text/media rows; captions come from `${slug}.media.${i}`. */
  media: EventMedia[];
  gallery: string[];
  /** Optional extra block inside the overview card (e.g. a follow/venue link). */
  overviewExtra?: ReactNode;
  /** Render the `${slug}.closing` paragraph after the gallery. */
  hasClosing?: boolean;
};

/** Resolved, translated event copy shared by the header and CTA sub-pieces. */
type EventCopy = {
  title: string;
  category: string;
  status: string;
  date: string;
  location: string;
  overview: string;
  quoteText: string;
  quoteCta: string;
};

/** Badges + title + date/location + share actions. */
function EventHeader({ event }: { event: EventCopy }) {
  return (
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

        <div className="self-start sm:self-auto">
          <ShareActions title={event.title} text={event.overview} />
        </div>
      </div>
    </div>
  );
}

/** Two-column alternating text/media rows; images and videos open in a shared lightbox. */
function AlternatingMedia({ media, slug }: { media: EventMedia[]; slug: string }) {
  const { t } = useTranslation("eventDetail");
  const lightbox = useLightbox();

  return (
    <section className="space-y-12">
      {media.map((item, i) => (
        <div key={i} className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <div className={`text-muted-foreground ${i % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
            <h3 className="text-xl font-semibold mb-3">{t(`${slug}.media.${i}.title`)}</h3>
            <p className="whitespace-pre-line">{t(`${slug}.media.${i}.caption`)}</p>
          </div>

          {/* Media */}
          <div className={`overflow-hidden rounded-lg ${i % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
            {item.type === "image" ? (
              <div className="cursor-zoom-in" onClick={() => lightbox.open(item.src)}>
                <LazyImage
                  src={item.src}
                  alt={t(`${slug}.media.${i}.title`)}
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
                className="w-full rounded-lg cursor-zoom-in"
                onClick={() => lightbox.open(item.src, "video")}
              />
            )}
          </div>
        </div>
      ))}

      <Lightbox state={lightbox} />
    </section>
  );
}

/** Quote + call-to-action + social row footer card. */
function EventCtaCard({ event, className }: { event: EventCopy; className?: string }) {
  return (
    <Card className={className}>
      <CardContent className="pt-10 pb-8 space-y-8">
        {/* Quote */}
        <div className="flex items-start justify-center gap-4">
          <Clock className="w-6 h-6 text-muted-foreground mt-1" />
          <blockquote className="italic text-xl leading-relaxed text-foreground">
            “{event.quoteText}”
          </blockquote>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        <div className="text-center space-y-4 py-6">
          <p className="text-lg font-semibold tracking-wide text-foreground">{event.quoteCta}</p>
          <SocialLinks variant="brand" />
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * The shared event-detail page. Given a small data object, renders the identical
 * layout the four event pages used to copy-paste: back link, hero, header,
 * overview, alternating media (with lightbox), gallery, optional closing, and
 * the quote/CTA footer. Page files supply data only.
 */
export function EventDetailLayout({ data }: { data: EventDetailData }) {
  const { t } = useTranslation("eventDetail");
  const { slug } = data;

  const event: EventCopy = {
    title: t(`${slug}.title`),
    category: t(`${slug}.category`),
    status: t(`${slug}.status`),
    date: t(`${slug}.date`),
    location: t(`${slug}.location`),
    overview: t(`${slug}.overview`),
    quoteText: t(`${slug}.quoteText`),
    quoteCta: t(`${slug}.quoteCta`),
  };

  return (
    <>
      <MetaHeader {...PAGE_SEO[data.seoKey]} />
      <PageContainer width="5xl">
        <BackButton to="/events" label={t("backToEvents")} />

        {/* Hero */}
        <div className="aspect-[16/9] overflow-hidden rounded-lg mb-10">
          <img src={data.heroImage} alt={event.title} className="w-full h-full object-cover" />
        </div>

        <EventHeader event={event} />

        {/* Overview */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
              {event.overview}
            </p>
            {data.overviewExtra}
          </CardContent>
        </Card>

        <AlternatingMedia media={data.media} slug={slug} />

        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6">{t("gallery")}</h2>
          <EventGallerySlider images={data.gallery} />
        </section>

        {data.hasClosing && (
          <section className="mt-12">
            <p className="whitespace-pre-line text-center text-muted-foreground">
              {t(`${slug}.closing`)}
            </p>
          </section>
        )}

        <EventCtaCard event={event} className="mt-16 mb-10" />
      </PageContainer>
    </>
  );
}
