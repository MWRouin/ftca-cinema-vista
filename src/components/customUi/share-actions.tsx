import { Check, Link, Share2 } from "lucide-react";
import { useState } from "react";

type ShareActionsProps = {
  title: string;
  text?: string;
};

export default function ShareActions({ title, text }: ShareActionsProps) {

  const [copied, setCopied] = useState(false);
  const [fallbackHint, setFallbackHint] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";

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
    setTimeout(() => setCopied(false), 4000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch {
        // user cancelled → do nothing
      }
    } else {
      await handleCopy();
      setFallbackHint(true);
      setTimeout(() => setFallbackHint(false), 4000);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleCopy}
        className="text-sm px-3 py-1.5 rounded-md border h-8 flex items-center gap-2 hover:bg-muted transition"
      >
        {copied ? (
          <>
            <Check color="green" className="w-4 h-4" />
            <span className="text-green-600">Copied</span>
          </>
        ) : (
          <>
            <Link className="w-4 h-4" />
            Copy link
          </>
        )}
      </button>

      <button
        onClick={handleShare}
        className="text-sm px-3 py-1.5 rounded-md border h-8 flex items-center gap-2 hover:bg-muted transition"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      {/* subtle fallback hint */}
      {fallbackHint && (
        <span className="text-xs text-muted-foreground animate-fade-in">
          Link copied
        </span>
      )}
    </div>
  );
}