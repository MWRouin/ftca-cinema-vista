import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { SITE_URL, SITE_NAME, PAGE_SEO, buildPageTitle } from '../src/lib/metadata/seo-constants.ts';

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

function escapeHtml(value = "") {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
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

/* ------------------ SEO injection ------------------ */

/**
 * Inject per-page SEO meta into the HTML string.
 * Replaces <title>, <meta description>, <link canonical>, OG & Twitter tags.
 */
function injectSeoMeta(html, pagePath, seo) {
    const pageUrl = pagePath ? `${SITE_URL}/${pagePath}` : `${SITE_URL}/`;
    const title = buildPageTitle(seo?.title || SITE_NAME);
    const description = seo?.description || "";
    const robots = seo?.noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    return replaceOrInsertCanonical(html, pageUrl)
        .replace(/<title[^>]*>[^<]*<\/title>/,
            `<title data-rh="true">${escapeHtml(title)}</title>`)
        .replace(/<meta[^>]*name="description"[^>]*content="[^"]*"[^>]*\/?>/,
            `<meta name="description" content="${escapeHtml(description)}" />`)
        .replace(/<meta[^>]*name="robots"[^>]*content="[^"]*"[^>]*\/?>/,
            `<meta name="robots" content="${escapeHtml(robots)}" />`)
        .replace(/<meta[^>]*property="og:title"[^>]*content="[^"]*"[^>]*\/?>/,
            `<meta property="og:title" content="${escapeHtml(title)}" />`)
        .replace(/<meta[^>]*property="og:description"[^>]*content="[^"]*"[^>]*\/?>/,
            `<meta property="og:description" content="${escapeHtml(description)}" />`)
        .replace(/<meta[^>]*property="og:url"[^>]*content="[^"]*"[^>]*\/?>/,
            `<meta property="og:url" content="${escapeHtml(pageUrl)}" />`)
        .replace(/<meta[^>]*name="twitter:title"[^>]*content="[^"]*"[^>]*\/?>/,
            `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
        .replace(/<meta[^>]*name="twitter:description"[^>]*content="[^"]*"[^>]*\/?>/,
            `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
}

async function writeRouteVariants(buildFolderPath, pagePath, html) {
    const flatTargetPath = pagePath
        ? path.join(buildFolderPath, `${pagePath}.html`)
        : path.join(buildFolderPath, 'index.html');

    const writes = [fs.writeFile(flatTargetPath, html, 'utf-8')];

    if (pagePath) {
        const nestedTargetPath = path.join(buildFolderPath, pagePath, 'index.html');
        await fs.mkdir(path.dirname(nestedTargetPath), { recursive: true });
        writes.push(fs.writeFile(nestedTargetPath, html, 'utf-8'));
        await Promise.all(writes);
        console.log(`✔ Generated → ${flatTargetPath}`);
        console.log(`✔ Generated → ${nestedTargetPath}`);
        return;
    }

    await Promise.all(writes);
    console.log(`✔ Generated → ${flatTargetPath}`);
}

async function writePageHtml(indexHtml, buildFolderPath, pagePath) {
    const seo = PAGE_SEO[pagePath] || { title: SITE_NAME, description: "" };
    const html = injectSeoMeta(indexHtml, pagePath, seo);
    await writeRouteVariants(buildFolderPath, pagePath, html);
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
        const item = data.find(i => i.id === id);
        const seo = PAGE_SEO[pagePath] || {
            title: item?.title || id,
            description: item?.description || `${item?.title || id} – ${SITE_NAME}`,
        };
        const html = injectSeoMeta(indexHtml, pagePath, seo);
        await writeRouteVariants(basePath, pagePath, html);
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
        pages.staticPages.map(pagePath => writePageHtml(indexHtml, normalizedBuildFolderPath, pagePath))
    );

    /* ---------- movies ---------- */
    const movies = JSON.parse(
        await fs.readFile(new URL('../src/data/movies.json', import.meta.url), 'utf-8')
    );
    for (const movie of movies.filter(m => m.public && m.id)) {
        const pagePath = `movies/${movie.id}`;
        if (!PAGE_SEO[pagePath]) {
            PAGE_SEO[pagePath] = {
                title: movie.title,
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
