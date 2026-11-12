import type { Metadata } from "next";

import { PageJsonLd } from "@/components/JsonLd";
import { staticMetadata } from "@/lib/metadata/next-metadata";
import Blog from "@/views/Blog";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return staticMetadata("blog", (await params).locale);
}

export default async function BlogPage({ params }: Props) {
  return (
    <>
      <PageJsonLd pageKey="blog" locale={(await params).locale} />
      <Blog />
    </>
  );
}
