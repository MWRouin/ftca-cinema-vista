import { LocaleRedirect, localeRedirectMetadata } from "@/components/LocaleRedirect";

// Legacy URL without a locale prefix: redirects to /<locale>/palmares/.
export const metadata = localeRedirectMetadata("palmares");

export default function Page() {
  return <LocaleRedirect pageKey="palmares" />;
}
