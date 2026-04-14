import { Helmet } from "react-helmet-async";
import { OgType, CharSet } from "./metadata-types";
import { useHtmlLanguage } from "./html-lang";

interface MetaHeaderProps {
    lang?: string;
    title?: string;
    description?: string;
    author?: string;
    imageUrl?: string;
    imageAlt?: string;
    pageUrl?: string;
    ogType?: OgType;
};

// img "https://opengraph.b-cdn.net/production/images/e889e93c-a333-49e9-bb70-4d0506d588ff.jpg?token=Fbd-173Wg4scri1OkZIVXQEUGc9atCOObfuZX-GRquE&height=1200&width=1200&expires=33286675221"

// img alt "Club des cinéastes amateurs d'Hammam-Lif – FTCA Hammemlif"

//description "Club des cinéastes amateurs d'Hammam-Lif - FTCA Hammemlif - A passionate community of film enthusiasts. Beyond celebrating cinema as an art. We use it as a medium to question, reflect, and share ideas."

export default function MetaHeader({
    lang,
    title = "Club des cinéastes amateurs d'Hammam-Lif",
    description,
    author,
    imageUrl,
    imageAlt,
    pageUrl,
    ogType = "website"
}: MetaHeaderProps) {

    useHtmlLanguage(lang);

    const ogLocale = lang?.replace("-", "_") ?? "en_US";

    return (
        <Helmet>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            {pageUrl && <link rel="canonical" href={pageUrl} />}
            {description && <meta name="description" content={description} />}
            {author && <meta name="author" content={author} />}
            <meta name="theme-color" content="#000000" />
            <meta name="robots" content="index, follow" />

            {/* openGraph */}
            <meta property="og:locale" content={ogLocale} />
            <meta property="og:title" content={title} />
            <meta property="og:site_name" content="Club des cinéastes amateurs d'Hammam-Lif" />
            {pageUrl && <meta property="og:url" content={pageUrl} />}
            {description && <meta property="og:description" content={description} />}
            <meta property="og:type" content={ogType} />
            {imageUrl && <meta property="og:image" content={imageUrl} />}
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="1200" />
            {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
            <meta property="fb:pages" content="PAGE_ID" />

            {/* twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            {pageUrl && <meta name="twitter:url" content={pageUrl} />}
            {imageUrl && <meta name="twitter:image" content={imageUrl} />}
            {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
            {description && <meta name="twitter:description" content={description} />}
            <meta name="twitter:site" content="@ftcahammemlif" />
            <meta name="twitter:creator" content="@ftcahammemlif" />
        </Helmet>
    );
}