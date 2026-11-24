import type { Metadata } from "next";

import { PageJsonLd } from "@/components/JsonLd";
import { Translations } from "@/i18n/server";
import { staticMetadata } from "@/lib/metadata/next-metadata";
import Contact from "@/views/Contact";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return staticMetadata("contact", (await params).locale);
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <PageJsonLd pageKey="contact" locale={locale} />
      <Translations locale={locale} ns={["contact"]}>
        <Contact />
      </Translations>
    </>
  );
}
