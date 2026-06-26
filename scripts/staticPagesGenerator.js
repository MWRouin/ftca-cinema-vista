import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import {
    SITE_URL,
    SITE_NAME,
    SITE_NAME_FULL,
    PAGE_SEO,
    buildPageTitle,
    DEFAULT_OG_IMAGE,
    DEFAULT_OG_IMAGE_ALT,
    DEFAULT_PERSON_OG_IMAGE,
    SUPPORTED_LOCALES,
    DEFAULT_LOCALE,
    OG_LOCALE,
    getLocalizedPageSeo,
    localizedPageUrl,
    hreflangAlternates,
    buildBreadcrumbList,
} from '../src/lib/metadata/seo-constants.ts';
import { getBlogArticles } from '../src/data/blog.ts';
import {
    getDirectors,
    getCast,
    getDirectorNames,
    creditName,
    getMovieDescription,
    getPublicPeople,
} from '../src/data/movies.ts';

/* ------------------ utils ------------------ */

const isString = (value) => typeof value === 'string' || value instanceof String;

function assertValue(test, error = "") {
    if (!isString(error)) throw new Error("Wrong usage of assert: error has to be a string");
    if (!test) throw new Error("Assertion error: " + error);
}

function normalizeFolderPath(rawPath) {
    return rawPath.endsWith('/') ? rawPath : rawPath + '/';
}

