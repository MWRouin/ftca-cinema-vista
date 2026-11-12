import { isLocale } from "@/i18n/config";
import { getT } from "@/i18n/instance";
import { NavSample } from "./nav-sample";

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const t = getT(locale);
  return (
    <main className="p-8">
      <p>Next.js scaffold ({locale})</p>
      <p data-testid="server-t">{t("nav.home")}</p>
      <NavSample />
    </main>
  );
}
