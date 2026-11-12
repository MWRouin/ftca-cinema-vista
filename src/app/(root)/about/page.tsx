import { LocaleRedirect, localeRedirectMetadata } from "@/components/LocaleRedirect";

// Legacy URL without a locale prefix: redirects to /<locale>/about/.
export const metadata = localeRedirectMetadata("about");

export default function Page() {
  return <LocaleRedirect pageKey="about" />;
}
