import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { LightboxState } from "@/hooks/useLightbox";

/** Focus ring for buttons drawn over the dark backdrop. */
export const LIGHTBOX_BUTTON_CLASS =
  "text-white bg-white/10 hover:bg-white/20 p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

const FOCUSABLE = 'button, [href], video[controls], [tabindex]:not([tabindex="-1"])';

/**
 * Shared full-screen overlay chrome: portals to <body> (so no ancestor can
 * clip or reposition it), locks page scroll while open, and closes on
 * Escape, backdrop click, or the close button. Content comes as children.
 *
 * It is a modal dialog: focus moves to the close button on open, Tab stays
 * inside, and focus returns to whatever opened it (the thumbnail) on close.
 * With `onPrev`/`onNext`, the arrow keys step through the images.
 */
export function LightboxOverlay({
  onClose,
  onPrev,
  onNext,
  label,
  children,
}: {
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  /** Accessible name of the dialog; defaults to "Full size preview". */
  label?: string;
  children: ReactNode;
}) {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

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
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => opener?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        // In a right-to-left page the previous image is on the right.
        const rtl = document.documentElement.dir === "rtl";
        const step = (e.key === "ArrowRight") !== rtl ? onNext : onPrev;
        if (step) {
          e.preventDefault();
          step();
        }
      } else if (e.key === "Tab" && dialogRef.current) {
        const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        const inside = dialogRef.current.contains(document.activeElement);
        if (e.shiftKey && (document.activeElement === first || !inside)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onPrev, onNext]);

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={label ?? t("a11y.fullSizePreview")}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={t("a11y.close")}
        className={`absolute top-4 right-4 z-10 ${LIGHTBOX_BUTTON_CLASS}`}
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
  const { type, src, alt } = state.media;
  return (
    <LightboxOverlay onClose={state.close} label={alt}>
      {type === "image" ? (
        <img
          src={src}
          alt={alt ?? t("a11y.fullSizePreview")}
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
          aria-label={alt}
          className="max-w-full max-h-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </LightboxOverlay>
  );
}
