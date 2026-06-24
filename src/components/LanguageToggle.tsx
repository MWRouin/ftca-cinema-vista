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

  const buttonClass = onDark ? "text-white" : "text-primary";

  return (
    <button
      onClick={switchLanguage}
      className={`h-9 px-1.5 rounded-lg flex items-center bg-transparent transition-colors group ${buttonClass}`}
      aria-label={t("language.switchTo", { language: t(`language.${next}`) })}
      title={t("language.switchTo", { language: t(`language.${next}`) })}
    >
      <span className="flex items-center gap-1.5 group-hover:scale-110 transition-transform">
        <Flag
          className="w-6 h-auto rounded-[2px] shadow-sm ring-1 ring-black/10"
          aria-hidden="true"
        />
        <span className="text-sm font-semibold uppercase">{locale}</span>
      </span>
    </button>
  );
}
