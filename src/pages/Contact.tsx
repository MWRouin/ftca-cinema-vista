
import { PageTitle } from '@/components/customUi/page-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MetaHeader from '@/lib/metadata/metadata';
import { PAGE_SEO } from '@/lib/metadata/seo-constants';

export default function Contact() {
  const { t } = useTranslation('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    //console.log('Form submitted:', formData);
    const { name, subject, message } = formData;
    const mailto = `mailto:contact@cineamateur-hlif.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(`${message}\n\nName: ${name}`)}`;

    window.location.href = mailto;
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    /* alert('Thank you for your message! We\'ll get back to you soon.'); */
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/ftcahamhama/', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/ftca.hlif/', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@ftcahammamlif', label: 'YouTube' },
  ];

  return (
    <>
      <MetaHeader {...PAGE_SEO.contact} />
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t('form.title')}</CardTitle>
                <CardDescription>
                  {t('form.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-4">*/}
                  <div>
                    <Label htmlFor="name">{t('form.nameLabel')}</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      //required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('form.namePlaceholder')}
                    />
                  </div>
                  {/* <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        //required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                      />
                    </div> */}
                  {/* </div> */}
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
                    />
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

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{t('details.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Mail className="w-5 h-5 text-primary  dark:text-accent" />
                    <h4 className="font-semibold">{t('details.email')}</h4>
                  </div>
                  <p className="text-muted-foreground">contact@cineamateur-hlif.com</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Phone className="w-5 h-5 text-primary  dark:text-accent" />
                    <h4 className="font-semibold">{t('details.phone')}</h4>
                  </div>
                  <p className="text-muted-foreground">+216 55 466 297</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <MapPin className="w-5 h-5 text-primary  dark:text-accent" />
                    <h4 className="font-semibold">{t('details.address')}</h4>
                  </div>
                  <p className="text-muted-foreground">
                    80 RN1, Hammam-Lif
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Meeting Times */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{t('meetings.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">{t('meetings.weekly')}</h4>
                  <p className="text-muted-foreground">{t('meetings.weeklyTime')}</p>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{t('follow.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-muted-foreground">{t('follow.subtitle')}</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {socialLinks.map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        //className="w-9 h-9 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors group"
                        className="flex items-center justify-center space-x-2 text-primary dark:text-accent hover:scale-110 transition-colors group"
                        aria-label={label}
                      >
                        <Icon className="w-5 h-5 group-hover:scale-110" /> <span className="group-hover:scale-110">{label}</span>
                      </a>
                    ))}
                    {/* <a href="https://www.facebook.com/ftcahamhama/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Facebook</a>
                    <a href="https://www.instagram.com/ftca.hlif/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Instagram</a>
                    <a href="https://www.youtube.com/@ftcahammamlif" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">YouTube</a>
                   */}</div>
                </div>
              </CardContent>
            </Card>

            {/* Join Us */}
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800">
              <CardHeader>
                <CardTitle className="text-xl">{t('join.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t('join.text')}
                </p>
                {/* <p>Stay tuned</p> */}
                <a href='https://docs.google.com/forms/d/e/1FAIpQLScuvfikqSpUKanyxrXSs_TZzn4MTAdVmcy3Hvswp7Ux_p3pYQ/viewform'><Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">

                    {t('join.cta')}

                </Button> </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
