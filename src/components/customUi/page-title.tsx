import { cn } from "@/lib/utils";

interface PageTitleProps {
    /** Text content of the heading */
    title: string;
    /** Heading level. A page has one h1; section titles on the home page are h2. */
    as?: "h1" | "h2";
    /** Whether to apply entrance animation */
    useInAnimation?: boolean;
}

export function PageTitle({
    title,
    as: Heading = "h1",
    useInAnimation = true,
}: PageTitleProps) {
    return (
        <Heading
            className={cn(
                "font-display text-5xl md:text-6xl 2xl:text-7xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand mb-6",
                useInAnimation && "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3"
            )}
        >
            {title}
        </Heading>
    );
}
