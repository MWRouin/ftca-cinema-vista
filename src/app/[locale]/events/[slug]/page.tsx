import { notFound } from "next/navigation";

import { getEvents } from "@/data/events";
import { EVENT_VIEWS } from "@/views/events";

export const dynamicParams = false;

export function generateStaticParams() {
  return getEvents()
    .filter((event) => event.id in EVENT_VIEWS)
    .map((event) => ({ slug: event.id }));
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const View = EVENT_VIEWS[slug];
  if (!View) notFound();
  return <View />;
}
