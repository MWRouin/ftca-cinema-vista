import { Trans, useTranslation } from "react-i18next";
import { EventDetailLayout } from "@/components/customUi/event-detail-layout";

export default function YdourEventV2() {
  const { t } = useTranslation("eventDetail");

  return (
    <EventDetailLayout
      data={{
        slug: "ydour-v2",
        seoKey: "events/ydour-v2",
        heroImage: "/events/ydour2/ydour2Hero.jpg",
        media: [
          { type: "image", src: "/events/ydour2/ydour2_4.jpg" },
          { type: "image", src: "/events/ydour2/lecurie.png" },
        ],
        gallery: [
          "/events/ydour2/ydour2.webp",
          "/events/ydour2/ydour2_2.jpg",
          "/events/ydour2/ydour2_3.jpg",
          "/events/ydour2/ydour2_4.jpg",
        ],
        overviewExtra: (
          <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
            <Trans
              t={t}
              i18nKey="ydour-v2.follow"
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
        ),
      }}
    />
  );
}
