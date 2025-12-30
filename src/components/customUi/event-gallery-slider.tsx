import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

export function EventGallerySlider({ images }: { images: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-6">
          {images.map((img, i) => (
            <div key={i} className="flex-[0_0_100%] sm:flex-[0_0_50%] pl-6">
              <div className="aspect-[16/9] overflow-hidden rounded-lg">
                <img
                  src={img}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
