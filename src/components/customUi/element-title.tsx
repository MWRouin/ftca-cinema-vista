import { cn } from "@/lib/utils";

interface ElementTitleProps {
    /** Text content of the heading */
    title: string;
    /** Whether to apply entrance animation */
    useInAnimation?: boolean;
    /** Language of the title when it isn't the page's (an Arabic article); sets its direction too. */
    lang?: string;
}

export function ElementTitle({
    title,
    useInAnimation = true,
    lang,
}: ElementTitleProps) {
    return (
        <h1
            lang={lang}
            dir={lang ? "auto" : undefined}
            className={cn(
                "font-display text-4xl md:text-5xl 2xl:text-6xl font-semibold leading-[1.05] tracking-[-0.015em] text-brand mb-6",
                useInAnimation && "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3"
            )}
        >
            {title}
        </h1>
    );
}
