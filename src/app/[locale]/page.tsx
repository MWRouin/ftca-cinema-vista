import { isLocale } from "@/i18n/config";

// Placeholder until the home page is ported (M7).
export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  return <div className="p-8">Next.js scaffold ({locale})</div>;
}
