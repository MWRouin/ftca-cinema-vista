import type { Metadata } from "next";

import { PageJsonLd } from "@/components/JsonLd";
import { staticMetadata } from "@/lib/metadata/next-metadata";
import Home from "@/views/Home";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return staticMetadata("", (await params).locale);
}

export default async function HomePage({ params }: Props) {
  return (
    <>
      <PageJsonLd pageKey="" locale={(await params).locale} />
      <Home />
    </>
  );
}
