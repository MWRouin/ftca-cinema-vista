import { LocaleRedirect, localeRedirectMetadata } from "@/components/LocaleRedirect";

export const metadata = localeRedirectMetadata("");

export default function RootRedirect() {
  return <LocaleRedirect pageKey="" />;
}
