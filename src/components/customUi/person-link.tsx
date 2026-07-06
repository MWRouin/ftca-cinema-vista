import type { ReactNode } from "react";
import { LocalLink } from "@/i18n/locale";
import { isPersonPublic } from "@/data/movies";
import { cn } from "@/lib/utils";

interface PersonLinkProps {
  /** The resolved person id; when it maps to a public person, name becomes a link. */
  personId?: string | null;
  /** The displayed name (or localized name token from <Trans>). */
  children: ReactNode;
  className?: string;
}

/**
 * Links a person's name to their page when they're a public member; otherwise
 * renders the name as plain text. Single source of truth for the "linked name"
 * treatment shared by a movie's credits and a blog article's author.
 */
export function PersonLink({ personId, children, className }: PersonLinkProps) {
  if (personId && isPersonPublic(personId)) {
    return (
      <LocalLink
        to={`/people/${personId}`}
        className={cn("underline-offset-2 hover:text-primary hover:underline transition-colors", className)}
      >
        {children}
      </LocalLink>
    );
  }
  return <>{children}</>;
}
