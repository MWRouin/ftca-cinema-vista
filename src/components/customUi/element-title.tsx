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
                "text-3xl md:text-4xl 2xl:text-5xl mb-6 inline-block bg-gradient-to-br py-2 -my-2 px-[0.1em] -mx-[0.1em] from-primary via-primary/70 to-primary dark:from-primary/75 dark:via-primary dark:to-primary/75 bg-clip-text text-transparent",
                useInAnimation && "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3"
            )}
        >
            {title}
        </h1>
    );
}