function escapeHtml(value = "") {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function resolveAssetUrl(url = "") {
    if (!url) return "";
    return url.replace("__BASE_URL__/", "/");
}

function setHtmlLang(html, locale) {
    // Every supported locale is LTR for now (Arabic/RTL is out of scope here).
    return html.replace(/<html[^>]*>/i, `<html lang="${locale}" dir="ltr">`);
}

function replaceOrInsertCanonical(html, pageUrl) {
    const canonicalTag = `<link rel="canonical" href="${escapeHtml(pageUrl)}" data-rh="true" />`;
    if (/<link[^>]*rel="canonical"[^>]*>/i.test(html)) {
        return html.replace(/<link[^>]*rel="canonical"[^>]*>/i, canonicalTag);
    }
    if (/<link[^>]*rel="manifest"[^>]*>/i.test(html)) {
        return html.replace(/(<link[^>]*rel="manifest"[^>]*>)/i, `$1\n  ${canonicalTag}`);
    }
    return html.replace(/<head>/i, `<head>\n  ${canonicalTag}`);
}

function replaceOrInsertMetaTag(html, attributeName, key, content) {
    const selector = new RegExp(`<meta[^>]*${attributeName}="${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*\/?>`, 'i');
    const metaTag = `<meta ${attributeName}="${key}" content="${escapeHtml(content)}" />`;
    if (selector.test(html)) {
        return html.replace(selector, metaTag);
    }
    return html.replace(/<\/head>/i, `  ${metaTag}\n</head>`);
}

/**
 * Serialize one or more JSON-LD objects into <script> tags. Marked with
 * data-ftca-seo="json-ld" so the runtime MetaHeader replaces them on hydration
 * (no duplicate structured data in the rendered DOM).
 */
function jsonLdBlock(items) {
    return items
        .filter(Boolean)
        .map((data) =>
            `<script type="application/ld+json" data-ftca-seo="json-ld">${JSON.stringify(data)}</script>`)
        .join('\n  ');
}

/** Sections shown in the no-JS navigation, in order. */
const NAV_KEYS = ["", "movies", "events", "blog", "about", "palmares", "contact"];

/**
 * Build a page-specific <noscript> body block: a real <h1>, the description,
 * an author/director line when present, and a localized nav. Replaces the
 * generic fallback so crawlers / LLM bots that don't run JS see unique,
 * page-relevant content (real visitors never render <noscript>).
 */
function buildNoscript(pageKey, locale, seo) {
    const heading = pageKey === "" ? SITE_NAME_FULL : (seo?.title || SITE_NAME_FULL);
    const description = seo?.description || "";
    const authorLine = seo?.author
        ? `<p>${escapeHtml(seo.authorLabel || "By")} ${escapeHtml(seo.author)}</p>`
        : "";
    const nav = NAV_KEYS
        .map((key) => {
            const label = getLocalizedPageSeo(key, locale).title
                || (key === "" ? SITE_NAME_FULL : key);
            return `        <li><a href="${escapeHtml(localizedPageUrl(key, locale))}">${escapeHtml(label)}</a></li>`;
        })
        .join('\n');

    return `<noscript>
    <div style="padding: 2rem; font-family: sans-serif; max-width: 800px; margin: 0 auto;">
      <h1>${escapeHtml(heading)}</h1>
      ${authorLine}
      <p>${escapeHtml(description)}</p>
      <nav>
        <ul>
${nav}
        </ul>
      </nav>
    </div>
  </noscript>`;
}

/** Build the <link rel="alternate" hreflang> block for a page key. */
function hreflangBlock(pageKey) {
    return hreflangAlternates(pageKey)
        .map(({ hreflang, href }) =>
            `<link rel="alternate" hreflang="${hreflang}" href="${escapeHtml(href)}" data-rh="true" />`)
        .join('\n  ');
}

/* ------------------ SEO injection ------------------ */

/**
 * Inject per-locale SEO into the HTML for one page.
 * `pageKey` is locale-neutral ("", "movies", "events/ydour", …).
 */
function injectSeoMeta(html, { pageKey, locale, seo }) {
    const pageUrl = localizedPageUrl(pageKey, locale);
    const title = buildPageTitle(seo?.title || SITE_NAME);
    const description = seo?.description || "";
    const imageUrl = seo?.imageUrl || DEFAULT_OG_IMAGE;
    const imageAlt = seo?.imageAlt || DEFAULT_OG_IMAGE_ALT;
    const author = seo?.author;
    const authorLabel = seo?.authorLabel || 'Written by';
    const ogType = seo?.ogType || 'website';
    const robots = seo?.noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    const altLocales = SUPPORTED_LOCALES.filter((l) => l !== locale);

    let result = setHtmlLang(html, locale);
    result = replaceOrInsertCanonical(result, pageUrl)
        .replace(/<title[^>]*>[^<]*<\/title>/,
            `<title data-rh="true">${escapeHtml(title)}</title>`)
        .replace(/<meta[^>]*name="description"[^>]*content="[^"]*"[^>]*\/?>/,
            `<meta name="description" content="${escapeHtml(description)}" />`)
        .replace(/<meta[^>]*name="robots"[^>]*content="[^"]*"[^>]*\/?>/,
            `<meta name="robots" content="${escapeHtml(robots)}" />`)
        .replace(/<meta[^>]*property="og:locale"[^>]*content="[^"]*"[^>]*\/?>/,
            `<meta property="og:locale" content="${OG_LOCALE[locale]}" />`)
        .replace(/<meta[^>]*property="og:title"[^>]*content="[^"]*"[^>]*\/?>/,
            `<meta property="og:title" content="${escapeHtml(title)}" />`)
        .replace(/<meta[^>]*property="og:description"[^>]*content="[^"]*"[^>]*\/?>/,
            `<meta property="og:description" content="${escapeHtml(description)}" />`)
        .replace(/<meta[^>]*property="og:type"[^>]*content="[^"]*"[^>]*\/?>/,
            `<meta property="og:type" content="${escapeHtml(ogType)}" />`)
        .replace(/<meta[^>]*property="og:url"[^>]*content="[^"]*"[^>]*\/?>/,
            `<meta property="og:url" content="${escapeHtml(pageUrl)}" />`)
        .replace(/<meta[^>]*property="og:image"[^>]*content="[^"]*"[^>]*\/?>/,
            `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`)
        .replace(/<meta[^>]*property="og:image:alt"[^>]*content="[^"]*"[^>]*\/?>/,
            `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />`)
        .replace(/<meta[^>]*name="twitter:title"[^>]*content="[^"]*"[^>]*\/?>/,
            `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
        .replace(/<meta[^>]*name="twitter:image"[^>]*content="[^"]*"[^>]*\/?>/,
            `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`)
        .replace(/<meta[^>]*name="twitter:description"[^>]*content="[^"]*"[^>]*\/?>/,
            `<meta name="twitter:description" content="${escapeHtml(description)}" />`);

    // Per-page structured data: the page's own JSON-LD (Movie / Article / Event /
    // CollectionPage …) plus an auto-generated BreadcrumbList. Baked into the
    // static HTML so non-JS crawlers and social/LLM bots see it too.
    const rawJsonLd = seo?.jsonLd
        ? (Array.isArray(seo.jsonLd) ? seo.jsonLd : [seo.jsonLd])
        : [];
    // Force each node's top-level `url` to this page's canonical (locale-prefixed)
    // so structured data matches <link rel="canonical"> instead of the bare,
    // un-prefixed URL hardcoded in PAGE_SEO / the movie & blog builders.
    const pageJsonLd = rawJsonLd.map((node) =>
        node && typeof node === 'object' && 'url' in node ? { ...node, url: pageUrl } : node);
    const breadcrumb = buildBreadcrumbList(pageKey, seo?.title, locale);
    const structuredData = jsonLdBlock([...pageJsonLd, breadcrumb]);

    // og:locale:alternate + hreflang alternates + JSON-LD (inserted once, before </head>).
    const localeAlternates = altLocales
        .map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}" />`)
        .join('\n  ');
    result = result.replace(/<\/head>/i,
        `  ${localeAlternates}\n  ${hreflangBlock(pageKey)}\n  ${structuredData}\n</head>`);

    if (author) {
        result = replaceOrInsertMetaTag(result, 'name', 'author', author);
        if (ogType === 'article') {
            result = replaceOrInsertMetaTag(result, 'property', 'article:author', author);
        }
        result = replaceOrInsertMetaTag(result, 'name', 'twitter:label1', authorLabel);
        result = replaceOrInsertMetaTag(result, 'name', 'twitter:data1', author);
    }

    // Replace the generic body <noscript> with page-specific content.
    result = result.replace(/<noscript>[\s\S]*?<\/noscript>/i,
        buildNoscript(pageKey, locale, seo));

    return result;
}

