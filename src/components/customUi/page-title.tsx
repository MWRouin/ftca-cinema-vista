interface PageTitleProps {
    /** Text content of the heading */
    title: string;
    /** Whether to apply entrance animation */
    useInAnimation?: boolean;
}

export function PageTitle({
    title,
    useInAnimation = true,
}: PageTitleProps) {
    if (useInAnimation)
        return <h1 className="text-5xl sm:text-5xl md:text-6xl 2xl:text-7xl mb-6 inline-block bg-gradient-to-br py-2 -my-2 from-primary via-primary/70 to-primary dark:from-primary/75 dark:via-primary dark:to-primary/75 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-3">{title}</h1>;
    return <h1 className="text-5xl sm:text-5xl md:text-6xl 2xl:text-7xl mb-6 inline-block bg-gradient-to-br py-2 -my-2 from-primary via-primary/70 to-primary dark:from-primary/75 dark:via-primary dark:to-primary/75 bg-clip-text text-transparent">{title}</h1>;
}