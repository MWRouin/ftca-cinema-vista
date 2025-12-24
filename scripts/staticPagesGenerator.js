import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

const isString = (value) => typeof value === 'string' || value instanceof String;

function assertValue(test, error = "") {
    if (typeof test !== 'boolean') throw new Error("Wrong usage of assert: test has to be a boolean");
    if (!isString(error)) throw new Error("Wrong usage of assert: error has to be a string");
    if (!test) throw new Error("Assertion error: " + error);
}

function assertExpression(obj, expression, error = "") {
    if (typeof expression !== 'function') throw new Error("Wrong usage of assert: expression has to be a function");
    assertValue(expression(obj), error);
}

function getMoviesIds(movies) {
    assertExpression(movies, Array.isArray, "movies is expected to be an array");
    return movies
        .filter(m => (m.public === true) && (m.id))
        .map(m => m.id);
}

async function copyFile(sourceFilePath, targetFilePath) {
    assertExpression(sourceFilePath, isString, "Path should be a string");
    assertExpression(targetFilePath, isString, "Path should be a string");

    try {
        await fs.copyFile(sourceFilePath, targetFilePath);
        console.log(`File ${sourceFilePath} copied successfully to ${targetFilePath}!`);
    } catch (err) {
        throw new Error(`Could not copy file\n${err.name}\n${err.message}`);
    }
}

function normalizeFolderPath(rawPath) {
    assertExpression(rawPath, isString, "rawPath should be a string");

    if (rawPath.length && rawPath[rawPath.length - 1] === '/') return rawPath;
    return rawPath + '/'
}

async function main([nodePath, scriptPath, buildFolderPath, ...rest]) {
    console.log("Starting staticPagesGenerator with folder:", buildFolderPath);


    const pages = JSON.parse(
        await fs.readFile(new URL('./pages.json', import.meta.url), 'utf-8')
    );

    const rawMovies = JSON.parse(
        await fs.readFile(new URL('../src/data/movies.json', import.meta.url), 'utf-8')
    );

    assertValue(buildFolderPath, "Requires build folder path");
    assertValue(fsSync.existsSync(buildFolderPath), "Build folder path does not exist");

    const normalizedBuildFolderPath = normalizeFolderPath(buildFolderPath);
    const promises = [];

    const indexPath = normalizedBuildFolderPath + "index.html";

    for (const pagePath of pages.staticPages) {
        const normPath = path.join(normalizedBuildFolderPath, pagePath + '.html');
        promises.push(copyFile(indexPath, normPath));
    }

    const moviesFolderPath = path.join(normalizedBuildFolderPath, "movies/");
    const moviesIds = getMoviesIds(rawMovies);

    await fs.mkdir(moviesFolderPath, { recursive: true });

    for (const movieId of moviesIds) {
        const moviePath = path.join(moviesFolderPath, movieId);
        promises.push(copyFile(indexPath, moviePath));
    }

    await Promise.all(promises);
    console.log("All files copied successfully!");
}

main(process.argv).catch(err => {
    console.error(err);
    process.exit(1);
});