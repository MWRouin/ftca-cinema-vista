import { LocaleRedirect, localeRedirectMetadata } from "@/components/LocaleRedirect";

// Legacy URL without a locale prefix: redirects to /<locale>/blog/.
export const metadata = localeRedirectMetadata("blog");

export default function Page() {
  return <LocaleRedirect pageKey="blog" />;
}
