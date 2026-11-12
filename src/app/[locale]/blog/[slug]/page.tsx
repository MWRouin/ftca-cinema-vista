import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageJsonLd } from "@/components/JsonLd";
import { getBlogArticleBySlug, getBlogArticles } from "@/data/blog";
import { buildMetadata } from "@/lib/metadata/next-metadata";
import { decodeParam } from "@/lib/route-params";
import { asLocale, articleSeo } from "@/lib/metadata/page-seo";
import BlogArticle from "@/views/BlogArticle";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogArticles().map((article) => ({ slug: article.slug }));
}

/** The page's entity and SEO data, or null for an unknown slug. */
function resolve(locale: string, rawSlug: string) {
  const slug = decodeParam(rawSlug);
  const item = getBlogArticleBySlug(slug);
  return item ? { item, slug, seo: articleSeo(item) } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = resolve(locale, slug);
  return page ? buildMetadata(`blog/${page.slug}`, asLocale(locale), page.seo) : {};
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const page = resolve(locale, slug);
  if (!page) notFound();
  return (
    <>
      <PageJsonLd pageKey={`blog/${page.slug}`} locale={locale} seo={page.seo} />
      <BlogArticle />
    </>
  );
}
