import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { SITE_URL } from '../src/lib/metadata/seo-constants.ts';

/**
 * Post-build script: generates a dynamic sitemap.xml from pages.json, movies.json, and events.json.
 * Run after build: node scripts/sitemapGenerator.js <buildFolder>
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

function urlEntry(loc, lastmod, changefreq = "monthly", priority = "0.5") {
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function main([, , buildFolderPath]) {
    const today = new Date().toISOString().split('T')[0];

    const urls = [];

    // Homepage
    urls.push(urlEntry(`${SITE_URL}/`, today, "weekly", "1.0"));

    // Static pages
    const pages = JSON.parse(
        await fs.readFile(new URL('./pages.json', import.meta.url), 'utf-8')
    );

    for (const pagePath of pages.staticPages) {
        if (pagePath === "404") continue;
        const meta = STATIC_PAGE_META[pagePath] || {};
        urls.push(urlEntry(
            `${SITE_URL}/${pagePath}`,
            today,
            meta.changefreq || "monthly",
            meta.priority || "0.5"
        ));
    }

    // Movies
    const movies = JSON.parse(
        await fs.readFile(new URL('../src/data/movies.json', import.meta.url), 'utf-8')
    );
    for (const movie of movies.filter(m => m.public && m.id)) {
        urls.push(urlEntry(
            `${SITE_URL}/movies/${movie.id}`,
            today,
            "monthly",
            "0.6"
        ));
    }

    // Events
    const events = JSON.parse(
        await fs.readFile(new URL('./events.json', import.meta.url), 'utf-8')
    );
    for (const event of events.filter(e => e.public && e.id)) {
        const lastmod = event.date || today;
        urls.push(urlEntry(
            `${SITE_URL}/events/${event.id}`,
            lastmod,
            "monthly",
            "0.7"
        ));
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

    // Write to build folder if provided, otherwise to public/
    const outputDir = buildFolderPath && fsSync.existsSync(buildFolderPath)
        ? buildFolderPath
        : path.resolve(new URL('.', import.meta.url).pathname, '../public');

    const outputPath = path.join(outputDir, 'sitemap.xml');
    await fs.writeFile(outputPath, sitemap, 'utf-8');
    console.log(`✔ Sitemap generated → ${outputPath} (${urls.length} URLs)`);
}

main(process.argv).catch(err => {
    console.error(err);
    process.exit(1);
});
