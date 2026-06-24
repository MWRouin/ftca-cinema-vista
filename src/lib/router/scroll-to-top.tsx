import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { stripLocale } from "@/i18n/config"

const scrollToTop = () => window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant" //"smooth"
});

export default function ScrollToTopOnLocationChange() {
    const { pathname } = useLocation();
    // Compare the locale-neutral path so a language switch (e.g. /en/movies →
    // /fr/movies) is not treated as a page change and the scroll position is kept.
    const neutralPath = stripLocale(pathname);
    const previousPath = useRef<string | null>(null);

    useEffect(() => {
        if (previousPath.current === neutralPath) return;
        previousPath.current = neutralPath;
        scrollToTop();
    }, [neutralPath]);

    return null;
}
