import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import {
    SUPPORTED_LOCALES,
    localizedPageUrl,
    hreflangAlternates,
} from '../src/lib/metadata/seo-constants.ts';
import { getBlogArticles } from '../src/data/blog.ts';

/**
 * Post-build script: generates a per-locale sitemap.xml with hreflang
 * alternates from pages.json, movies.json, and events.json.
 * Run after build: tsx scripts/sitemapGenerator.js <buildFolder>
 */

const STATIC_PAGE_META = {
    "": { changefreq: "weekly", priority: "1.0" },
    "movies": { changefreq: "weekly", priority: "0.9" },
    "events": { changefreq: "weekly", priority: "0.9" },
    "blog": { changefreq: "weekly", priority: "0.8" },
    "about": { changefreq: "monthly", priority: "0.7" },
    "palmares": { changefreq: "monthly", priority: "0.6" },
    "contact": { changefreq: "yearly", priority: "0.5" },
};

function escapeXml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * One <url> per locale for a locale-neutral page key, each listing every
 * locale (plus x-default) as an <xhtml:link> alternate.
 */
function urlEntries(pageKey, lastmod, changefreq = "monthly", priority = "0.5") {
    const alternates = hreflangAlternates(pageKey)
        .map(({ hreflang, href }) =>
            `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(href)}" />`)
        .join('\n');

    return SUPPORTED_LOCALES.map((locale) => `  <url>
    <loc>${escapeXml(localizedPageUrl(pageKey, locale))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternates}
  </url>`).join('\n');
}

async function main([, , buildFolderPath]) {
    const today = new Date().toISOString().split('T')[0];

    const urls = [];

    // Homepage
    urls.push(urlEntries("", today, "weekly", "1.0"));

    // Static pages
    const pages = JSON.parse(
        await fs.readFile(new URL('./pages.json', import.meta.url), 'utf-8')
    );
    for (const pageKey of pages.staticPages) {
        if (pageKey === "404") continue;
        const meta = STATIC_PAGE_META[pageKey] || {};
        urls.push(urlEntries(pageKey, today, meta.changefreq || "monthly", meta.priority || "0.5"));
    }

    // Movies
    const movies = JSON.parse(
        await fs.readFile(new URL('../src/data/movies.json', import.meta.url), 'utf-8')
    );
    for (const movie of movies.filter(m => m.public && m.id)) {
        urls.push(urlEntries(`movies/${movie.id}`, today, "monthly", "0.6"));
    }

    // Events
    const events = JSON.parse(
        await fs.readFile(new URL('./events.json', import.meta.url), 'utf-8')
    );
    for (const event of events.filter(e => e.public && e.id)) {
        urls.push(urlEntries(`events/${event.id}`, event.date || today, "monthly", "0.7"));
    }

    // Blog articles
    for (const article of getBlogArticles()) {
        urls.push(urlEntries(`blog/${article.slug}`, article.date || today, "monthly", "0.7"));
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

    const outputDir = buildFolderPath && fsSync.existsSync(buildFolderPath)
        ? buildFolderPath
        : path.resolve(new URL('.', import.meta.url).pathname, '../public');

    const outputPath = path.join(outputDir, 'sitemap.xml');
    await fs.writeFile(outputPath, sitemap, 'utf-8');
    console.log(`✔ Sitemap generated → ${outputPath} (${urls.length * SUPPORTED_LOCALES.length} URLs)`);
}

main(process.argv).catch(err => {
    console.error(err);
    process.exit(1);
});
