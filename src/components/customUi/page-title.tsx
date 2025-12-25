interface PageTitleProps {
    title: string;
};

export function PageTitle({ title }: PageTitleProps) {
    return (
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-3">{title}</h1>
        /*<h1 className="text-5xl md:text-6xl font-bold mb-6 text-shimmer">Contact Us</h1>*/
    );
}