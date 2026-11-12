import type { Metadata } from "next";

import { PageJsonLd } from "@/components/JsonLd";
import { staticMetadata } from "@/lib/metadata/next-metadata";
import Contact from "@/views/Contact";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return staticMetadata("contact", (await params).locale);
}

export default async function ContactPage({ params }: Props) {
  return (
    <>
      <PageJsonLd pageKey="contact" locale={(await params).locale} />
      <Contact />
    </>
  );
}
