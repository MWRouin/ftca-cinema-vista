#!/usr/bin/env node
/**
 * Parity tool for the Next.js migration (see docs/plans/84-migrate-to-nextjs.md, M2/M12).
 *
 *   node tools/parity.mjs snapshot <buildDir> <out.json>   record URLs + head metadata
 *   node tools/parity.mjs diff <before.json> <after.json>  report what changed
 *
 * Works on any static build output (Vite `dist/`, Next `out/`). No dependencies.
 */
import fs from "node:fs";
import path from "node:path";

const META_KEYS = ["name", "property"];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

function attrs(tag) {
  const out = {};
  // Attribute names are case-insensitive in HTML (React writes hrefLang).
  for (const m of tag.matchAll(/([\w:-]+)\s*=\s*"([^"]*)"/g)) out[m[1].toLowerCase()] = m[2];
  return out;
}

function parseHtml(html) {
  const head = (html.match(/<head[\s\S]*?<\/head>/i) ?? [""])[0];
  const meta = {};
  for (const tag of head.match(/<meta\b[^>]*>/gi) ?? []) {
    const a = attrs(tag);
    const key = META_KEYS.map((k) => a[k]).find(Boolean);
    if (key && a.content !== undefined) (meta[key] ??= []).push(a.content);
  }
  const links = (rel) =>
    (head.match(/<link\b[^>]*>/gi) ?? []).map(attrs).filter((a) => a.rel === rel);
  // JSON-LD may sit in <head> (Vite build) or <body> (Next.js); both are valid.
  const jsonLd = (html.match(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi) ?? [])
    .map((s) => s.replace(/^[\s\S]*?>/, "").replace(/<\/script>$/i, "").trim())
    .map((s) => {
      try { return JSON.stringify(JSON.parse(s)); } catch { return `INVALID:${s.slice(0, 80)}`; }
    })
    .sort();
  return {
    lang: (html.match(/<html[^>]*\blang="([^"]*)"/i) ?? [])[1] ?? null,
    title: ((head.match(/<title[^>]*>([\s\S]*?)<\/title>/i) ?? [])[1] ?? "").trim(),
    canonical: links("canonical").map((a) => a.href)[0] ?? null,
    hreflang: links("alternate")
      .filter((a) => a.hreflang)
      .map((a) => `${a.hreflang} ${a.href}`)
      .sort(),
    meta,
    jsonLd,
    redirect: /location\.replace/.test(html),
  };
}

function snapshot(buildDir, outFile) {
  const pages = {};
  for (const file of walk(buildDir).filter((f) => f.endsWith(".html"))) {
    const rel = path.relative(buildDir, file).split(path.sep).join("/");
    const url = "/" + rel.replace(/(^|\/)index\.html$/, "$1");
    pages[url] = parseHtml(fs.readFileSync(file, "utf8"));
  }
  const read = (f) => (fs.existsSync(path.join(buildDir, f)) ? fs.readFileSync(path.join(buildDir, f), "utf8") : null);
  const sitemap = read("sitemap.xml");
  const snap = {
    pages: Object.fromEntries(Object.entries(pages).sort(([a], [b]) => a.localeCompare(b))),
    sitemapUrls: sitemap ? [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).sort() : null,
    robots: read("robots.txt"),
  };
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(snap, null, 1) + "\n");
  const n = Object.keys(pages).length;
  const redirects = Object.values(pages).filter((p) => p.redirect).length;
  console.log(`${n} pages (${redirects} redirect stubs), ${snap.sitemapUrls?.length ?? 0} sitemap URLs -> ${outFile}`);
}

// Compare text, not markup: builds escape the same character differently (' vs &#x27;).
const ENTITIES = { "&amp;": "&", "&quot;": '"', "&#x27;": "'", "&#39;": "'", "&lt;": "<", "&gt;": ">" };
const decode = (snapshotFile) =>
  JSON.parse(
    fs.readFileSync(snapshotFile, "utf8").replace(/&(amp|quot|#x27|#39|lt|gt);/g, (m) =>
      JSON.stringify(ENTITIES[m]).slice(1, -1),
    ),
  );

function diff(beforeFile, afterFile) {
  const a = decode(beforeFile);
  const b = decode(afterFile);
  const missing = Object.keys(a.pages).filter((u) => !(u in b.pages));
  const extra = Object.keys(b.pages).filter((u) => !(u in a.pages));
  const changed = [];
  const byField = {}; // field -> { count, example }
  for (const u of Object.keys(a.pages).filter((u) => u in b.pages)) {
    const pa = { ...a.pages[u], ...prefixed(a.pages[u].meta) };
    const pb = { ...b.pages[u], ...prefixed(b.pages[u].meta) };
    delete pa.meta;
    delete pb.meta;
    const fields = [...new Set([...Object.keys(pa), ...Object.keys(pb)])].filter(
      (k) => JSON.stringify(pa[k]) !== JSON.stringify(pb[k]),
    );
    for (const k of fields) {
      byField[k] ??= { count: 0, example: `${u}: ${short(pa[k])} -> ${short(pb[k])}` };
      byField[k].count++;
    }
    if (fields.length) changed.push(`${u}  [${fields.join(", ")}]`);
  }
  const sm = (x) => new Set(x ?? []);
  const smMissing = [...sm(a.sitemapUrls)].filter((u) => !sm(b.sitemapUrls).has(u));
  const smExtra = [...sm(b.sitemapUrls)].filter((u) => !sm(a.sitemapUrls).has(u));
  const section = (title, list) => {
    console.log(`\n${title}: ${list.length}`);
    list.slice(0, 40).forEach((x) => console.log("  " + x));
    if (list.length > 40) console.log(`  ... ${list.length - 40} more`);
  };
  section("Missing pages", missing);
  section("Extra pages", extra);
  section("Pages with changed head data", changed);
  section(
    "Changed fields (count, first example)",
    Object.entries(byField)
      .sort(([, x], [, y]) => y.count - x.count)
      .map(([k, v]) => `${String(v.count).padStart(4)}  ${k}\n        ${v.example}`),
  );
  section("Sitemap URLs missing", smMissing);
  section("Sitemap URLs extra", smExtra);
  if (a.robots !== b.robots) console.log("\nrobots.txt differs");
  process.exitCode = missing.length || smMissing.length ? 1 : 0;
}

const prefixed = (meta) => Object.fromEntries(Object.entries(meta ?? {}).map(([k, v]) => [`meta:${k}`, v]));
const short = (v) => (v === undefined ? "(none)" : JSON.stringify(v).slice(0, 90));

const [cmd, x, y] = process.argv.slice(2);
if (cmd === "snapshot" && x && y) snapshot(x, y);
else if (cmd === "diff" && x && y) diff(x, y);
else {
  console.error("usage: parity.mjs snapshot <buildDir> <out.json> | diff <before.json> <after.json>");
  process.exit(2);
}
