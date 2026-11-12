import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageJsonLd } from "@/components/JsonLd";
import { getEvents } from "@/data/events";
import { buildMetadata } from "@/lib/metadata/next-metadata";
import { decodeParam } from "@/lib/route-params";
import { asLocale, eventSeo } from "@/lib/metadata/page-seo";
import { EVENT_VIEWS } from "@/views/events";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getEvents()
    .filter((event) => event.id in EVENT_VIEWS)
    .map((event) => ({ slug: event.id }));
}

/** The page's entity and SEO data, or null for an unknown slug. */
function resolve(locale: string, rawSlug: string) {
  const slug = decodeParam(rawSlug);
  const item = getEvents().find((event) => event.id === slug && event.id in EVENT_VIEWS);
  return item ? { item, slug, seo: eventSeo(item, asLocale(locale)) } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = resolve(locale, slug);
  return page ? buildMetadata(`events/${page.slug}`, asLocale(locale), page.seo) : {};
}

export default async function EventPage({ params }: Props) {
  const { locale, slug } = await params;
  const page = resolve(locale, slug);
  if (!page) notFound();
  const View = EVENT_VIEWS[page.slug];
  return (
    <>
      <PageJsonLd pageKey={`events/${page.slug}`} locale={locale} seo={page.seo} />
      <View />
    </>
  );
}
