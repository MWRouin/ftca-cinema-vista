import type { Metadata } from "next";

import { PageJsonLd } from "@/components/JsonLd";
import { staticMetadata } from "@/lib/metadata/next-metadata";
import About from "@/views/About";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return staticMetadata("about", (await params).locale);
}

export default async function AboutPage({ params }: Props) {
  return (
    <>
      <PageJsonLd pageKey="about" locale={(await params).locale} />
      <About />
    </>
  );
}
