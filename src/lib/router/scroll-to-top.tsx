import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const scrollToTop = () => window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant" //"smooth"
});

export default function ScrollToTopOnLocationChange() {
    useEffect(scrollToTop, [useLocation()])
    return null
}
