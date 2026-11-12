import { LocaleRedirect, localeRedirectMetadata } from "@/components/LocaleRedirect";
import { decodeParam } from "@/lib/route-params";
import { sectionChildren } from "@/lib/metadata/site-pages";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return sectionChildren.events().map((id) => ({ id }));
}

// Legacy URL without a locale prefix: redirects to /<locale>/events/<id>/.
export async function generateMetadata({ params }: Props) {
  return localeRedirectMetadata(`events/${decodeParam((await params).id)}`);
}

export default async function Page({ params }: Props) {
  return <LocaleRedirect pageKey={`events/${decodeParam((await params).id)}`} />;
}
