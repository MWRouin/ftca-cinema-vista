import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LazyImage } from "./lazy-image";
import { LIGHTBOX_BUTTON_CLASS, LightboxOverlay } from "./lightbox";

export function EventGallerySlider({ images }: { images: string[] }) {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToPrev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + images.length) % images.length : null
    );
  const goToNext = () =>
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % images.length : null
    );

  return (
    <>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6">
            {images.map((img, i) => (
              <div key={i} className="flex-[0_0_100%] sm:flex-[0_0_50%] pl-6">
                <button
                  type="button"
                  onClick={() => openLightbox(i)}
                  aria-label={t("a11y.viewFullSize", { name: t("a11y.galleryPhoto", { number: i + 1 }) })}
                  aria-haspopup="dialog"
                  className="group relative block w-full aspect-[16/9] overflow-hidden rounded-lg cursor-zoom-in focus-visible:outline-none"
                >
                  <LazyImage src={img} alt="" className="w-full h-full object-cover" />
                  {/* Focus ring drawn over the photo: the carousel clips anything
                      outside the slide, and an inset ring would sit under the image.
                      Green with a white inner line shows on dark and light photos. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-lg group-focus-visible:shadow-[inset_0_0_0_4px_hsl(var(--primary)),inset_0_0_0_6px_white]"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label={t("a11y.previousImage")}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          aria-label={t("a11y.nextImage")}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <LightboxOverlay
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
          label={t("a11y.galleryPhoto", { number: lightboxIndex + 1 })}
        >
          {/* Prev */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            aria-label={t("a11y.previousImage")}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 ${LIGHTBOX_BUTTON_CLASS}`}
          >
            <ChevronLeft />
          </button>

          {/* Image */}
          <img
            src={images[lightboxIndex]}
            alt={t("a11y.galleryPhoto", { number: lightboxIndex + 1 })}
            className="max-w-full max-h-full object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            aria-label={t("a11y.nextImage")}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 ${LIGHTBOX_BUTTON_CLASS}`}
          >
            <ChevronRight />
          </button>

          {/* Counter */}
          <div aria-live="polite" className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </LightboxOverlay>
      )}
    </>
  );
}