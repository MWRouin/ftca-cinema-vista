import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { SITE_URL, SITE_NAME, PAGE_SEO } from '../src/lib/metadata/seo-constants.ts';

/* ------------------ utils ------------------ */

const isString = (value) => typeof value === 'string' || value instanceof String;

function assertValue(test, error = "") {
    if (!isString(error)) throw new Error("Wrong usage of assert: error has to be a string");
    if (!test) throw new Error("Assertion error: " + error);
}

function assertExpression(obj, expression, error = "") {
    if (typeof expression !== 'function') {
        throw new Error("Wrong usage of assert: expression has to be a function");
    }
    assertValue(expression(obj), error);
}

function normalizeFolderPath(rawPath) {
    assertExpression(rawPath, isString, "rawPath should be a string");
    return rawPath.endsWith('/') ? rawPath : rawPath + '/';
}

/* ------------------ SEO injection ------------------ */

/**
 * Inject per-page SEO meta into the HTML string.
 * Replaces <title>, <meta description>, <link canonical>, OG & Twitter tags.
 */
function injectSeoMeta(html, pagePath, seo) {
    const pageUrl = pagePath ? `${SITE_URL}/${pagePath}` : `${SITE_URL}/`;
    const title = seo?.title || SITE_NAME;
    const description = seo?.description || "";
    const robots = seo?.noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    return html
        .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
        .replace(/<meta name="description"\s+content="[^"]*"\s*\/?>/,
            `<meta name="description" content="${description}" />`)
        .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/,
            `<link rel="canonical" href="${pageUrl}" />`)
        .replace(/<meta name="robots" content="[^"]*"\s*\/?>/,
            `<meta name="robots" content="${robots}" />`)
        .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/,
            `<meta property="og:title" content="${title}" />`)
        .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/,
            `<meta property="og:description" content="${description}" />`)
        .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/,
            `<meta property="og:url" content="${pageUrl}" />`)
        .replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/,
            `<meta name="twitter:title" content="${title}" />`)
        .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/,
            `<meta name="twitter:description" content="${description}" />`);
}

async function writePageHtml(indexHtml, pagePath, targetFilePath) {
    const seo = PAGE_SEO[pagePath] || { title: SITE_NAME, description: "" };
    const html = injectSeoMeta(indexHtml, pagePath, seo);
    await fs.writeFile(targetFilePath, html, 'utf-8');
    console.log(`✔ Generated → ${targetFilePath}`);
}

/* ------------------ generic helpers ------------------ */

function getPublicIds(items, label = "items") {
    assertExpression(items, Array.isArray, `${label} is expected to be an array`);
    return items.filter(i => i.public === true && i.id).map(i => i.id);
}

async function generateEntityPages({ data, entityName, basePath, indexHtml }) {
    const folderPath = path.join(basePath, entityName);
    await fs.mkdir(folderPath, { recursive: true });

    for (const id of getPublicIds(data, entityName)) {
        const pagePath = `${entityName}/${id}`;
        const targetPath = path.join(folderPath, `${id}.html`);
        const item = data.find(i => i.id === id);
        const seo = PAGE_SEO[pagePath] || {
            title: `${item?.title || id} | ${SITE_NAME}`,
            description: item?.description || `${item?.title || id} – ${SITE_NAME}`,
        };
        const html = injectSeoMeta(indexHtml, pagePath, seo);
        await fs.writeFile(targetPath, html, 'utf-8');
        console.log(`✔ Generated → ${targetPath}`);
    }
}

/* ------------------ main ------------------ */

async function main([, , buildFolderPath]) {
    console.log("🚀 Starting staticPagesGenerator:", buildFolderPath);

    assertValue(buildFolderPath, "Requires build folder path");
    assertValue(fsSync.existsSync(buildFolderPath), "Build folder path does not exist");

    const normalizedBuildFolderPath = normalizeFolderPath(buildFolderPath);
    const indexPath = normalizedBuildFolderPath + "index.html";
    const indexHtml = await fs.readFile(indexPath, 'utf-8');

    /* ---------- static pages ---------- */
    const pages = JSON.parse(
        await fs.readFile(new URL('./pages.json', import.meta.url), 'utf-8')
    );
    await Promise.all(
        pages.staticPages.map(pagePath => {
            const target = path.join(normalizedBuildFolderPath, `${pagePath}.html`);
            return writePageHtml(indexHtml, pagePath, target);
        })
    );

    /* ---------- movies ---------- */
    const movies = JSON.parse(
        await fs.readFile(new URL('../src/data/movies.json', import.meta.url), 'utf-8')
    );
    for (const movie of movies.filter(m => m.public && m.id)) {
        const pagePath = `movies/${movie.id}`;
        if (!PAGE_SEO[pagePath]) {
            PAGE_SEO[pagePath] = {
                title: `${movie.title} | ${SITE_NAME}`,
                description: movie.description || `${movie.title} – amateur film by ${movie.director}. ${SITE_NAME}.`,
            };
        }
    }
    await generateEntityPages({
        data: movies, entityName: "movies",
        basePath: normalizedBuildFolderPath, indexHtml,
    });

    /* ---------- events ---------- */
    const events = JSON.parse(
        await fs.readFile(new URL('./events.json', import.meta.url), 'utf-8')
    );
    await generateEntityPages({
        data: events, entityName: "events",
        basePath: normalizedBuildFolderPath, indexHtml,
    });

    console.log("✅ All files generated successfully!");
}

main(process.argv).catch(err => {
    console.error(err);
    process.exit(1);
});
