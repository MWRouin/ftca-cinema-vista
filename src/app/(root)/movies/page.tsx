import { LocaleRedirect, localeRedirectMetadata } from "@/components/LocaleRedirect";

// Legacy URL without a locale prefix: redirects to /<locale>/movies/.
export const metadata = localeRedirectMetadata("movies");

export default function Page() {
  return <LocaleRedirect pageKey="movies" />;
}
