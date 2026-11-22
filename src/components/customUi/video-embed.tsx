import { useState } from "react";
import { Play } from "lucide-react";
import { LazyImage } from "@/components/customUi/lazy-image";

/**
 * The embed address to load once the visitor presses play. A YouTube video
 * goes through youtube-nocookie.com, starts at once, keeps the end
 * suggestions to its own channel, speaks the page's language and shows
 * subtitles; any other host gets `autoplay=1`.
 */
export function embedUrl(src: string, lang: string): string {
  const url = new URL(src);
  const youtube = url.hostname.endsWith("youtube.com") || url.hostname.endsWith("youtube-nocookie.com");
  if (youtube) {
    url.hostname = "www.youtube-nocookie.com";
    url.searchParams.set("rel", "0");
    url.searchParams.set("hl", lang);
    url.searchParams.set("cc_load_policy", "1");
    url.searchParams.set("playsinline", "1");
  }
  url.searchParams.set("autoplay", "1");
  return url.toString();
}

interface VideoEmbedProps {
  /** The host's embed address (`movieUrl`). */
  src: string;
  /** Names the player and the play button. */
  title: string;
  /** Cover image shown until play is pressed (the poster). */
  poster?: string;
  /** Page language, for the player's own labels. */
  lang: string;
  /** Text of the play button ("Watch the film"). */
  playLabel: string;
}

/**
 * A video behind a cover: the poster under a dark wash with a play button in
 * the site's style. The host's player (and its cookies) load only on click,
 * then play straight away.
 */
export function VideoEmbed({ src, title, poster, lang, playLabel }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        // The play button is gone; keep keyboard focus on the player.
        ref={(el) => el?.focus()}
        src={embedUrl(src, lang)}
        title={title}
        className="h-full w-full"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`${playLabel}: ${title}`}
      className="group relative flex h-full w-full items-center justify-center overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
    >
      {poster && (
        <LazyImage
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-sm transition-transform duration-700 group-hover:scale-[1.15]"
        />
      )}
      <span className="absolute inset-0 bg-black/55 transition-colors group-hover:bg-black/45" aria-hidden />
      <span className="relative flex flex-col items-center justify-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xl transition-transform group-hover:scale-110 sm:h-20 sm:w-20">
          <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" aria-hidden />
        </span>
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-on-image">{playLabel}</span>
      </span>
    </button>
  );
}
