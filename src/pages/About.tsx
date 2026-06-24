
import { LazyImage } from '@/components/customUi/lazy-image';
import { PageTitle } from '@/components/customUi/page-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import MetaHeader from '@/lib/metadata/metadata';
import { PAGE_SEO } from '@/lib/metadata/seo-constants';

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
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <LazyImage
                  src={member.image ? member.image : defaultUserImage}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-xl">{member.name}</CardTitle>
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
                  <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </span>
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

  const teamMembers = [
    {
      name: "Wadii Klaii",
      role: "President",
      bio: "Multi-disciplinary artist with a passion for cinema. Started as a editor and now exploring directing.",
      image: `${BASE}Members/wadii.jpg`
    },
    {
      name: "Seif Eddine Larbi",
      role: "General Secretary",
      bio: "Passionate about writing which leads to a deeper understanding of film narratives.",
      image: `${BASE}Members/seif.jpg`
    },
    {
      name: "Hichem Gtari",
      role: "Treasurer",
      bio: "Mechanical Engineer with a passion for filmmaking. Enjoys exploring the technical aspects of film production.",
      image: `${BASE}Members/hichem.jpg`
    },
    {
      name: "Khalil Said",
      role: "Member",
      bio: "Mechanical engineer with a passion for filmmaking. Passionate about photography and directing.",
      image: `${BASE}Members/khalil.jpg`
    },
    {
      name: "Safa Khiari",
      role: "Member",
      bio: "French Teacher and film enthusiast, loves exploring cinema from different cultures.",
      image: `${BASE}Members/safe.jpg`
    },
    {
      name: "Wissem Rouin",
      role: "Member",
      bio: "Web Developer and cinema enthusiast.",
      image: `${BASE}Members/wissem.jpg`
    },
    {
      name: "Nour Ben Chiekh",
      role: "Member",
      bio: "Journalist and film lover. Enjoys analyzing films from a socio-political perspective.",
      image: `${BASE}Members/nour.jpg`
    },
    {
      name: "Aziz Baraketi",
      role: "Member",
      bio: "Film Buff and studied cinema. Started as a photographer and now he became a camera operator.",
      image: `${BASE}Members/aziz.jpg`
    },
    {
      name: "Itaf Daghsen",
      role: "Member",
      bio: "Actress and film enthusiast. Passionate about storytelling through performance.",
      image: `${BASE}Members/itaf.jpg`
    },
    {
      name: "Hihem Toumi",
      role: "Member",
      bio: "",
      image: `${BASE}Members/hichemToumi.jpg`
    },
    {
      name: "Ghassen Jemaia",
      role: "Member",
      bio: "",
      image: `${BASE}Members/ghassen.jpg`
    },
    {
      name: "Taieb Ben Ameur",
      role: "Member",
      bio: "",
      image: `${BASE}Members/taiebbenameur.jpg`
    },
    {
      name: "Fares Ben Khelifa",
      role: "Member",
      bio: "",
      image: `${BASE}Members/faresbenkhelifa.jpg`
    },
    {
      name: "Ghassen Ben Slema",
      role: "Member",
      bio: "",
      image: `${BASE}Members/ghassenbenslama.jpg`
    },
    {
      name: "Halim Jerbi",
      role: "Member",
      bio: "",
      image: `${BASE}Members/halim.jpg`
    },
    {
      name: "Ines Ben Halima",
      role: "Member",
      bio: "",
      image: `${BASE}Members/inesbenhalima.jpg`
    },
    {
      name: "Maha Ezzine",
      role: "Member",
      bio: "",
      image: `${BASE}Members/mahaezzine.png`
    },
    {
      name: "Mayssa Ezzine",
      role: "Member",
      bio: "",
      image: `${BASE}Members/mayssa.jpg`
    },
    {
      name: "Maher Ben Khelifa",
      role: "Member",
      bio: "",
      image: `${BASE}Members/maher.jpg`
    },
    {
      name: "Mehdi Ben Farhat",
      role: "Member",
      bio: "",
      image: `${BASE}Members/mahdi.jpg`
    },
    {
      name: "Youssef El Behi",
      role: "Member",
      bio: "",
      image: `${BASE}Members/youssef.jpg`
    },
    {
      name: "Zeyneb Ben Ghachem",
      role: "Member",
      bio: "",
      image: ""
    }
  ];
  const oldMembers = [
    {
      name: "Kamel Staali",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Wissem Rebah",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Abdelkader Chikhawi",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Amor Sbika",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Ridha Ben Hlima",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Mourad Mahjbi",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Imen Nafti",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Rachiq Meddeb",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Mohamed Ali Bahroun",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Khaled Tounsi",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Walid Chebbi",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Yassine Bhar",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Mehdi Mokrani",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Slim Fassatoui",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Walid Mattar",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Yahya Gabous",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Mohamed Khiri",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Ridha Achour",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Chaffai Zaafouri",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Ahmed Ben Amor",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Jalel Ben Dana",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Lotfi Moudoud",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Lotfi Trabelsi",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Moncef Ben Mrad",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Said Ben Sedrine",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Ridha Baccar",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Salma Baccar",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Najet Mabouj",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Raouf Ben Mosly",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Hamadi Ghelella",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Rafik Staali",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Meher Harrazi",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Yosra Nefti",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Akrem Tliba",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Fethi Ben Slema",
      role: "Honorary Member",
      bio: "",
      image: ""
    },
    {
      name: "Manel Karkour",
      role: "Honorary Member",
      bio: "",
      image: ""
    }
  ];

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
