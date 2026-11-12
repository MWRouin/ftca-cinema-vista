import { LocaleRedirect, localeRedirectMetadata } from "@/components/LocaleRedirect";

// Legacy URL without a locale prefix: redirects to /<locale>/contact/.
export const metadata = localeRedirectMetadata("contact");

export default function Page() {
  return <LocaleRedirect pageKey="contact" />;
}
