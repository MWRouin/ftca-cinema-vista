"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { useLocale } from "@/i18n/locale";
import { localizePath, stripLocale, LOCALE_STORAGE_KEY, type Locale } from "@/i18n/config";
import { useReportNavigation } from "@/lib/navigation-progress";

/**
 * Switches between EN and FR while preserving the current page. The button
 * shows the *current* language's code; clicking it switches to the
 * other. With only two locales a single toggle is clearest; this generalises
 * to a menu if more are added later. `labeled` is a full-width row with the
 * same code and the current language in words (the mobile drawer).
 */
export function LanguageToggle({ onDark = false, labeled = false }: { onDark?: boolean; labeled?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
  // The transition stays pending until the other locale's page has loaded.
  const [switching, startSwitch] = useTransition();
  useReportNavigation(switching);

  const next: Locale = locale === "en" ? "fr" : "en";

  const switchLanguage = () => {
    const neutralPath = stripLocale(pathname);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode); navigation still works */
    }
    // scroll: false keeps the reader's position, as a language switch isn't a page change.
    startSwitch(() => {
      router.push(
        localizePath(neutralPath, next) + window.location.search + window.location.hash,
        { scroll: false },
      );
    });
  };

  if (labeled) {
    return (
      <button
        onClick={switchLanguage}
        className="flex h-10 w-fit items-center gap-3 rounded-md px-2 text-left text-sm font-medium text-foreground/80 transition-colors hover:text-brand"
        aria-label={t("language.switchTo", { language: t(`language.${next}`) })}
      >
        <span className="w-5 text-center text-sm font-bold uppercase text-brand">{locale}</span>
        <span>{t("language.current", { language: t(`language.${locale}`) })}</span>
      </button>
    );
  }

  const buttonClass = onDark ? "text-white" : "text-brand";

  return (
    <button
      onClick={switchLanguage}
      className={`h-9 px-1.5 rounded-lg flex items-center bg-transparent transition-colors group ${buttonClass}`}
      aria-label={t("language.switchTo", { language: t(`language.${next}`) })}
      title={t("language.switchTo", { language: t(`language.${next}`) })}
    >
      <span className="text-base font-bold uppercase group-hover:scale-110 transition-transform">
        {locale}
      </span>
    </button>
  );
}
