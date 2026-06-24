import type { ComponentType, SVGProps } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GB, FR } from "country-flag-icons/react/3x2";

import { useLocale } from "@/i18n/locale";
import { localizePath, stripLocale, LOCALE_STORAGE_KEY, type Locale } from "@/i18n/config";

// Flag per locale. English uses the Union Jack (the common "English language"
// convention); swap GB → US here if you prefer the US flag.
const FLAGS: Record<Locale, ComponentType<SVGProps<SVGSVGElement> & { title?: string }>> = {
  en: GB,
  fr: FR,
};

/**
 * Switches between EN and FR while preserving the current page. The button
 * shows the *current* language (flag + code); clicking it switches to the
 * other. With only two locales a single toggle is clearest; this generalises
 * to a menu if more are added later.
 */
export function LanguageToggle({ onDark = false }: { onDark?: boolean }) {
  const locale = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const next: Locale = locale === "en" ? "fr" : "en";
  const Flag = FLAGS[locale];

  const switchLanguage = () => {
    const neutralPath = stripLocale(location.pathname);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode); navigation still works */
    }
    navigate(localizePath(neutralPath, next) + location.search + location.hash);
  };

  const buttonClass = onDark
    ? "bg-transparent text-white hover:bg-white/10"
    : "bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 text-primary";

  return (
    <button
      onClick={switchLanguage}
      className={`h-9 px-2.5 rounded-lg flex items-center gap-1.5 transition-colors group ${buttonClass}`}
      aria-label={t("language.switchTo", { language: t(`language.${next}`) })}
      title={t("language.switchTo", { language: t(`language.${next}`) })}
    >
      <Flag
        className="w-5 h-auto rounded-[2px] shadow-sm ring-1 ring-black/10 group-hover:scale-110 transition-transform"
        aria-hidden="true"
      />
      <span className="text-xs font-semibold uppercase">{locale}</span>
    </button>
  );
}
