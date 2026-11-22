'use client';

// The home hero's slider: the club's description, then the items the club
// features (styles in home-hero.css, "Featured slider").

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { getMovieById, getMovies, getDirectorNames, getMovieDescription } from '@/data/movies';
import { getEvents } from '@/data/events';
import { getBlogArticleBySlug, getFeaturedArticle } from '@/data/blog';
import { LocalLink } from '@/i18n/locale';
import { cn } from '@/lib/utils';

/**
 * The hero's featured item, picked by hand by the club: a film, an event, a
 * blog article, or a free note. `label` and `text` override the defaults
 * (for example "Award-winning film" and why it is featured).
 */
export type Featured =
  // Without `id`: the club's latest film (the first in the catalog).
  | { kind: 'film'; id?: string; label?: string; text?: string }
  | { kind: 'event'; id: string; label?: string; text?: string }
  // Without `slug`: the blog's lead article (`featured` in blog.ts, as on the Blog page).
  | { kind: 'article'; slug?: string; label?: string; text?: string }
  // `href` is a site path ("/contact"); it goes through LocalLink.
  | { kind: 'note'; label?: string; title: string; text?: string; href?: string; image?: string };

/**
 * What the hero features, in slide order, after the club slide. Empty: the
 * hero shows only the club slide, with no slider controls. The commented
 * lines are examples of each kind (their texts are placeholders).
 */
const FEATURED: Featured[] = [
  { kind: 'article' },
  { kind: 'film' },
  // { kind: 'film', id: 'wed-trabelsia', label: 'Award-winning film (demo)', text: 'Demo text: one line on why the club features this film.' },
  // { kind: 'event', id: 'ydour-v2', label: 'Live event (demo)', text: 'Demo text: screenings, workshops, an exhibition and music.' },
  // { kind: 'article', slug: 'amateur-cinema-is-the-only-free-cinema' },
  // { kind: 'note', title: 'Membership is open for the new season (demo)', text: 'Demo text: a short announcement with an optional link.', href: '/contact' },
];

/** One slide, ready to render. `body` replaces the title and text (the club slide). */
type Slide = {
  label: string;
  title?: string;
  /** A short line under the title (a film's director and year). */
  meta?: string;
  text?: string;
  body?: ReactNode;
  image?: string;
  /** Language of the title and text when it isn't the page's (an Arabic article). */
  lang?: string;
  href?: string;
  cta: string;
  /** A second, quieter button beside the first. */
  secondary?: { href: string; cta: string };
};

function resolve(item: Featured, t: (key: string) => string, lang: string): Slide | null {
  switch (item.kind) {
    case 'film': {
      const movie = item.id ? getMovieById(item.id) : getMovies()[0];
      if (!movie) return null;
      return {
        label: item.label ?? t(item.id ? 'featured.featuredFilm' : 'featured.latestFilm'),
        title: movie.title,
        meta: [getDirectorNames(movie), movie.year].filter(Boolean).join(' · '),
        // The synopsis's first paragraph, in the page's language.
        text: item.text ?? getMovieDescription(movie, lang)?.split('\n\n')[0],
        image: movie.image,
        href: `/movies/${movie.id}`,
        cta: t('featured.ctaFilm'),
        secondary: { href: '/movies', cta: t('featured.ctaMovies') },
      };
    }
    case 'event': {
      const event = getEvents().find((e) => e.id === item.id);
      if (!event) return null;
      return {
        label: item.label ?? t('featured.featuredEvent'),
        title: event.title,
        text: item.text ?? `${event.date} · ${event.location}`,
        image: event.image,
        href: `/events/${event.id}`,
        cta: t('featured.ctaEvent'),
      };
    }
    case 'article': {
      const article = item.slug ? getBlogArticleBySlug(item.slug) : getFeaturedArticle();
      if (!article) return null;
      return {
        label: item.label ?? t('featured.featuredArticle'),
        title: article.title,
        text: item.text ?? article.excerpt,
        image: article.image,
        lang: article.lang,
        href: `/blog/${article.slug}`,
        cta: t('featured.ctaArticle'),
        secondary: { href: '/blog', cta: t('featured.ctaBlog') },
      };
    }
    case 'note':
      return {
        label: item.label ?? t('featured.featuredNote'),
        title: item.title,
        text: item.text,
        image: item.image,
        href: item.href,
        cta: t('featured.ctaNote'),
      };
  }
}

/** Time each slide stays before the slider moves on by itself. */
const AUTOPLAY_MS = 10000;

/** Distance from one slide to the next: the slide width plus the gap between
 *  slides (the gap keeps a sliver of the next slide from showing). */
const step = (track: HTMLElement) => {
  const first = track.children[0] as HTMLElement | undefined;
  const second = track.children[1] as HTMLElement | undefined;
  return first && second ? second.offsetLeft - first.offsetLeft : track.clientWidth;
};

/** In a looped track (copies at both ends), jumps from a copy to its real
 *  slide without animation. */
const settle = (track: HTMLElement, count: number) => {
  const pos = Math.round(track.scrollLeft / step(track));
  if (pos === 0) track.scrollTo({ left: count * step(track), behavior: 'instant' });
  if (pos === count + 1) track.scrollTo({ left: step(track), behavior: 'instant' });
};

/**
 * The home hero's slider: the club slide first (its description, with
 * "Discover our story"), then the featured items. No box: it blends into the
 * hero. Swipe on touch screens (one slide per swipe), bullets under the text,
 * and prev/next buttons beside them on desktop. The current slide's image
 * fills the hero's empty right side on desktop and sits behind the slider on
 * phones and tablets. It moves on by itself every 10 s. With nothing featured
 * it is a single, static slide.
 */
