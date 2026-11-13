import { useCallback, useState } from "react";

/** `alt` names the media in the lightbox (dialog label and image alt). */
export type LightboxMedia = { type: "image" | "video"; src: string; alt?: string };

/**
 * Lightbox open/close state. Kept as a hook so a gallery can own one instance
 * and open it from any number of thumbnails.
 */
export function useLightbox() {
  const [media, setMedia] = useState<LightboxMedia | null>(null);
  const open = useCallback(
    (src: string, type: LightboxMedia["type"] = "image", alt?: string) => setMedia({ type, src, alt }),
    []
  );
  const close = useCallback(() => setMedia(null), []);
  return { media, open, close };
}

export type LightboxState = ReturnType<typeof useLightbox>;
