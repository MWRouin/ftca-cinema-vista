"use client";

import { createContext, useContext, type ComponentProps } from "react";
import Link, { useLinkStatus } from "next/link";

import { useReportNavigation } from "@/lib/navigation-progress";
import { DEFAULT_LOCALE, localizePath, type Locale } from "./config";

export const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

/** Current active locale (from the route). Provided by `I18nProvider`. */
export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** Tells the navigation progress bar while the surrounding link's page is loading. */
function LinkPending() {
  useReportNavigation(useLinkStatus().pending);
  return null;
}

/**
 * Link that automatically prefixes the active locale. Pass locale-neutral
 * paths (e.g. "/movies"); the locale prefix and trailing slash are added.
 */
export function LocalLink({
  to,
  children,
  ...rest
}: Omit<ComponentProps<typeof Link>, "href"> & { to: string }) {
  const locale = useLocale();
  return (
    <Link href={localizePath(to, locale)} {...rest}>
      {children}
      <LinkPending />
    </Link>
  );
}
