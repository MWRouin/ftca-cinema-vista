import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { LightboxState } from "@/hooks/useLightbox";

/**
 * Shared full-screen overlay chrome: portals to <body> (so no ancestor can
 * clip or reposition it), locks page scroll while open, and closes on
 * Escape, backdrop click, or the close button. Content comes as children.
 */
export function LightboxOverlay({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
}) {
  const { t } = useTranslation();

  useEffect(() => {
    // Hide the page scrollbar; pad the body so content doesn't shift.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label={t("a11y.close")}
        className="absolute top-4 right-4 z-10 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full"
      >
        <X />
      </button>
      {children}
    </div>,
    document.body
  );
}

/** Full-screen media overlay; renders nothing until an image or video is opened. */
export function Lightbox({ state }: { state: LightboxState }) {
  const { t } = useTranslation();
  if (!state.media) return null;
  const { type, src } = state.media;
  return (
    <LightboxOverlay onClose={state.close}>
      {type === "image" ? (
        <img
          src={src}
          alt={t("a11y.fullSizePreview")}
          className="max-w-full max-h-full object-contain select-none"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        // Starts muted so autoplay isn't blocked; controls let the user unmute.
        <video
          src={src}
          controls
          autoPlay
          muted
          loop
          playsInline
          className="max-w-full max-h-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </LightboxOverlay>
  );
}
