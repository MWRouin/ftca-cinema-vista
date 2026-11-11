import { Trans, useTranslation } from "react-i18next";
import { EventDetailLayout } from "@/components/customUi/event-detail-layout";

export default function AfterworkMovienight() {
  const { t } = useTranslation("eventDetail");

  return (
    <EventDetailLayout
      data={{
        slug: "afterwork",
        seoKey: "events/afterwork-movienight",
        heroImage: "/events/afterworkMovienight/hero.jpg",
        media: [
          { type: "image", src: "/events/afterworkMovienight/experience.jpg" },
          { type: "image", src: "/events/afterworkMovienight/watchingmovies.jpg" },
          { type: "video", src: "/events/afterworkMovienight/Afterworkmovienight.webm" },
          { type: "video", src: "/events/afterworkMovienight/DayoneLogoAnimated.webm" },
          { type: "image", src: "/events/afterworkMovienight/community.jpg" },
        ],
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
        overviewExtra: (
          <>
            <br />
            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
              <Trans
                t={t}
                i18nKey="afterwork.venueLink"
                components={{
                  venue: (
                    <a
                      href="https://www.instagram.com/dayone.tn/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-foreground"
                    />
                  ),
                }}
              />
            </p>
          </>
        ),
      }}
    />
  );
}
