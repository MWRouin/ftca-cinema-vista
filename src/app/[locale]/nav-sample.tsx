"use client";

import { useTranslation } from "react-i18next";

/** Temporary M4 check: a client component translating through the provider. */
export function NavSample() {
  const { t } = useTranslation("common");
  return <p data-testid="client-t">{t("nav.movies")} / {t("nav.palmares")}</p>;
}
