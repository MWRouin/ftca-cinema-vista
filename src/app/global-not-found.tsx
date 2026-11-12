import type { Metadata } from "next";

import "@/fonts";
import "@/index.css";
import { SITE_NAME_FULL } from "@/lib/metadata/seo-constants";

export const metadata: Metadata = {
  // Next adds <meta name="robots" content="noindex"> to not-found pages itself.
  title: `Page not found | ${SITE_NAME_FULL}`,
};

// Served as /404.html (GitHub Pages uses it for unknown URLs). It sits outside
// the locale tree, so it is language-neutral and keeps its own <html>.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-muted-foreground">Page not found · Page introuvable</p>
          <p>
            <a className="underline" href="/en/">English</a> · <a className="underline" href="/fr/">Français</a>
          </p>
        </main>
      </body>
    </html>
  );
}
