import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

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

async function copyFile(sourceFilePath, targetFilePath) {
    assertExpression(sourceFilePath, isString, "Path should be a string");
    assertExpression(targetFilePath, isString, "Path should be a string");

    await fs.copyFile(sourceFilePath, targetFilePath);
    console.log(`✔ Copied → ${targetFilePath}`);
}

/* ------------------ generic helpers ------------------ */

function getPublicIds(items, label = "items") {
    assertExpression(items, Array.isArray, `${label} is expected to be an array`);
    return items
        .filter(i => i.public === true && i.id)
        .map(i => i.id);
}

async function generateEntityPages({
    data,
    entityName,
    basePath,
    indexPath
}) {
    const folderPath = path.join(basePath, entityName);
    const ids = getPublicIds(data, entityName);

    await fs.mkdir(folderPath, { recursive: true });

    for (const id of ids) {
        const targetPath = path.join(folderPath, `${id}.html`);
        await copyFile(indexPath, targetPath);
    }
}

/* ------------------ main ------------------ */

async function main([, , buildFolderPath]) {
    console.log("🚀 Starting staticPagesGenerator:", buildFolderPath);

    assertValue(buildFolderPath, "Requires build folder path");
    assertValue(fsSync.existsSync(buildFolderPath), "Build folder path does not exist");

    const normalizedBuildFolderPath = normalizeFolderPath(buildFolderPath);
    const indexPath = normalizedBuildFolderPath + "index.html";

    /* ---------- static pages ---------- */

    const pages = JSON.parse(
        await fs.readFile(new URL('./pages.json', import.meta.url), 'utf-8')
    );

    await Promise.all(
        pages.staticPages.map(pagePath => {
            const target = path.join(normalizedBuildFolderPath, `${pagePath}.html`);
            return copyFile(indexPath, target);
        })
    );

    /* ---------- movies ---------- */

    const movies = JSON.parse(
        await fs.readFile(new URL('../src/data/movies.json', import.meta.url), 'utf-8')
    );

    await generateEntityPages({
        data: movies,
        entityName: "movies",
        basePath: normalizedBuildFolderPath,
        indexPath
    });

    /* ---------- events ---------- */

    const events = JSON.parse(
        await fs.readFile(new URL('./events.json', import.meta.url), 'utf-8')
    );

    await generateEntityPages({
        data: events,
        entityName: "events",
        basePath: normalizedBuildFolderPath,
        indexPath
    });

    console.log("✅ All files generated successfully!");
}

main(process.argv).catch(err => {
    console.error(err);
    process.exit(1);
});
