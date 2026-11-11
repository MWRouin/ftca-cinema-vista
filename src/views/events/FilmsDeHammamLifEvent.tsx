import { EventDetailLayout } from "@/components/customUi/event-detail-layout";

export default function FilmsDeHammamLifEvent() {
  return (
    <EventDetailLayout
      data={{
        slug: "films-de-hammamlif",
        seoKey: "events/films-de-hammamlif",
        heroImage: "/events/FilmsDeHammamLif/FilmsDeHammamLif-title.jpg",
        media: [
          { type: "image", src: "/events/FilmsDeHammamLif/theExperience.jpg" },
          { type: "image", src: "/events/FilmsDeHammamLif/thePlace.jpg" },
          { type: "image", src: "/events/FilmsDeHammamLif/postScreening.jpg" },
          { type: "image", src: "/events/FilmsDeHammamLif/clubExhibition.jpg" },
        ],
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
      }}
    />
  );
}
