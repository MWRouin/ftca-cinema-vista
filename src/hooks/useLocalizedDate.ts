import { useLocale } from "@/i18n/locale";

/**
 * Returns a formatter that renders an ISO date string in the active locale,
 * e.g. "22 février 2025" / "February 22, 2025". Single source of truth for the
 * long date format shared across Blog, Events and article cards.
 */
export function useLocalizedDate() {
  const locale = useLocale();
  return (dateString: string) =>
    new Date(dateString).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
}
