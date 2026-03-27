import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageTitle } from '@/components/customUi/page-title';
import { Inbox } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LazyImage } from '@/components/customUi/lazy-image';
import MetaHeader from '@/lib/metadata/metadata';
import { PAGE_SEO } from '@/lib/metadata/seo-constants';
import { getBlogArticles } from '@/data/blog';

export default function Blog() {
  const articles = getBlogArticles();

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Blog: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      Article: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Autre 1': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Autre 2': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
      'Autre 3': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };

    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  const featuredArticle = articles[0];

  return (
    <>
      <MetaHeader {...PAGE_SEO.blog} />
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <PageTitle title="Blog & Articles" />
            <div className="section-divider w-24 mx-auto mb-8"></div>
            <div className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Insights, reviews, and deep dives into the world of cinema
            </div>
          </div>

          {featuredArticle ? (
            <div className="mb-12">
              <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <Link to={`/blog/${featuredArticle.slug}`} className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="aspect-[16/9] lg:aspect-auto overflow-hidden rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none">
                    <LazyImage
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <Badge className={`w-fit mb-4 ${getCategoryColor(featuredArticle.category)}`}>
                      Featured • {featuredArticle.category}
                    </Badge>
                    <CardTitle className="text-2xl md:text-3xl mb-4 group-hover:text-primary transition-colors text-left">
                      {featuredArticle.title}
                    </CardTitle>
                    <CardDescription className="text-base mb-4">
                      {featuredArticle.excerpt}
                    </CardDescription>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>By {featuredArticle.author}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(featuredArticle.date)}</span>
                      <span className="mx-2">•</span>
                      <span>{featuredArticle.readTime}</span>
                    </div>
                  </div>
                </Link>
              </Card>
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/50 rounded-lg space-y-4">
              <Inbox className="w-40 h-40 mx-auto text-muted-foreground" />
              <p className="text-lg text-muted-foreground">Blog is empty currently.</p>
              <p className="text-sm text-muted-foreground">Check back soon!</p>
            </div>
          )}

          {articles.length > 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(1).map((article) => (
                <Link key={article.slug} to={`/blog/${article.slug}`} className="block">
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full overflow-hidden">
                    <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                      <LazyImage
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <Badge className={`w-fit mb-2 ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </Badge>
                      <CardTitle className="text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="mb-4 line-clamp-3">
                        {article.excerpt}
                      </CardDescription>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>By {article.author}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(article.date)}</span>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {article.readTime}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
