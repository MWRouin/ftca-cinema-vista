import BlogArticle from "@/views/BlogArticle";
import { getBlogArticles } from "@/data/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogArticles().map((article) => ({ slug: article.slug }));
}

export default function BlogArticlePage() {
  return <BlogArticle />;
}
