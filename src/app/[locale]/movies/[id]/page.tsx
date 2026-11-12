import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageJsonLd } from "@/components/JsonLd";
import { getMovieById, getMovies } from "@/data/movies";
import { buildMetadata } from "@/lib/metadata/next-metadata";
import { decodeParam } from "@/lib/route-params";
import { asLocale, movieSeo } from "@/lib/metadata/page-seo";
import MoviePlayer from "@/views/MoviePlayer";

type Props = { params: Promise<{ locale: string; id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getMovies().map((movie) => ({ id: movie.id }));
}

/** The page's entity and SEO data, or null for an unknown id. */
function resolve(locale: string, rawId: string) {
  const id = decodeParam(rawId);
  const item = getMovieById(id);
  return item ? { item, id, seo: movieSeo(item, asLocale(locale)) } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const page = resolve(locale, id);
  return page ? buildMetadata(`movies/${page.id}`, asLocale(locale), page.seo) : {};
}

export default async function MoviePage({ params }: Props) {
  const { locale, id } = await params;
  const page = resolve(locale, id);
  if (!page) notFound();
  return (
    <>
      <PageJsonLd pageKey={`movies/${page.id}`} locale={locale} seo={page.seo} />
      <MoviePlayer />
    </>
  );
}
