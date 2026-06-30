import type { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LazyImage } from "@/components/customUi/lazy-image";
import { LocalLink, useLocale } from "@/i18n/locale";
import { getMovieDescription, getDirectorNames, type Movie } from "@/data/movies";

/** A badge to surface on the card (e.g. a role the person held on the film). */
export type CardBadge = {
  label: string;
  variant?: ComponentProps<typeof Badge>["variant"];
};

interface MovieCardProps {
  /** The movie to render — the full data-layer Movie. */
  movie: Movie;
  /** Link target; defaults to the movie's detail page. */
  to?: string;
  /** Badges shown on the card (e.g. the Person filmography's role badges). */
  badges?: CardBadge[];
}

/**
 * Default meta line under the title: genre, plus the year when known.
 * Extend this to surface more movie data (duration, …) consistently across
 * every card without touching the call sites.
 */
function MovieMeta({ movie }: { movie: Movie }) {
  const parts = [movie.genre];
  if (movie.year !== "-") parts.push(String(movie.year));
  return <>{parts.filter(Boolean).join(" • ")}</>;
}

/**
 * The card's badges, rendered as a corner overlay on the poster. Kept in one
 * place so the presentation (corner, backing, position) can change without
 * touching any call site.
 */
function CardBadges({ badges }: { badges: CardBadge[] }) {
  if (badges.length === 0) return null;
  return (
    <div className="absolute right-2 bottom-2 z-10 flex flex-wrap justify-end gap-1.5">
      {badges.map((badge, i) => (
        <Badge
          key={`${badge.label}-${i}`}
          variant={badge.variant ?? "secondary"}
          className="text-xs shadow-sm backdrop-blur-sm bg-background/70 supports-[backdrop-filter]:bg-background/60"
        >
          {badge.label}
        </Badge>
      ))}
    </div>
  );
}

/**
 * Poster card for a movie — a linked 2:3 poster with title, meta line and
 * optional badges. Single, identical source of truth for every movie card
 * (Movies, Home featured, MoviePlayer related, Person filmography). Callers just
 * feed it a Movie (and optional badges); the card owns the rest.
 */
export function MovieCard({ movie, to, badges }: MovieCardProps) {
  const locale = useLocale();
  const { t } = useTranslation("movie");
  const description = getMovieDescription(movie, locale);
  const directorNames = getDirectorNames(movie);

  return (
    <Card className="group transition-all duration-300 hover:shadow-lg hover:scale-[1.015] active:shadow-lg active:scale-[1.015]">
      <LocalLink to={to ?? `/movies/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg bg-muted">
          <LazyImage
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-active:scale-105"
          />
          {(description || directorNames) && (
            <div className="absolute inset-0 z-[1] flex flex-col bg-black/85 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100">
              <div className="flex flex-1 items-center justify-center overflow-y-auto">
                {description && (
                  <p className="whitespace-pre-line text-xs leading-relaxed text-white/90 sm:text-sm">
                    {description}
                  </p>
                )}
              </div>
              {directorNames && (
                <p className="mt-3 shrink-0 text-xs text-white/70">
                  <span className="font-medium text-white/90">{t("directedByLabel")}</span> {directorNames}
                </p>
              )}
            </div>
          )}
          {badges && <CardBadges badges={badges} />}
        </div>
        <CardHeader>
          <CardTitle className="text-lg leading-tight transition-colors group-hover:text-primary group-active:text-primary">
            {movie.title}
          </CardTitle>
          <CardDescription>
            <MovieMeta movie={movie} />
          </CardDescription>
        </CardHeader>
      </LocalLink>
    </Card>
  );
}
