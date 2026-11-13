import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LocalLink } from "@/i18n/locale";
import { usePreviousPage } from "@/lib/back-navigation";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  /** Locale-neutral path to go to when there is no in-site page to return to (e.g. "/events"). */
  to: string;
  /** Already-translated label for `to`. */
  label: string;
  /** Wrapper classes. Defaults to the top-of-page bottom margin; pass e.g.
   *  "mb-0" to drop it (inside a not-found card). */
  className?: string;
}

const trimSlash = (path: string) => (path.length > 1 ? path.replace(/\/$/, "") : path);

/**
 * "Back" link styled as an outline button, used atop detail pages. When the
 * visitor came from another page of the site it steps back in history (so
 * that page comes back as they left it) and reads "Back", or keeps `label`
 * when that page is `to`. Otherwise (opened from a shared link or a search)
 * it is a plain link to `to`. The href is always `to`, for new tabs and no JS.
 */
export function BackButton({ to, label, className }: BackButtonProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const previous = usePreviousPage(usePathname());
  const text = previous === null || trimSlash(previous) === trimSlash(to) ? label : t("nav.back");

  return (
    <div className={cn("mb-6", className)}>
      <Button asChild variant="outline">
        <LocalLink
          to={to}
          onClick={(event) => {
            const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
            if (previous === null || modified) return;
            event.preventDefault();
            router.back();
          }}
        >
          {text}
        </LocalLink>
      </Button>
    </div>
  );
}
