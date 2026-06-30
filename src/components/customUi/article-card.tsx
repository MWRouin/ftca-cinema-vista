import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LazyImage } from "@/components/customUi/lazy-image";
import { LocalLink, useLocale } from "@/i18n/locale";
import type { BlogArticle } from "@/data/blog";

/** Category → badge color classes (shared so every article badge matches). */
const CATEGORY_COLORS: Record<string, string> = {
  Blog: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Article: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Autre 1": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  "Autre 2": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  "Autre 3": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};
const categoryColor = (category: string) =>
  CATEGORY_COLORS[category] ?? "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";

/**
 * Presentation:
 *  - "featured" — wide two-column hero card (Blog page lead article).
 *  - "grid"     — vertical card with excerpt + read time (Blog page list).
 *  - "compact"  — vertical card, category + date only (Person page articles).
 */
type ArticleVariant = "featured" | "grid" | "compact";

interface ArticleCardProps {
  article: BlogArticle;
  variant?: ArticleVariant;
}

/**
 * Card for a blog article. Single source of truth for the article cards across
 * the Blog page (featured + list) and the Person page. The card owns the link,
 * image, category badge color and date formatting; callers just feed it an
 * article and pick a variant.
 */
export function ArticleCard({ article, variant = "grid" }: ArticleCardProps) {
  const { t } = useTranslation("blog");
  const locale = useLocale();
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // The whole section is the blog, so a "Blog" category badge is redundant —
  // only surface a category when it's something more specific.
  const showCategory = article.category !== "Blog";

  if (variant === "featured") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
        <LocalLink to={`/blog/${article.slug}`} className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="aspect-[16/9] lg:aspect-auto overflow-hidden rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none">
            <LazyImage
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <Badge className={`w-fit mb-4 ${categoryColor(article.category)}`}>
              {showCategory ? `${t("featured")} • ${article.category}` : t("featured")}
            </Badge>
            <CardTitle className="text-2xl md:text-3xl mb-4 group-hover:text-primary transition-colors text-left">
              {article.title}
            </CardTitle>
            <CardDescription className="text-base mb-4">{article.excerpt}</CardDescription>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{t("by", { author: article.author })}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(article.date)}</span>
              <span className="mx-2">•</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </LocalLink>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full overflow-hidden">
        <LocalLink to={`/blog/${article.slug}`} className="block">
          {article.image && (
            <div className="aspect-[16/9] overflow-hidden rounded-t-lg bg-muted">
              <LazyImage
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </CardTitle>
            <CardDescription className="flex flex-wrap items-center gap-1.5 pt-1">
              {showCategory && <Badge variant="outline" className="text-xs">{article.category}</Badge>}
              <span className="text-xs text-muted-foreground self-center">
                {showCategory ? `• ${formatDate(article.date)}` : formatDate(article.date)}
              </span>
            </CardDescription>
          </CardHeader>
        </LocalLink>
      </Card>
    );
  }

  // "grid"
  return (
    <LocalLink to={`/blog/${article.slug}`} className="block">
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full overflow-hidden">
        <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
          <LazyImage
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardHeader className="pb-2">
          {showCategory && (
            <Badge className={`w-fit mb-2 ${categoryColor(article.category)}`}>{article.category}</Badge>
          )}
          <CardTitle className="text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="mb-4 line-clamp-3">{article.excerpt}</CardDescription>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{t("by", { author: article.author })}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(article.date)}</span>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">{article.readTime}</div>
        </CardContent>
      </Card>
    </LocalLink>
  );
}
