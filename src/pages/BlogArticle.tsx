import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/customUi/page-title';
import MetaHeader from '@/lib/metadata/metadata';
import { PAGE_SEO, SITE_URL } from '@/lib/metadata/seo-constants';
import { getBlogArticleBySlug } from '@/data/blog';

export default function BlogArticle() {
  const { slug } = useParams();
  const article = getBlogArticleBySlug(slug);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (!article) {
    return (
      <>
        <MetaHeader {...PAGE_SEO['404']} />
        <div className="min-h-screen py-12 flex items-center">
          <div className="max-w-3xl mx-auto px-4 w-full">
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Article not found</CardTitle>
                <CardDescription>
                  The article you are looking for does not exist.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <Link to="/blog">← Back to Blog</Link>
                </Button>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button asChild variant="outline">
              <Link to="/blog">← Back to Blog</Link>
            </Button>
          </div>

          {article.image ? (
            <div className="aspect-[16/8] overflow-hidden rounded-xl mb-10">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}

          <header className="mb-10">
            <Badge className="mb-4">{article.category}</Badge>
            <PageTitle title={article.title} useInAnimation={false} />
            <div className="text-sm text-muted-foreground mt-2">
              By {article.author} • {formatDate(article.date)} • {article.readTime}
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
