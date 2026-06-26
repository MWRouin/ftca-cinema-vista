
import { LazyImage } from '@/components/customUi/lazy-image';
import { PageTitle } from '@/components/customUi/page-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import MetaHeader from '@/lib/metadata/metadata';
import { PAGE_SEO } from '@/lib/metadata/seo-constants';
import { getMembers, getHonoraryMembers } from '@/data/people';
import { isPersonPublic } from '@/data/movies';
import { LocalLink } from '@/i18n/locale';

// Build a stable translation-key slug from a name or role, e.g.
// "General Secretary" -> "general-secretary". Used to look up per-member
// translations while keeping the English source as a defaultValue fallback.
const slugify = (value: string) => value.toLowerCase().trim().replace(/\s+/g, '-');

function TeamSection({ teamMembers }) {
  const { t } = useTranslation('about');
  const [showAll, setShowAll] = useState(false);

  // Decide which members to show based on showAll state
  const membersToShow = showAll ? teamMembers : teamMembers.slice(0, 12);

  const BASE = import.meta.env.BASE_URL || "/";

  const defaultUserImage = `${BASE}Members/user.png`;

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-center">{t('team.title')}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-4 md:gap-6 lg:gap-8">
        {membersToShow.map((member, index) => (
          <Card key={index} className="text-center">
            <CardHeader>
              <LocalLink to={`/people/${member.id}`} className="block group">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <LazyImage
                    src={member.image ? member.image : defaultUserImage}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardTitle className="text-xl transition-colors group-hover:text-primary">{member.name}</CardTitle>
              </LocalLink>
              <CardDescription className="text-primary font-medium">
                {t(`roles.${slugify(member.role)}`, { defaultValue: member.role })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                {member.bio ? t(`members.${slugify(member.name)}.bio`, { defaultValue: member.bio }) : ''}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Show button only if more than 12 members */}
      {teamMembers.length > 12 && (
        <div className="mt-8 text-center">
          <Button
            onClick={() => setShowAll(!showAll)}
            className="min-w-[120px]"
          >
            {showAll ? t('team.showLess') : t('team.showAll')}
          </Button>
        </div>
      )}
    </section>
  );
}

function OldMembersSection({ oldMembers }) {
  const { t } = useTranslation('about');
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('honorary.title')}</h2>
          <div className="section-divider w-16 mx-auto"></div>
          <p className="text-muted-foreground mt-4">{t('honorary.subtitle')}</p>
        </div>

        <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg p-8 lg:p-12 border border-muted/30">
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 list-none">
            {oldMembers.map((member, index) => (
              <li key={index} className="group">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-1 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full mt-1"></div>
                  {member.hasPage ? (
                    <LocalLink
                      to={`/people/${member.id}`}
                      className="text-base font-medium text-foreground group-hover:text-primary transition-colors duration-300"
                    >
                      {member.name}
                    </LocalLink>
                  ) : (
                    <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  const { t } = useTranslation('about');

  const BASE = import.meta.env.BASE_URL || "/";

  // Active club members, sourced from the shared people registry. The English
  // bio is passed as the i18n defaultValue (FR overrides live in about.json).
  const teamMembers = getMembers().map((p) => ({
    id: p.id,
    name: p.name,
    role: p.membership?.role ?? "Member",
    bio: p.bio?.en ?? "",
    image: p.image ?? "",
  }));
  // Honorary members (name only) from the shared people registry. Those with a
  // page (e.g. they directed a film) link to it.
  const oldMembers = getHonoraryMembers().map((p) => ({
    id: p.id,
    name: p.name,
    hasPage: isPersonPublic(p.id),
  }));

  return (
    <>
      <MetaHeader {...PAGE_SEO.about} />
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <PageTitle title={t('title')} />
          <div className="section-divider w-24 mx-auto mb-8"></div>
          {/* <div className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Discover our story, mission, and the passionate individuals who make our cinema club a vibrant community
          </div> */}
        </div>

        {/* History Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            {/* Lead — sets the scene and anchors the section under the title */}
            <p
              className="text-2xl sm:text-3xl italic leading-snug text-foreground border-l-2 border-primary/60 pl-5 sm:pl-6 mb-10"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              {t('history.lead')}
            </p>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                <Trans t={t} i18nKey="history.p1" components={{ hl: <span className="text-primary font-semibold" /> }} />
              </p>

              <p>{t('history.p2')}</p>

              <p>{t('history.p3')}</p>

              <p className="text-foreground font-medium">
                {t('history.p4')}
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16 bg-muted/50 rounded-lg p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('mission.title')}</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  {t('mission.p1')}
                </p>
                <div className="mt-6 mb-2 text-foreground font-medium">{t('mission.through')}</div>
                <ul className="list-disc pl-6 marker:text-primary/70 space-y-1">
                  <li>{t('mission.screenings')}</li>
                  <li>{t('mission.debates')}</li>
                  <li>{t('mission.workshops')}</li>
                </ul>
                <p>
                  {t('mission.p2')}
                </p>
              </div>
            </div>
            <div>
              <div className="rounded-lg overflow-hidden">
                <LazyImage
                  src={`${BASE}About/ydour_web_optimized.jpg`}
                  alt={t('mission.imageAlt')}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm text-muted-foreground mt-2 text-center">
                {t('mission.caption')}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t('values.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{t('values.unityTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {t('values.unityDesc')}
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{t('values.amateurismTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {t('values.amateurismDesc')}
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{t('values.socialTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {t('values.socialDesc')}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <TeamSection teamMembers={teamMembers} />

        {/* Old Members Section */}
        <section className="mt-16">
          <OldMembersSection oldMembers={oldMembers} />
        </section>
      </div>
    </div>
    </>
  );
}
