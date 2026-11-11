import { PageHeader } from '@/components/customUi/page-header';
import { PageContainer } from '@/components/customUi/page-container';
import { ArticleCard } from '@/components/customUi/article-card';
import { EmptyState } from '@/components/customUi/empty-state';
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
      <PageContainer>
          <PageHeader title={t('title')} subtitle={t('subtitle')} />

          {featuredArticle ? (
            <div className="mb-12">
              <ArticleCard article={featuredArticle} variant="featured" />
            </div>
          ) : (
            <EmptyState icon={Inbox} iconClassName="w-40 h-40" title={t('empty')} subtitle={t('checkBack')} />
          )}

          {articles.length > 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(1).map((article) => (
                <ArticleCard key={article.slug} article={article} variant="grid" />
              ))}
            </div>
          ) : null}
      </PageContainer>
    </>
  );
}
