import { LocaleRedirect, localeRedirectMetadata } from "@/components/LocaleRedirect";

// Legacy URL without a locale prefix: redirects to /<locale>/events/.
export const metadata = localeRedirectMetadata("events");

export default function Page() {
  return <LocaleRedirect pageKey="events" />;
}
