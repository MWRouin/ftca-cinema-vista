'use client';

import { PageHeader } from '@/components/customUi/page-header';
import { PageContainer } from '@/components/customUi/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { SocialLinks } from '@/components/customUi/social-links';
import { ClubMap } from '@/components/customUi/club-map';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_LAT,
  CONTACT_LNG,
  CONTACT_MAPS_URL,
  CONTACT_OSM_URL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
} from '@/lib/contact';

const EMPTY_FORM = { name: '', subject: '', message: '' };

export default function Contact() {
  const { t } = useTranslation('contact');
  const { t: tCommon } = useTranslation();
  const [formData, setFormData] = useState(EMPTY_FORM);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend: hand the message over to the visitor's mail app.
    const { name, subject, message } = formData;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(`${message}\n\nName: ${name}`)}`;
    setFormData(EMPTY_FORM);
  };

  return (
    <PageContainer>
        <PageHeader title={t('title')} subtitle={t('subtitle')} />

        {/* Reach us, then where to find us and how to join, with the message form last. */}
        <div className="space-y-8">
          {/* Row 1: contact details | meetings and social links */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle as="h2" className="text-xl">{t('details.title')}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col">
                {[
                  { href: `mailto:${CONTACT_EMAIL}`, icon: Mail, label: t('details.email'), value: CONTACT_EMAIL },
                  { href: CONTACT_PHONE_HREF, icon: Phone, label: t('details.phone'), value: CONTACT_PHONE },
                  {
                    href: CONTACT_MAPS_URL,
                    icon: MapPin,
                    label: t('details.address'),
                    value: CONTACT_ADDRESS,
                    external: true,
                  },
                ].map(({ href, icon: Icon, label, value, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer', 'aria-label': tCommon('a11y.viewOnMaps') }
                      : {})}
                    className="-mx-6 flex items-start gap-3 px-6 py-3 transition-colors hover:bg-muted/50"
                  >
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <span>
                      <span className="block font-semibold">{label}</span>
                      <span className="block break-all text-muted-foreground">{value}</span>
                    </span>
                  </a>
                ))}
              </CardContent>
            </Card>

            <div className="flex flex-col gap-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle as="h2" className="text-xl">{t('follow.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <SocialLinks variant="chip" className="-ml-2 space-x-2" />
                <p className="text-muted-foreground">{t('follow.subtitle')}</p>
              </CardContent>
            </Card>

            <Card className="flex-1">
              <CardHeader>
                <CardTitle as="h2" className="text-xl">{t('meetings.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-1">{t('meetings.weekly')}</h3>
                <p className="text-muted-foreground">{t('meetings.weeklyTime')}</p>
              </CardContent>
            </Card>
            </div>
          </div>

          {/* Row 2: the map | joining, then the message form */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* The map stretches to the height of the column beside it. */}
            <Card className="flex flex-col overflow-hidden">
              <ClubMap
                lat={CONTACT_LAT}
                lng={CONTACT_LNG}
                label={t('details.mapTitle')}
                recenterLabel={t('details.recenter')}
                className="min-h-80 w-full flex-1"
              />
              <div className="flex gap-3 p-4">
                <Button asChild variant="outline" className="flex-1 border-accent/30">
                  <a href={CONTACT_OSM_URL} target="_blank" rel="noopener noreferrer">
                    {t('details.openOsm')}
                    <ArrowUpRight aria-hidden />
                  </a>
                </Button>
                <Button asChild variant="outline" className="flex-1 border-accent/30">
                  <a href={CONTACT_MAPS_URL} target="_blank" rel="noopener noreferrer">
                    {t('details.openGoogleMaps')}
                    <ArrowUpRight aria-hidden />
                  </a>
                </Button>
              </div>
            </Card>

            <div className="flex flex-col gap-8">
            {/* Join Us: the accent tint marks it as the page's invitation. */}
            <Card className="flex flex-col bg-accent/10">
              <CardHeader>
                <CardTitle as="h2" className="text-2xl">{t('join.title')}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-6">
                <p className="text-muted-foreground">{t('join.text')}</p>
                {/* Membership is closed for now: the button explains it in a
                    popup. To reopen, restore the link to JOIN_FORM_URL:
                <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/85">
                  <a href={JOIN_FORM_URL} target="_blank" rel="noopener noreferrer">
                    {t('join.cta')}
                  </a>
                </Button>
                */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/85">
                      {t('join.cta')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    closeLabel={t('a11y.close', { ns: 'common' })}
                    className="max-w-md border-accent/30 bg-card"
                  >
                    {/* The same wheat hairline as the footer's top edge. */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                    <DialogHeader className="items-center space-y-3 text-center sm:text-center">
                      <DialogTitle className="font-display text-2xl">{t('join.closedTitle')}</DialogTitle>
                      <DialogDescription className="text-foreground/85">{t('join.closedText')}</DialogDescription>
                    </DialogHeader>
                    <SocialLinks variant="chip" className="justify-center space-x-2" />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

                  {/* The message form, last */}
              <Card>
                <CardHeader>
                  <CardTitle as="h2" className="text-2xl">{t('form.title')}</CardTitle>
                  <CardDescription>{t('form.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="name">{t('form.nameLabel')}</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t('form.namePlaceholder')}
                          className="border-accent/30"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">{t('form.subjectLabel')}</Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder={t('form.subjectPlaceholder')}
                          className="border-accent/30"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="message">{t('form.messageLabel')}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t('form.messagePlaceholder')}
                        className="border-accent/30"
                        rows={6}
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      {t('form.submit')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
    </PageContainer>
  );
}
