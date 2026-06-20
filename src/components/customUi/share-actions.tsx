import { useEffect, useRef, useState } from "react";
import {
  Link,
  Share2,
  Check,
  MessageCircle,
  Send,
  Twitter,
} from "lucide-react";

type ShareActionsProps = {
  title: string;
  text: string;
};

export default function ShareActions({ title, text }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const url =
    typeof window !== "undefined" ? window.location.href : "";

  // ---- Copy ----
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // ---- Share ----
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        return; // user cancelled
      }
    }

    setOpen((prev) => !prev);
  };

  // ---- Share links ----
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    messenger: `https://www.facebook.com/dialog/send?link=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
  };

  // ---- Close on outside click ----
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center gap-3"
    >
      {/* Copy */}
      <button
        onClick={handleCopy}
        className="text-sm px-3 py-1.5 rounded-md border h-8 flex items-center gap-2 hover:bg-muted transition"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            Copied
          </>
        ) : (
          <>
            <Link className="w-4 h-4" />
            Copy
          </>
        )}
      </button>

      {/* Share */}
      <button
        onClick={handleShare}
        className="text-sm px-3 py-1.5 rounded-md border h-8 flex items-center gap-2 hover:bg-muted transition"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-10 bg-background border rounded-lg shadow-md p-2 flex flex-col gap-1 z-50 min-w-[180px]">
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>

          <a
            href={shareLinks.messenger}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md"
          >
            <Send className="w-4 h-4" />
            Messenger
          </a>

          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md"
          >
            <Twitter className="w-4 h-4" />
            X / Twitter
          </a>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md"
          >
            <Link className="w-4 h-4" />
            Copy link
          </button>
        </div>
      )}
    </div>
  );
}