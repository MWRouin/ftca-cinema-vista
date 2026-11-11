import { SUPPORTED_LOCALES } from "@/i18n/config";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <main className="p-8">Next.js scaffold ({locale})</main>;
}
