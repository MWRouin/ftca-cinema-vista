import type { Metadata } from "next";

import { PageJsonLd } from "@/components/JsonLd";
import { staticMetadata } from "@/lib/metadata/next-metadata";
import Events from "@/views/Events";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return staticMetadata("events", (await params).locale);
}

export default async function EventsPage({ params }: Props) {
  return (
    <>
      <PageJsonLd pageKey="events" locale={(await params).locale} />
      <Events />
    </>
  );
}
