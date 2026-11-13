'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/customUi/page-header';
import { PageContainer } from '@/components/customUi/page-container';
import { EmptyState } from '@/components/customUi/empty-state';
import { FolderX, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LazyImage } from '@/components/customUi/lazy-image';
import { LocalLink } from '@/i18n/locale';
import { useLocalizedDate } from '@/hooks/useLocalizedDate';
import { getEvents, type EventMeta } from '@/data/events';

const byDate = (event1: EventMeta, event2: EventMeta) =>
  new Date(event1.date).getTime() - new Date(event2.date).getTime();

function EventCard({ event }: { event: EventMeta }) {
  const { t } = useTranslation('events');
  const formatDate = useLocalizedDate();
  const upcoming = event.status === 'upcoming';

  return (
    <Card className="group relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1 max-w-[720px]">
      <LocalLink to={`/events/${event.id}`} aria-label={t('openEvent', { title: event.title })}>
        <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
          <LazyImage
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary">{t(`items.${event.id}.category`)}</Badge>
            <Badge variant={upcoming ? 'default' : 'outline'}>
              {upcoming ? t('badgeUpcoming') : t('badgePast')}
            </Badge>
          </div>
          <CardTitle className="text-xl">{event.title}</CardTitle>
          <CardDescription className="space-y-1">
            <span className="block font-medium">
              {t('dateTime', { date: formatDate(event.date), time: event.time })}
            </span>
            <span className="flex items-center gap-1.5 text-sm">
              <MapPin className="h-4 w-4 shrink-0 text-primary dark:text-accent" aria-hidden />
              {event.location}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground">{t(`items.${event.id}.description`)}</p>
        </CardContent>
      </LocalLink>
    </Card>
  );
}

export default function Events() {
  const { t } = useTranslation('events');
  const events = getEvents();

  // Upcoming: soonest first. Past: most recent first.
  const upcomingEvents = events.filter((event) => event.status === 'upcoming').sort(byDate);
  const pastEvents = events.filter((event) => event.status === 'past').sort(byDate).reverse();

  return (
    <PageContainer>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      {/* Upcoming Events (the section is hidden when there are none) */}
      {upcomingEvents.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t('upcoming')}</h2>
          <div className="grid grid-cols-1 gap-8">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

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
          <EmptyState icon={FolderX} title={t('noEvents')} subtitle={t('checkBack')} />
        )}
      </section>
    </PageContainer>
  );
}
