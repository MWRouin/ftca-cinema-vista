import { LocaleRedirect, localeRedirectMetadata } from "@/components/LocaleRedirect";
import { decodeParam } from "@/lib/route-params";
import { sectionChildren } from "@/lib/metadata/site-pages";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return sectionChildren.movies().map((id) => ({ id }));
}

// Legacy URL without a locale prefix: redirects to /<locale>/movies/<id>/.
export async function generateMetadata({ params }: Props) {
  return localeRedirectMetadata(`movies/${decodeParam((await params).id)}`);
}

export default async function Page({ params }: Props) {
  return <LocaleRedirect pageKey={`movies/${decodeParam((await params).id)}`} />;
}
