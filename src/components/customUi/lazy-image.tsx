import { useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import { Loader } from "@/components/customUi/loader";
import { cn } from "@/lib/utils";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  loaderSize?: number;
  /** Shown instead of the image when `src` is empty or fails to load. */
  fallback?: React.ReactNode;
}

export function LazyImage({
  loaderSize = 24,
  className,
  alt,
  src,
  fallback,
  ...props
}: LazyImageProps) {
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
          "w-full h-full object-cover transition-opacity duration-300",
          loading ? "opacity-0" : "opacity-100"
        )}
        loading="lazy"
        onLoad={() => setLoading(false)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