/** Write dist/<locale>/<pageKey>/index.html (pageKey "" → the locale home). */
async function writeLocalePage(buildRoot, locale, pageKey, html) {
    const dir = path.join(buildRoot, locale, pageKey);
    await fs.mkdir(dir, { recursive: true });
    const target = path.join(dir, 'index.html');
    await fs.writeFile(target, html, 'utf-8');
    console.log(`✔ Generated → ${target}`);
}

/** Generate one page across every locale. `getSeo(locale)` returns its SEO. */
async function generatePage(indexHtml, buildRoot, pageKey, getSeo) {
    for (const locale of SUPPORTED_LOCALES) {
        const html = injectSeoMeta(indexHtml, { pageKey, locale, seo: getSeo(locale) });
        await writeLocalePage(buildRoot, locale, pageKey, html);
    }
}

/* ------------------ root redirect ------------------ */

/**
 * The root "/" has no localized content: it carries hreflang alternates and
 * redirects (stored choice → browser language → default) to the right locale.
 * Mirrors the SPA's LocaleRedirect so crawlers and no-JS clients resolve too.
 */
async function writeRootRedirect(indexHtml, buildRoot) {
    const supported = JSON.stringify(SUPPORTED_LOCALES);
    const redirectScript =
        `<script>(function(){try{var s=${supported},d=${JSON.stringify(DEFAULT_LOCALE)},l=null;` +
        `try{l=localStorage.getItem('ftca.locale');}catch(e){}` +
        `if(s.indexOf(l)<0){l=null;var n=navigator.languages||[navigator.language||''];` +
        `for(var i=0;i<n.length;i++){var b=(n[i]||'').toLowerCase().split('-')[0];if(s.indexOf(b)>-1){l=b;break;}}}` +
        `l=l||d;if(location.pathname.replace(/\\/+$/,'')===''){location.replace('/'+l+location.search+location.hash);}` +
        `}catch(e){location.replace('/'+${JSON.stringify(DEFAULT_LOCALE)});}})();</script>`;

    let html = setHtmlLang(indexHtml, DEFAULT_LOCALE);
    html = replaceOrInsertCanonical(html, localizedPageUrl("", DEFAULT_LOCALE));
    html = html.replace(/<head>/i, `<head>\n  ${redirectScript}`);
    html = html.replace(/<\/head>/i,
        `  ${hreflangBlock("")}\n` +
        `  <noscript><meta http-equiv="refresh" content="0; url=/${DEFAULT_LOCALE}" /></noscript>\n</head>`);

    const target = path.join(buildRoot, 'index.html');
    await fs.writeFile(target, html, 'utf-8');
    console.log(`✔ Generated root redirect → ${target}`);
}

/**
 * Minimal locale-detecting redirect document for a non-prefixed page key
 * (e.g. "events", "events/ydour", "movies/trip"). Written to
 * dist/<pageKey>/index.html so these legacy/un-prefixed URLs return a real 200
 * page that redirects to the resolved locale on any host — no reliance on the
 * 404.html SPA fallback. noindex + canonical to the default-locale version.
 */
