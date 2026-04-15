import { ChevronLeft, ChevronRight, X } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useState } from "react";

export function EventGallerySlider({ images }: { images: string[] }) {
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
                <div
                  className="aspect-[16/9] overflow-hidden rounded-lg cursor-zoom-in"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={img}
                    alt={`Event gallery photo ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next image"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full"
          >
            <X />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full"
          >
            <ChevronLeft />
          </button>

          {/* Image */}
          <img
            src={images[lightboxIndex]}
            alt={`Event gallery photo ${lightboxIndex + 1}`}
            className="max-w-full max-h-full object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full"
          >
            <ChevronRight />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}