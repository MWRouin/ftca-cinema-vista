import type { Metadata } from "next";

import { PageJsonLd } from "@/components/JsonLd";
import { Translations } from "@/i18n/server";
import { staticMetadata } from "@/lib/metadata/next-metadata";
import Home from "@/views/Home";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return staticMetadata("", (await params).locale);
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <PageJsonLd pageKey="" locale={locale} />
      <Translations locale={locale} ns={["home", "movie"]}>
        <Home />
      </Translations>
    </>
  );
}
