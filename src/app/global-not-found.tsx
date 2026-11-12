import type { Metadata } from "next";

import "@/fonts";
import "@/index.css";
import { InlineScript } from "@/components/InlineScript";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SITE_NAME_FULL } from "@/lib/metadata/seo-constants";
import { THEME_SCRIPT } from "@/lib/theme-script";
import GlobalNotFoundView from "@/views/GlobalNotFound";

export const metadata: Metadata = {
  // Next adds <meta name="robots" content="noindex"> to not-found pages itself.
  title: `Page not found | ${SITE_NAME_FULL}`,
};

// Served as /404.html (GitHub Pages uses it for unknown URLs, with a 404
// status). It sits outside the locale tree and keeps its own <html>; the
// language and the message are chosen in the browser from the URL (see
// views/GlobalNotFound). Without JavaScript the language-neutral text is shown.
export default function GlobalNotFound() {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <InlineScript code={THEME_SCRIPT} />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider>
          <GlobalNotFoundView />
        </ThemeProvider>
        <noscript>
          <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-muted-foreground">Page not found · Page introuvable</p>
            <p>
              <a className="underline" href="/en/">English</a> · <a className="underline" href="/fr/">Français</a>
            </p>
          </main>
        </noscript>
      </body>
    </html>
  );
}
