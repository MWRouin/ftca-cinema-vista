import { EventDetailLayout } from "@/components/customUi/event-detail-layout";

export default function YdourEvent() {
  return (
    <EventDetailLayout
      data={{
        slug: "ydour",
        seoKey: "events/ydour",
        heroImage: "/events/ydour/ydour-title.jpg",
        media: [
          { type: "image", src: "/About/ydour_web_optimized.jpg" },
          { type: "image", src: "/events/ydour/theplace.jpg" },
          { type: "video", src: "/events/ydour/talk.webm" },
        ],
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
        hasClosing: true,
      }}
    />
  );
}
