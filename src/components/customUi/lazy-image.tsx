import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ImageOff } from "lucide-react";
import { Loader } from "@/components/customUi/loader";
import { cn } from "@/lib/utils";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  loaderSize?: number;
  /** Shown instead of the image when `src` is empty or fails to load. */
  fallback?: React.ReactNode;
  /**
   * Above the fold (a page's main image, the first posters): fetched at once
   * and early, instead of when it nears the viewport.
   */
  priority?: boolean;
}

const subscribe = () => () => {};

export function LazyImage({
  loaderSize = 24,
  className,
  alt,
  src,
  fallback,
  priority = false,
  ...props
}: LazyImageProps) {
  // False while the page's HTML is being hydrated, true for an image mounted
  // later (a client-side page change, a filter).
  const mountedLater = useSyncExternalStore(subscribe, () => true, () => false);
  // Only images mounted later fade in. A prerendered image stays visible in
  // the HTML, so the browser paints it as soon as it arrives, before any
  // JavaScript runs (hiding it until hydration delayed the main image).
  const [fadeIn] = useState(mountedLater);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The image is in the server-rendered HTML, so the browser can finish (or
  // fail) loading it before React hydrates; the load/error events are then
  // already gone and onLoad/onError never fire. Read the element's state.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) {
      setLoading(false);
      setFailed(img.naturalWidth === 0);
    } else {
      setLoading(true);
      setFailed(false);
    }
  }, [src]);

  // No image to load (or it broke): show a static placeholder, never the loader.
  if (!src || failed) {
    return (
      <div
        className={cn("relative flex items-center justify-center bg-muted text-muted-foreground", className)}
        {...(alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true })}
      >
        {fallback ?? <ImageOff className="h-1/4 w-1/4 opacity-40" aria-hidden />}
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {/* Behind the image: an image still loading paints nothing, so the
          loader shows through until the picture covers it. */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* No caption: the alt text usually repeats a title shown next to the image. */}
          <Loader size={loaderSize} />
        </div>
      )}

      <img
        {...props}
        ref={imgRef}
        src={src}
        alt={alt}
        className={cn(
          "relative w-full h-full object-cover",
          fadeIn && "transition-opacity duration-300",
          fadeIn && (loading ? "opacity-0" : "opacity-100")
        )}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        onLoad={() => setLoading(false)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
