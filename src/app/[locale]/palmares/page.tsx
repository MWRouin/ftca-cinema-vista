import type { Metadata } from "next";

import { PageJsonLd } from "@/components/JsonLd";
import { Translations } from "@/i18n/server";
import { staticMetadata } from "@/lib/metadata/next-metadata";
import Palmares from "@/views/Palmares";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return staticMetadata("palmares", (await params).locale);
}

export default async function PalmaresPage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <PageJsonLd pageKey="palmares" locale={locale} />
      <Translations locale={locale} ns={["static"]}>
        <Palmares />
      </Translations>
    </>
  );
}
