import { cn } from "@/lib/utils";

interface ElementTitleProps {
    /** Text content of the heading */
    title: string;
    /** Whether to apply entrance animation */
    useInAnimation?: boolean;
}

export function ElementTitle({
    title,
    useInAnimation = true,
}: ElementTitleProps) {
    return (
        <h1
            className={cn(
                "font-display text-4xl md:text-5xl 2xl:text-6xl font-semibold leading-[1.05] tracking-[-0.015em] text-brand mb-6",
                useInAnimation && "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3"
            )}
        >
            {title}
        </h1>
    );
}
