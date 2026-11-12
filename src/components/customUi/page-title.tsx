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
                "text-5xl md:text-6xl 2xl:text-7xl mb-6 inline-block bg-gradient-to-br py-2 -my-2 from-primary via-primary/70 to-primary dark:from-primary/75 dark:via-primary dark:to-primary/75 bg-clip-text text-transparent",
                useInAnimation && "animate-in fade-in slide-in-from-bottom-3"
            )}
        >
            {title}
        </Heading>
    );
}
