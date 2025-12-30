/* import { useEffect } from "react";

export function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
    // load script once
    if (!document.getElementById("instagram-embed-script")) {
      const script = document.createElement("script");
      script.id = "instagram-embed-script";
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // re-process embeds
      // @ts-ignore
      window.instgrm?.Embeds.process();
    }
  }, []);
  const SCALE = 1;

  return (<div
    style={{
      width: "100%",
      paddingBottom: `${(SCALE - 1) / 2 * 100}%`,
      transform: `scale(${SCALE})`,
      transformOrigin: "top center",
    }}
  >
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
    />
  </div>)
} */