import type { Metadata } from "next";

import { PageJsonLd } from "@/components/JsonLd";
import { staticMetadata } from "@/lib/metadata/next-metadata";
import Palmares from "@/views/Palmares";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return staticMetadata("palmares", (await params).locale);
}

export default async function PalmaresPage({ params }: Props) {
  return (
    <>
      <PageJsonLd pageKey="palmares" locale={(await params).locale} />
      <Palmares />
    </>
  );
}
