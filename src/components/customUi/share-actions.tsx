import { useState } from "react";

type ShareActionsProps = {
  title: string;
};

export default function ShareActions({ title }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch {
        // user cancelled, ignore
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex items-center gap-3 mt-4">
      <button
        onClick={handleCopy}
        className="text-sm px-3 py-1.5 rounded-lg border hover:bg-muted transition"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>

      <button
        onClick={handleShare}
        className="text-sm px-3 py-1.5 rounded-lg border hover:bg-muted transition"
      >
        Share
      </button>
    </div>
  );
}