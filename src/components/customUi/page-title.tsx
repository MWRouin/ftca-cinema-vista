//interface PageTitleProps {
//    /** Text content of the heading */
//    title: string;
//    /** Heading level, from 1 to 4 (h5 and h6 not supperted) */
//    titleLevel?: 1 | 2 | 3 | 4;
//    /** Whether to apply entrance animation */
//    useInAnimation?: boolean;
//}
//
//const defaultClassName = 'inline-block bg-gradient-to-br py-2 -my-2 from-primary via-primary/70 to-primary dark:from-primary/75 dark:via-primary dark:to-primary/75 bg-clip-text text-transparent mb-6';
//const animationClassName = 'animate-in fade-in slide-in-from-bottom-3';
//
//const getSizeClassName = (titleLevel: 1 | 2 | 3 | 4) => `text-${5 - titleLevel}xl md:text-${6 - titleLevel}xl`;
//
//const getTitleTag = (titleLevel: 1 | 2 | 3 | 4) => `h${titleLevel}` as keyof JSX.IntrinsicElements;
//
//export function PageTitle({
//    title,
//    titleLevel = 1,
//    useInAnimation = true,
//}: PageTitleProps) {
//    const Tag = getTitleTag(titleLevel);
//
//    const className = `inline-block bg-gradient-to-br py-2 -my-2 from-primary via-primary/70 to-primary dark:from-primary/75 dark:via-primary dark:to-primary/75 bg-clip-text text-transparent text-5xl md:text-6xl mb-6 ${useInAnimation ? animationClassName : ''}`;
//
//    return <Tag className={className}>{title}</Tag>;
//}



interface PageTitleProps {
    /** Text content of the heading */
    title: string;
    /** Heading level, from 1 to 4 (h5 and h6 not supperted) */
    titleLevel?: 1 | 2 | 3 | 4;
    /** Whether to apply entrance animation */
    useInAnimation?: boolean;
}

const defaultClassName: string = 'text-5xl sm:text-5xl md:text-6xl 2xl:text-7xl mb-6 inline-block bg-gradient-to-br py-2 -my-2 from-primary via-primary/70 to-primary dark:from-primary/75 dark:via-primary dark:to-primary/75 bg-clip-text text-transparent ';
const inAnimationClassName: string = 'animate-in fade-in slide-in-from-bottom-3 ';

const getClassName = (useInAnimation: boolean) => {
    const baseClassName = defaultClassName;
    if (!useInAnimation) return baseClassName;
    return baseClassName + inAnimationClassName;
}

export function PageTitle({
    title,
    useInAnimation = true,
}: PageTitleProps) {

    const className = getClassName(useInAnimation);

    return <h1 className={className}>{title}</h1>;
}