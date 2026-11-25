import type { Metadata } from "next";

import { PageJsonLd } from "@/components/JsonLd";
import { Translations } from "@/i18n/server";
import { staticMetadata } from "@/lib/metadata/next-metadata";
import Blog from "@/views/Blog";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return staticMetadata("blog", (await params).locale);
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <PageJsonLd pageKey="blog" locale={locale} />
      <Translations locale={locale} ns={["blog"]}>
        <Blog />
      </Translations>
    </>
  );
}
