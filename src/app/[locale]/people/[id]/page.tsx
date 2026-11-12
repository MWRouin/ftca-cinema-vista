import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageJsonLd } from "@/components/JsonLd";
import { getPublicPeople } from "@/data/movies";
import { buildMetadata } from "@/lib/metadata/next-metadata";
import { decodeParam } from "@/lib/route-params";
import { asLocale, personSeo } from "@/lib/metadata/page-seo";
import Person from "@/views/Person";

type Props = { params: Promise<{ locale: string; id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublicPeople().map((person) => ({ id: person.id }));
}

/** The page's entity and SEO data, or null for an unknown id. */
function resolve(locale: string, rawId: string) {
  const id = decodeParam(rawId);
  const item = getPublicPeople().find((person) => person.id === id);
  return item ? { item, id, seo: personSeo(item) } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const page = resolve(locale, id);
  return page ? buildMetadata(`people/${page.id}`, asLocale(locale), page.seo) : {};
}

export default async function PersonPage({ params }: Props) {
  const { locale, id } = await params;
  const page = resolve(locale, id);
  if (!page) notFound();
  return (
    <>
      <PageJsonLd pageKey={`people/${page.id}`} locale={locale} seo={page.seo} />
      <Person />
    </>
  );
}