async function writeRedirectStub(buildRoot, pageKey) {
    const supported = JSON.stringify(SUPPORTED_LOCALES);
    const defaultUrl = localizedPageUrl(pageKey, DEFAULT_LOCALE);
    const defaultPath = `/${DEFAULT_LOCALE}/${pageKey}`;
    const alternates = hreflangAlternates(pageKey)
        .map(({ hreflang, href }) =>
            `  <link rel="alternate" hreflang="${hreflang}" href="${escapeHtml(href)}" />`)
        .join('\n');

    const script =
        `<script>(function(){try{var s=${supported},d=${JSON.stringify(DEFAULT_LOCALE)},` +
        `k=${JSON.stringify(pageKey)},l=null;try{l=localStorage.getItem('ftca.locale');}catch(e){}` +
        `if(s.indexOf(l)<0){l=null;var n=navigator.languages||[navigator.language||''];` +
        `for(var i=0;i<n.length;i++){var b=(n[i]||'').toLowerCase().split('-')[0];if(s.indexOf(b)>-1){l=b;break;}}}` +
        `l=l||d;location.replace('/'+l+'/'+k+location.search+location.hash);` +
        `}catch(e){location.replace(${JSON.stringify(defaultPath)});}})();</script>`;

    const html = `<!DOCTYPE html>
<html lang="${DEFAULT_LOCALE}">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex, follow" />
  <title>Redirecting… | ${escapeHtml(SITE_NAME)}</title>
  <link rel="canonical" href="${escapeHtml(defaultUrl)}" />
${alternates}
  ${script}
  <noscript><meta http-equiv="refresh" content="0; url=${escapeHtml(defaultPath)}" /></noscript>
</head>
<body>Redirecting…</body>
</html>
`;

    const dir = path.join(buildRoot, pageKey);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, 'index.html'), html, 'utf-8');
}

/* ------------------ main ------------------ */

