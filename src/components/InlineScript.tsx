'use client';

/**
 * An inline <script> that must run before first paint (theme class, locale
 * redirect). The server render emits a real script; on a client re-render
 * (language switch, hot reload) React would warn about a script it cannot run,
 * so there the type becomes text/template, which is inert. That is harmless
 * because the script already ran when the HTML was parsed.
 */
export function InlineScript({ code }: { code: string }) {
  return (
    <script
      suppressHydrationWarning
      type={typeof window === 'undefined' ? undefined : 'text/template'}
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
