import { useEffect } from "react";

let appliedLang: string | null = null;

function applyLanguage(lang?: string, fallback = "en") {
    const normalized =
        /^[a-z]{2,3}$/.test(lang?.split(/[-_]/)[0] ?? "")
            ? lang!.toLowerCase().split(/[-_]/)[0]
            : fallback;

    if (appliedLang === normalized) return;

    appliedLang = normalized;
    document.documentElement.lang = normalized;
}

export function useHtmlLanguage(lang?: string) {
    useEffect(() => {
        if (lang) applyLanguage(lang);
    }, [lang]);
}

export const getCurrentLang = () => appliedLang;
