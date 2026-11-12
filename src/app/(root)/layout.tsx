import type { ReactNode } from "react";

// Second root layout, for "/" only: it has no locale yet, so no site chrome.
export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
