
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageTitle } from '@/components/customUi/page-title';
import { CalendarX, FolderX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LazyImage } from '@/components/customUi/lazy-image';
import MetaHeader from '@/lib/metadata/metadata';
import { PAGE_SEO } from '@/lib/metadata/seo-constants';
import { LocalLink, useLocale } from '@/i18n/locale';

export default function Events() {
  const { t } = useTranslation('events');
  const locale = useLocale();
  const events = [
    {
      id: 'ydour',
      title: "Ydour - يدور",
      date: "2025-02-22",
      time: "18:30",
      location: "Café culturel LIBER'THÉ",
      description: "YDOUR exists to bring together the amateur cinema community and cinema lovers.",
      image: "/events/ydour/ydour-title.jpg",
      status: "past",
      category: "Screening & Discussion"
    },
    {
      id: 'films-de-hammamlif',
      title: "Films de Hammam-Lif",
      date: "2025-12-27",
      time: "16:30",
      location: "Complexe culturel Ali Ben Ayed",
      description: "\"Films de Hammam-Lif\" aims to revive this lost spirit and inspire a new generation’s connection to cinema and culture.",
      image: "/events/FilmsDeHammamLif/FilmsDeHammamLif-title.jpg",
      status: "past",
      category: "Screening & Exhibition"
    },
    {
      id: 'afterwork-movienight',
      title: "Afterwork - Movie Night",
      date: "2026-01-28",
      time: "19:00",
      location: "Espace culturel DayOne",
      description: "Intimate film screenings and discussions with filmmakers at Day One. A space to explore the ideas and process behind each film.",
      image: "/events/afterworkMovienight/hero.jpg",
      status: "past",
      category: "Screening & Discussion"
    },
    {
      id: 'ydour-v2',
      title: "Ydour - يدور (2nd Edition)",
      date: "2026-05-15",
      time: "18:00",
      location: "Espace culturel L'Écurie",
      description: "Second edition of YDOUR: a space for amateur cinema.",
      image: "/events/ydour2/ydour2.webp",
      status: "past",
      category: "Screening, Discussion, and more.."
    }
  ];

  const upcomingEvents = events
    .filter(event => event.status === 'upcoming')
    .sort((event1, event2) => new Date(event1.date).getTime() - new Date(event2.date).getTime());

  const pastEvents = events
    .filter(event => event.status === 'past')
    .sort((event1, event2) => new Date(event2.date).getTime() - new Date(event1.date).getTime());

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', options);
  };

  const EventCard = ({ event }: { event: typeof events[0] }) => (
    <Card className="group relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1 max-w-[720px]">

      {/* Clickable overlay */}
      <LocalLink
        to={`/events/${event.id}`}
        aria-label={t('openEvent', { title: event.title })}
      >

        <div className="aspect-[16/9] overflow-hidden rounded-t-lg relative z-20">
          <LazyImage
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <CardHeader className="relative z-20">
          <div className="flex justify-between items-start mb-2">
            <Badge variant='secondary'>
              {t(`items.${event.id}.category`)}
            </Badge>
            <Badge variant={event.status === 'upcoming' ? 'default' : 'outline'}>
              {event.status === 'upcoming' ? t('badgeUpcoming') : t('badgePast')}
            </Badge>
          </div>
          <CardTitle className="text-xl">{event.title}</CardTitle>
          <CardDescription className="space-y-1">
            <span className="block font-medium">
              {t('dateTime', { date: formatDate(event.date), time: event.time })}
            </span>
            <span className="block text-sm text-amber-600 dark:text-amber-400">
              📍 {event.location}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-20">
          <p className="text-muted-foreground">{t(`items.${event.id}.description`)}</p>
        </CardContent>
      </LocalLink>
    </Card>
  );


  return (
    <>
      <MetaHeader {...PAGE_SEO.events} />
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <PageTitle title={t('title')} />
            <div className="section-divider w-24 mx-auto mb-8"></div>
            <div className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              {t('subtitle')}
            </div>
          </div>

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">{t('upcoming')}</h2>
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 gap-8">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/50 rounded-lg space-y-4">
                <CalendarX className="w-20 h-20 mx-auto text-muted-foreground" />

                <p className="text-lg text-muted-foreground">
                  {t('noUpcoming')}
                </p>

                <p className="text-sm text-muted-foreground">
                  {t('checkBackSoon')}
                </p>
              </div>
            )}
          </section>}

          {/* Past Events */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">{t('past')}</h2>
            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/50 rounded-lg space-y-4">
                <FolderX className="w-20 h-20 mx-auto text-muted-foreground" />
                <p className="text-lg text-muted-foreground">{t('noEvents')}</p>
                <p className="text-sm text-muted-foreground">{t('checkBack')}</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
