import { PageTitle } from '@/components/customUi/page-title';
import { ArticleCard } from '@/components/customUi/article-card';
import { Inbox } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MetaHeader from '@/lib/metadata/metadata';
import { PAGE_SEO } from '@/lib/metadata/seo-constants';
import { getBlogArticles } from '@/data/blog';

export default function Blog() {
  const { t } = useTranslation('blog');
  const articles = getBlogArticles();

  const featuredArticle = articles[0];

  return (
    <>
      <MetaHeader {...PAGE_SEO.blog} />
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <PageTitle title={t('title')} />
            <div className="section-divider w-24 mx-auto mb-8"></div>
            <div className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              {t('subtitle')}
            </div>
          </div>

          {featuredArticle ? (
            <div className="mb-12">
              <ArticleCard article={featuredArticle} variant="featured" />
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/50 rounded-lg space-y-4">
              <Inbox className="w-40 h-40 mx-auto text-muted-foreground" />
              <p className="text-lg text-muted-foreground">{t('empty')}</p>
              <p className="text-sm text-muted-foreground">{t('checkBack')}</p>
            </div>
          )}

          {articles.length > 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(1).map((article) => (
                <ArticleCard key={article.slug} article={article} variant="grid" />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
