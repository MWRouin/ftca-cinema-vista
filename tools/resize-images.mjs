#!/usr/bin/env node
/**
 * Shrinks oversized images in public/ in place: same file names and formats,
 * so no reference changes. Only downscales (never enlarges) and only rewrites
 * a file when the result is at least 10% smaller.
 *
 *   node tools/resize-images.mjs           # dry run: report only
 *   node tools/resize-images.mjs --write   # rewrite the files
 *
 * With --write, each original is first copied to archive/originals/ (same
 * path as under public/), unless an original is already kept there.
 *
 * Limits (longest side, or box for posters):
 *   Posters/   1000×1500 (the posters rule in AGENTS.md)
 *   Members/   800×800 (square portraits)
 *   elsewhere  2000px on the longest side (event, blog and about photos)
 *
 * The EXIF orientation is applied to the pixels (phone photos), then the
 * metadata is dropped, so every image shows the same way as before.
 */
import { access, copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = "public";
const ORIGINALS = "archive/originals";
const WRITE = process.argv.includes("--write");
const MIN_SAVING = 0.1;
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function limitFor(file) {
  const top = file.split(path.sep)[1];
  if (top === "Posters") return { width: 1000, height: 1500 };
  if (top === "Members") return { width: 800, height: 800 };
  return { width: 2000, height: 2000 };
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) yield full;
  }
}

function encode(pipeline, ext) {
  // Lossless: sharp's `effort` and `palette` options would cut PNGs to 256 colours.
  if (ext === ".png") return pipeline.png({ compressionLevel: 9, adaptiveFiltering: true });
  if (ext === ".webp") return pipeline.webp({ quality: 82 });
  return pipeline.jpeg({ quality: 82, mozjpeg: true });
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;
let before = 0;
let after = 0;
let changed = 0;

for await (const file of walk(ROOT)) {
  const input = await readFile(file);
  const ext = path.extname(file).toLowerCase();
  const meta = await sharp(input).metadata();
  const { width, height } = limitFor(file);
  const output = await encode(
    sharp(input).rotate().resize({ width, height, fit: "inside", withoutEnlargement: true }),
    ext,
  ).toBuffer({ resolveWithObject: true });

  before += input.length;
  if (output.data.length > input.length * (1 - MIN_SAVING)) {
    after += input.length;
    continue;
  }
  after += output.data.length;
  changed += 1;
  console.log(
    `${kb(input.length).padStart(8)} → ${kb(output.data.length).padStart(7)}  ` +
      `${meta.width}×${meta.height} → ${output.info.width}×${output.info.height}  ${file}`,
  );
  if (WRITE) {
    const original = path.join(ORIGINALS, path.relative(ROOT, file));
    const kept = await access(original).then(() => true, () => false);
    if (!kept) {
      await mkdir(path.dirname(original), { recursive: true });
      await copyFile(file, original);
    }
    await writeFile(file, output.data);
  }
}

console.log(
  `\n${changed} file(s) ${WRITE ? "rewritten" : "would be rewritten"}; ` +
    `images in ${ROOT}/: ${kb(before)} → ${kb(after)}` +
    (WRITE ? "" : "  (dry run: pass --write to apply)"),
);
