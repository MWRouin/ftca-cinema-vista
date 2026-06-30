import { Button } from "@/components/ui/button";
import { LocalLink } from "@/i18n/locale";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  /** Locale-neutral path to navigate back to (e.g. "/events"). */
  to: string;
  /** Already-translated button label. */
  label: string;
  /** Wrapper classes. Defaults to the top-of-page bottom margin; pass e.g.
   *  "mb-0" to drop it (inside a not-found card). */
  className?: string;
}

/** "Back to …" link styled as an outline button, used atop detail pages. */
export function BackButton({ to, label, className }: BackButtonProps) {
  return (
    <div className={cn("mb-6", className)}>
      <Button asChild variant="outline">
        <LocalLink to={to}>{label}</LocalLink>
      </Button>
    </div>
  );
}
