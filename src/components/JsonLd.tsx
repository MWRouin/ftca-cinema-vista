import { asLocale, pageJsonLd, staticPageSeo, type Seo } from "@/lib/metadata/page-seo";

/** Structured data as <script type="application/ld+json"> tags (server-rendered). */
export function JsonLd({ nodes }: { nodes: Record<string, unknown>[] }) {
  return (
    <>
      {nodes.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          // "<" is escaped so content can never close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}

/** A page's own structured data plus its breadcrumb. Omit `seo` for PAGE_SEO pages. */
export function PageJsonLd({ pageKey, locale, seo }: { pageKey: string; locale: string; seo?: Seo }) {
  const loc = asLocale(locale);
  return <JsonLd nodes={pageJsonLd(pageKey, loc, seo ?? staticPageSeo(pageKey, loc))} />;
}
