import type { Metadata } from "next";

import { PageJsonLd } from "@/components/JsonLd";
import { Translations } from "@/i18n/server";
import { staticMetadata } from "@/lib/metadata/next-metadata";
import Movies from "@/views/Movies";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return staticMetadata("movies", (await params).locale);
}

export default async function MoviesPage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <PageJsonLd pageKey="movies" locale={locale} />
      <Translations locale={locale} ns={["movies", "movie"]}>
        <Movies />
      </Translations>
    </>
  );
}