export function FeaturedCarousel({ description }: { description: ReactNode }) {
  const { t, i18n } = useTranslation('home');
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const slides: Slide[] = [
    {
      label: t('featured.clubLabel'),
      body: <p className="featured-text featured-text--long">{description}</p>,
      href: '/about',
      cta: t('hero.ctaStory'),
    },
    ...FEATURED.map((item) => resolve(item, t, i18n.language)).filter((slide): slide is Slide => slide !== null),
  ];
  const count = slides.length;

  // Infinite loop: once mounted, a copy of the last slide goes before the
  // first and a copy of the first after the last. Landing on a copy jumps
  // (instantly) to the real slide, so the slider never runs back across all
  // slides. The prerendered HTML has no copies, so it starts on slide 1. A
  // single slide doesn't loop and shows no controls.
  const [looped, setLooped] = useState(false);
  const offset = looped ? 1 : 0;

  useEffect(() => {
    if (count > 1) setLooped(true);
  }, [count]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (looped && track) track.scrollTo({ left: step(track), behavior: 'instant' });
  }, [looped]);

  // Settle when scrolling stops: `scrollend` where supported, else a short
  // pause after the last scroll event (Safari).
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !looped) return;
    const onEnd = () => settle(track, count);
    track.addEventListener('scrollend', onEnd);
    return () => track.removeEventListener('scrollend', onEnd);
  }, [looped, count]);

  const settleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const track = e.currentTarget;
    const pos = Math.round(track.scrollLeft / step(track)) - offset;
    setIndex((pos + count) % count);
    if (looped && !('onscrollend' in window)) {
      clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(() => settle(track, count), 150);
    }
  };

  // Auto-advance every 10 s. Any slide change (a swipe, a click) restarts the
  // wait; it holds while the pointer is over the slider, a finger is on it or
  // focus is inside it, and is off for visitors who prefer reduced motion.
  const [hovered, setHovered] = useState(false);
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);
  const held = hovered || touched || focused;

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !looped || held) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setTimeout(() => {
      track.scrollTo({ left: (index + 1 + offset) * step(track), behavior: 'smooth' });
    }, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, looped, offset, held]);

  /** Scrolls to slide `target`; −1 and `count` land on the copies, then settle. */
  const go = (target: number) => {
    const track = trackRef.current;
    if (!track) return;
    const pos = looped ? target + offset : (target + count) % count;
    track.scrollTo({ left: pos * step(track), behavior: 'smooth' });
  };

  const renderSlide = (slide: Slide, i: number, copy = false) => (
    <div
      key={copy ? `copy-${i}` : i}
      role={copy ? undefined : 'group'}
      aria-roledescription={copy ? undefined : 'slide'}
      aria-label={copy ? undefined : `${i + 1} / ${count}`}
      aria-hidden={copy || undefined}
      inert={copy || undefined}
      className="featured-slide"
    >
      <span className="featured-label">{slide.label}</span>
      {slide.body ?? (
        <>
          {slide.title && <span className="featured-title" lang={slide.lang} dir={slide.lang ? 'auto' : undefined}>{slide.title}</span>}
          {slide.meta && <span className="featured-meta">{slide.meta}</span>}
          {slide.text && <span className="featured-text" lang={slide.lang} dir={slide.lang ? 'auto' : undefined}>{slide.text}</span>}
        </>
      )}
      {slide.href && (
        <div className="featured-actions">
          <LocalLink to={slide.href} className="btn btn-primary">
            {slide.cta} <ArrowRight className="arrow" aria-hidden />
          </LocalLink>
          {slide.secondary && (
            <LocalLink to={slide.secondary.href} className="btn btn-secondary">
              {slide.secondary.cta}
            </LocalLink>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div
      className="featured"
      role="region"
      aria-roledescription="carousel"
      aria-label={t('featured.region')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setTouched(true)}
      onTouchEnd={() => setTouched(false)}
      onTouchCancel={() => setTouched(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      {/* The frame carries the wheat rule, out in the left margin so the slide
          text lines up with the tagline above. */}
      <div className="featured-frame">
        <div ref={trackRef} className="featured-track" onScroll={onScroll}>
          {looped && renderSlide(slides[count - 1], count - 1, true)}
          {slides.map((slide, i) => renderSlide(slide, i))}
          {looped && renderSlide(slides[0], 0, true)}
        </div>
      </div>

      {/* Bullets under the slide text; prev/next beside them on desktop only
          (touch screens swipe). */}
      {count > 1 && (
        <div className="featured-controls">
          <button type="button" onClick={() => go(index - 1)} aria-label={t('featured.previous')} className="featured-arrow">
            <ChevronLeft aria-hidden />
          </button>
          <div className="featured-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`${i + 1} / ${count}`}
                aria-current={i === index ? 'true' : undefined}
                className={cn('featured-dot', i === index && 'is-active')}
              />
            ))}
          </div>
          <button type="button" onClick={() => go(index + 1)} aria-label={t('featured.next')} className="featured-arrow">
            <ChevronRight aria-hidden />
          </button>
        </div>
      )}

      {/* The current slide's image (see the comment above the component). */}
      <div className="featured-visual" aria-hidden>
        {slides.map((slide, i) =>
          slide.image ? (
            <img key={i} src={slide.image} alt="" className={cn('featured-visual-image', i === index && 'is-active')} />
          ) : null,
        )}
      </div>
    </div>
  );
}
