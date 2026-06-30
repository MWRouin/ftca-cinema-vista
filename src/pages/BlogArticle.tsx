import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { BackButton } from '@/components/customUi/back-button';
//import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ElementTitle } from '@/components/customUi/element-title';
import MetaHeader from '@/lib/metadata/metadata';
import { PAGE_SEO, SITE_URL } from '@/lib/metadata/seo-constants';
import { getBlogArticleBySlug } from '@/data/blog';
import { resolvePersonId } from '@/data/people';
import { isPersonPublic } from '@/data/movies';
import { LazyImage } from '@/components/customUi/lazy-image';
import ShareActions from '@/components/customUi/share-actions';
import { LocalLink, useLocale } from '@/i18n/locale';

/**
 * The article's author, linked to their person page when the name resolves to a
 * public member (same rule as a movie's cast credits); otherwise plain text.
 * `children` is the localized name token injected by <Trans>.
 */
function AuthorLink({ author, children }: { author: string; children?: ReactNode }) {
  const personId = resolvePersonId(author);
  if (personId && isPersonPublic(personId)) {
    return (
      <LocalLink
        to={`/people/${personId}`}
        className="underline-offset-2 hover:text-primary hover:underline transition-colors"
      >
        {children}
      </LocalLink>
    );
  }
  return <>{children}</>;
}

export default function BlogArticle() {
  const { slug } = useParams();
  const { t } = useTranslation('blog');
  const locale = useLocale();
  const article = getBlogArticleBySlug(slug);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', options);
  };

  if (!article) {
    return (
      <>
        <MetaHeader {...PAGE_SEO['404']} />
        <div className="min-h-screen py-12 flex items-center">
          <div className="max-w-3xl mx-auto px-4 w-full">
            <Card className="text-center">
              <CardHeader>
                <CardTitle>{t('notFoundTitle')}</CardTitle>
                <CardDescription>
                  {t('notFoundDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BackButton to="/blog" label={t('backToBlog')} className="mb-0" />
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  const imageUrl = article.image?.startsWith('http') ? article.image : `${SITE_URL}${article.image}`;
  const articlePath = `blog/${article.slug}`;

  return (
    <>
      <MetaHeader
        title={article.title}
        description={article.excerpt}
        pagePathname={articlePath}
        ogType="article"
        imageUrl={imageUrl}
        imageAlt={article.title}
        lang={article.lang ?? 'en'}
        author={article.author}
        authorLabel={t('writtenBy')}
        articlePublishedTime={new Date(article.date).toISOString()}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: article.title,
          description: article.excerpt,
          image: imageUrl,
          datePublished: new Date(article.date).toISOString(),
          dateModified: new Date(article.date).toISOString(),
          author: {
            '@type': 'Person',
            name: article.author,
          },
          mainEntityOfPage: `${SITE_URL}/${articlePath}`,
          url: `${SITE_URL}/${articlePath}`,
          inLanguage: article.lang ?? 'en',
          publisher: {
            '@type': 'Organization',
            name: 'FTCA Hammam-Lif',
            url: SITE_URL,
          },
        }}
      />
      <div className="min-h-screen py-12">
        <div className="max-w-4xl 2xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackButton to="/blog" label={t('backToBlog')} />

          {article.image ? (
            <div className="aspect-[16/8] overflow-hidden rounded-lg mb-10">
              <LazyImage
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}

          <header className="mb-10">
            <ElementTitle title={article.title} useInAnimation={false} />

            <div className="flex flex-col gap-3 mt-2 sm:flex-row sm:items-center sm:justify-between">

              {/* Meta (always first) */}
              <div className="text-sm text-muted-foreground">
                <Trans
                  t={t}
                  i18nKey="meta"
                  values={{ author: article.author, date: formatDate(article.date), readTime: article.readTime }}
                  components={{ author: <AuthorLink author={article.author} /> }}
                />
              </div>

              {/* Actions */}
              <div className="self-start sm:self-auto">
                <ShareActions title={article.title} text={article.excerpt} />
              </div>

            </div>
          </header>

          <article
            dir={article.lang === 'ar' ? 'rtl' : 'ltr'}
            className={
              'prose prose-lg max-w-none text-base text-muted-foreground leading-relaxed ' +
              (article.lang === 'ar' ? 'text-right' : 'text-left')
            }
          >
            {article.body?.split('\n\n').map((para, idx) => {
              const text = para.trim();
              if (!text) return null;

              if (text.startsWith('## ')) {
                return (
                  <h2
                    key={idx}
                    className={
                      article.lang === 'ar'
                        ? 'text-right text-2xl font-semibold mt-8 mb-4 text-foreground'
                        : 'text-left text-2xl font-semibold mt-8 mb-4 text-foreground'
                    }
                  >
                    {text.slice(3)}
                  </h2>
                );
              }

              return <p key={idx}>{text}</p>;
            })}
          </article>
        </div>
      </div>
    </>
  );
}
