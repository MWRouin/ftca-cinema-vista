import rawMovies from "./movies.json"
import { getPersonById, getPeople, type Person } from "./people"

/** A role in the making of a film. Only `director`/`actor` are populated from
 *  current data; the rest exist so crew can be filled in per-movie over time. */
export type CreditRole =
    | "director"
    | "writer"
    | "producer"
    | "cinematographer"
    | "editor"
    | "sound"
    | "music"
    | "actor";

/** A single credit on a film. Either references a curated Person (`personId`,
 *  linkable / page-able) or carries a free-text `name` for one-off contributors. */
export type Credit = {
    role: CreditRole;
    personId?: string;
    name?: string;
    character?: string; // optional, for actors
};

export type MovieDescriptions = {
    data?: { en?: string; fr?: string };
    defaultLang?: string;
};

export type Movie = {
    id: string;
    title: string;
    genre: string;
    year: number | '-';
    image: string;
    duration?: string;
    descriptions?: MovieDescriptions;
    credits: Credit[];
    movieUrl?: string; // embed URL or external link
    public: boolean;
    // Controls whether the in-page video player is shown for this movie.
    // Independent of `public` (which controls whether the movie is listed).
    playerVisible: boolean;
};

// Optional chaining keeps this safe under Node (tsx) where Vite's
// `import.meta.env` is undefined — build scripts import these helpers.
const BASE = (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL || "/";

function ResolveAssetUrl(url: string): string {
    if (!url.startsWith("__BASE_URL__/")) return url;
    return url.replace("__BASE_URL__/", BASE);
}

function MovieFromJsonObject(jsonObject: Movie): Movie {
    return {
        ...jsonObject,
        image: jsonObject.image ? ResolveAssetUrl(jsonObject.image) : "",
        credits: Array.isArray(jsonObject.credits) ? jsonObject.credits : [],
        public: jsonObject.public ? jsonObject.public : false,
        playerVisible: jsonObject.playerVisible ?? false,
        year: typeof jsonObject.year === 'number' ? jsonObject.year : '-'
    };
}

function CompareMoviesProductionYear(movie1: Movie, movie2: Movie) {
    if (movie1.year === '-') return 1;
    if (movie2.year === '-') return -1;
    return (movie2.year as number) - (movie1.year as number);
}

function IsMoviePublic(movie: Movie): boolean { return movie.public; }

// JSON literals widen credit roles to `string`; the cast realigns them with the
// `Movie` shape (the mapper re-normalizes runtime fields like image/year).
const movies: Movie[] = (rawMovies as unknown as Movie[])
    .map(MovieFromJsonObject)
    .filter(IsMoviePublic)
    .sort(CompareMoviesProductionYear);

export const getMovies = () => movies;

export const getMovieById = (id: string) => movies.find((m) => m.id === id);

/* ---------- Credit helpers ---------- */

/** Display name for a credit: the curated Person's canonical name, else free text. */
export const creditName = (credit: Credit): string => {
    if (credit.personId) {
        const person = getPersonById(credit.personId);
        if (person) return person.name;
    }
    return credit.name ?? "";
};

export const getDirectors = (movie: Movie): Credit[] =>
    movie.credits.filter((c) => c.role === "director");

export const getCast = (movie: Movie): Credit[] =>
    movie.credits.filter((c) => c.role === "actor");

/** Every credit that is neither a director nor an actor (writer, camera, …). */
export const getCrew = (movie: Movie): Credit[] =>
    movie.credits.filter((c) => c.role !== "director" && c.role !== "actor");

/** Directors joined for inline display, e.g. "Khalil Said & Wadii Klaii". */
export const getDirectorNames = (movie: Movie): string =>
    getDirectors(movie).map(creditName).filter(Boolean).join(" & ");

/** Localized description with sensible fallback to the movie's default language. */
export const getMovieDescription = (movie: Movie, lang: string): string | undefined => {
    const data = movie.descriptions?.data;
    if (!data) return undefined;
    const fallback = movie.descriptions?.defaultLang ?? "fr";
    return (
        data[lang as keyof typeof data] ||
        data[fallback as keyof typeof data] ||
        data.fr ||
        data.en ||
        undefined
    );
};

/** Identity key for a director credit (curated id, else normalized name). */
const directorKey = (c: Credit): string =>
    c.personId ?? (c.name ?? "").toLowerCase().trim();

export const getRelatedMoviesByDirector = (movie: Movie, count = 3) => {
    const keys = new Set(getDirectors(movie).map(directorKey).filter(Boolean));
    if (keys.size === 0) return [];
    return movies
        .filter((m) => m.id !== movie.id && getDirectors(m).some((c) => keys.has(directorKey(c))))
        .slice(0, count);
};

export const getRelatedMoviesByGenre = (movie: Movie, count = 3) => {
    const pool = movies.filter((m) => m.genre === movie.genre && m.id !== movie.id);
    return pool.slice(0, count);
}

/** Movies a curated Person is credited in, with the roles they held. */
export const getFilmography = (personId: string): { movie: Movie; roles: CreditRole[] }[] =>
    movies
        .filter((m) => m.credits.some((c) => c.personId === personId))
        .map((m) => ({
            movie: m,
            roles: Array.from(
                new Set(m.credits.filter((c) => c.personId === personId).map((c) => c.role))
            ),
        }));

/** Whether a person warrants a public /people/:id page: an active club member,
 *  anyone with a filmography, or an explicit `public: true` override. */
export const isPersonPublic = (personId: string): boolean => {
    const person = getPersonById(personId);
    if (!person) return false;
    return (
        person.public === true ||
        person.membership?.status === "active" ||
        getFilmography(personId).length > 0
    );
};

/** People that have a public page (used for links, prerendering and the sitemap). */
export const getPublicPeople = (): Person[] =>
    getPeople().filter((p) => isPersonPublic(p.id));
