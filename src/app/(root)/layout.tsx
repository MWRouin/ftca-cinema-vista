import type { ReactNode } from "react";

import { SITE_METADATA, SITE_VIEWPORT } from "@/lib/metadata/next-metadata";

export const metadata = SITE_METADATA;
export const viewport = SITE_VIEWPORT;

// Second root layout, for URLs without a locale prefix ("/" and legacy deep
// links): they only redirect, so there is no site chrome.
export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