async function main([, , buildFolderPath]) {
    console.log("🚀 Starting staticPagesGenerator:", buildFolderPath);

    assertValue(buildFolderPath, "Requires build folder path");
    assertValue(fsSync.existsSync(buildFolderPath), "Build folder path does not exist");

    const buildRoot = normalizeFolderPath(buildFolderPath);
    const indexHtml = await fs.readFile(buildRoot + "index.html", 'utf-8');

    /* ---------- homepage + static pages ---------- */
    const pages = JSON.parse(
        await fs.readFile(new URL('./pages.json', import.meta.url), 'utf-8')
    );
    // "" (homepage) is not listed in staticPages — generate it explicitly.
    const staticKeys = ["", ...pages.staticPages];
    // Non-prefixed page keys that get a redirect stub (root "/" and "404" excluded).
    const stubKeys = new Set();
    for (const pageKey of staticKeys) {
        await generatePage(indexHtml, buildRoot, pageKey, (locale) => getLocalizedPageSeo(pageKey, locale));
        if (pageKey !== "" && pageKey !== "404") stubKeys.add(pageKey);
    }

    /* ---------- movies ---------- */
    const movies = JSON.parse(
        await fs.readFile(new URL('../src/data/movies.json', import.meta.url), 'utf-8')
    );
    for (const movie of movies.filter(m => m.public && m.id)) {
        const pageKey = `movies/${movie.id}`;
        const imageUrl = movie.image?.startsWith('http') ? movie.image : `${SITE_URL}${resolveAssetUrl(movie.image)}`;
        const directorNames = getDirectorNames(movie);
        const directors = getDirectors(movie);
        const cast = getCast(movie);
        // Names are proper nouns (locale-independent); only the description is localized.
        const buildSeo = (locale) => {
            const description = getMovieDescription(movie, locale)
                || `${movie.title} – amateur film by ${directorNames}. ${SITE_NAME}.`;
            return {
                title: movie.title,
                description,
                imageUrl,
                imageAlt: `${movie.title} – poster`,
                author: directorNames,
                authorLabel: 'Directed by',
                ogType: 'video.movie',
                jsonLd: {
                    "@context": "https://schema.org",
                    "@type": "Movie",
                    name: movie.title,
                    description,
                    ...(directors.length
                        ? { director: directors.map((c) => ({ "@type": "Person", name: creditName(c) })) }
                        : {}),
                    ...(cast.length
                        ? { actor: cast.map((c) => ({ "@type": "Person", name: creditName(c) })) }
                        : {}),
                    ...(movie.year ? { dateCreated: String(movie.year) } : {}),
                    ...(movie.genre ? { genre: movie.genre } : {}),
                    ...(movie.duration ? { duration: movie.duration } : {}),
                    url: `${SITE_URL}/movies/${movie.id}`,
                    image: imageUrl,
                    productionCompany: { "@type": "Organization", name: SITE_NAME },
                },
            };
        };
        await generatePage(indexHtml, buildRoot, pageKey, buildSeo);
        stubKeys.add(pageKey);
    }

    /* ---------- events ---------- */
    const events = JSON.parse(
        await fs.readFile(new URL('./events.json', import.meta.url), 'utf-8')
    );
    for (const event of events.filter(e => e.public && e.id)) {
        const pageKey = `events/${event.id}`;
        await generatePage(indexHtml, buildRoot, pageKey, (locale) => {
            const seo = getLocalizedPageSeo(pageKey, locale);
            // Fall back to events.json if the page key isn't in PAGE_SEO.
            return PAGE_SEO[pageKey] ? seo : { title: event.title, description: event.description };
        });
        stubKeys.add(pageKey);
    }

    /* ---------- blog ---------- */
    for (const article of getBlogArticles()) {
        const pageKey = `blog/${article.slug}`;
        const imageUrl = article.image ? `${SITE_URL}${article.image}` : DEFAULT_OG_IMAGE;
        const publishedIso = article.date ? new Date(article.date).toISOString() : undefined;
        const articleUrl = `${SITE_URL}/${pageKey}`;
        const seo = {
            title: article.title,
            description: article.excerpt,
            imageUrl,
            imageAlt: article.title || DEFAULT_OG_IMAGE_ALT,
            author: article.author,
            authorLabel: 'Written by',
            ogType: 'article',
            jsonLd: {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: article.title,
                description: article.excerpt,
                image: imageUrl,
                ...(publishedIso ? { datePublished: publishedIso, dateModified: publishedIso } : {}),
                author: { "@type": "Person", name: article.author },
                mainEntityOfPage: articleUrl,
                url: articleUrl,
                inLanguage: article.lang ?? 'en',
                publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
            },
        };
        await generatePage(indexHtml, buildRoot, pageKey, () => seo);
        stubKeys.add(pageKey);
    }

    /* ---------- people ---------- */
    for (const person of getPublicPeople()) {
        const pageKey = `people/${person.id}`;
        // Their own portrait when set; otherwise the neutral user placeholder
        // (matches the runtime Person page) rather than the generic site banner.
        const personImage = person.image
            ? (person.image.startsWith('http') ? person.image : `${SITE_URL}${person.image}`)
            : undefined;
        const imageUrl = personImage || DEFAULT_PERSON_OG_IMAGE;
        const description = person.bio?.en || `${person.name} — ${SITE_NAME_FULL}.`;
        const seo = {
            title: person.name,
            description,
            imageUrl,
            imageAlt: person.name,
            ogType: 'profile',
            jsonLd: {
                "@context": "https://schema.org",
                "@type": "Person",
                name: person.name,
                ...(personImage ? { image: personImage } : {}),
                ...(person.membership
                    ? { memberOf: { "@type": "Organization", name: SITE_NAME_FULL } }
                    : {}),
                url: `${SITE_URL}/people/${person.id}`,
            },
        };
        // Names are proper nouns — same SEO across locales.
        await generatePage(indexHtml, buildRoot, pageKey, () => seo);
        stubKeys.add(pageKey);
    }

    /* ---------- non-prefixed redirect stubs ---------- */
    // e.g. /events, /events/ydour, /movies/trip → 200 redirect to the resolved locale.
    for (const pageKey of stubKeys) {
        await writeRedirectStub(buildRoot, pageKey);
    }
    console.log(`✔ Generated ${stubKeys.size} non-prefixed redirect stubs`);

    /* ---------- root redirect ---------- */
    await writeRootRedirect(indexHtml, buildRoot);

    /* ---------- SPA fallback ---------- */
    // Static hosts (e.g. GitHub Pages) serve 404.html for unknown paths; keep it
    // as the plain SPA shell so non-prefixed deep links (e.g. /movies) load the
    // app, which then redirects to the right locale via LocaleRedirect.
    const fallbackPath = path.join(buildRoot, '404.html');
    await fs.writeFile(fallbackPath, indexHtml, 'utf-8');
    console.log(`✔ Generated SPA fallback → ${fallbackPath}`);

    console.log("✅ All files generated successfully!");
}

main(process.argv).catch(err => {
    console.error(err);
    process.exit(1);
});
