import type { Metadata } from "next";

import { PageJsonLd } from "@/components/JsonLd";
import { Translations } from "@/i18n/server";
import { staticMetadata } from "@/lib/metadata/next-metadata";
import About from "@/views/About";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return staticMetadata("about", (await params).locale);
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <PageJsonLd pageKey="about" locale={locale} />
      <Translations locale={locale} ns={["about"]}>
        <About />
      </Translations>
    </>
  );
}
