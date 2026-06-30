import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BackButton } from '@/components/customUi/back-button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getPersonById } from '@/data/people';
import { getFilmography, isPersonPublic } from '@/data/movies';
import { getArticlesByPerson } from '@/data/blog';
import { LazyImage } from '@/components/customUi/lazy-image';
import { MovieCard } from '@/components/customUi/movie-card';
import { ArticleCard } from '@/components/customUi/article-card';
import { ElementTitle } from '@/components/customUi/element-title';
import MetaHeader from '@/lib/metadata/metadata';
import { SITE_URL, SITE_NAME_FULL, DEFAULT_PERSON_OG_IMAGE } from '@/lib/metadata/seo-constants';

// Same stable slug used by About's per-member i18n keys, so FR bios/roles resolve.
const slugify = (value: string) => value.toLowerCase().trim().replace(/\s+/g, '-');

export default function Person() {
  const { id } = useParams();
  const { t } = useTranslation('person');

  const person = id ? getPersonById(id) : undefined;
  const BASE = import.meta.env.BASE_URL || '/';
  const defaultUserImage = `${BASE}Members/user.png`;

  /* ---------- Not found / non-public ---------- */
  if (!person || !isPersonPublic(person.id)) {
    return (
      <div className="min-h-screen py-12 flex items-center">
        <div className="max-w-3xl mx-auto px-4 w-full">
          <Card className="text-center">
            <CardHeader>
              <img
                src={defaultUserImage}
                alt={t('notFoundAlt')}
                className="mx-auto mb-6 h-32 w-32 rounded-full object-cover opacity-70"
              />
              <CardTitle>{t('notFoundTitle')}</CardTitle>
              <CardDescription>{t('notFoundDesc')}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  const filmography = getFilmography(person.id);
  const articles = getArticlesByPerson(person.id);
  const roleLabel = person.membership?.role
    ? t(`roles.${slugify(person.membership.role)}`, { ns: 'about', defaultValue: person.membership.role })
    : undefined;
  // English bio lives in people.json; FR override (if any) lives in about.json.
  const bio = t(`members.${person.id}.bio`, { ns: 'about', defaultValue: person.bio?.en ?? '' });

  const description = (person.bio?.en || `${person.name} — ${SITE_NAME_FULL}.`).trim();
  // Their own portrait when set; otherwise the neutral user placeholder, so the
  // social/LLM preview shows the same avatar the page renders instead of the
  // generic site banner. JSON-LD `image` stays unset when there's no real
  // portrait (don't claim the placeholder is the person's photo).
  const personImage = person.image
    ? (person.image.startsWith('http') ? person.image : `${SITE_URL}${person.image}`)
    : undefined;
  const ogImage = personImage ?? DEFAULT_PERSON_OG_IMAGE;

  return (
    <>
      <MetaHeader
        title={person.name}
        description={description}
        pagePathname={`people/${person.id}`}
        ogType="profile"
        imageUrl={ogImage}
        imageAlt={person.name}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: person.name,
          ...(personImage ? { image: personImage } : {}),
          ...(person.membership
            ? { memberOf: { '@type': 'Organization', name: SITE_NAME_FULL } }
            : {}),
          url: `${SITE_URL}/people/${person.id}`,
        }}
      />
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <BackButton to="/about" label={t('back')} />

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden flex-shrink-0 bg-muted">
              <LazyImage
                src={person.image ? person.image : defaultUserImage}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-start space-y-3">
              <ElementTitle title={person.name} />
              {roleLabel && (
                <div className="flex justify-center sm:justify-start">
                  <Badge>{roleLabel}</Badge>
                </div>
              )}
              {bio && <p className="text-lg text-muted-foreground max-w-2xl">{bio}</p>}
            </div>
          </div>

          {/* Filmography */}
          <section>
            <h2 className="text-3xl font-bold mb-8">{t('filmography')}</h2>
            {filmography.length === 0 ? (
              <p className="text-muted-foreground">{t('noFilmography')}</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-6 lg:gap-8 xl:gap-8">
                {filmography.map(({ movie, roles }) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    badges={roles.map((role) => ({
                      label: t(`roles.${role}`, { ns: 'movie', defaultValue: role }),
                      variant: 'outline',
                    }))}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Articles written by this person (only when they have any) */}
          {articles.length > 0 && (
            <section className="mt-16">
              <h2 className="text-3xl font-bold mb-8">{t('articles')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="compact" />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
