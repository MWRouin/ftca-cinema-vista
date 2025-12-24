import rawMovies from "./movies.json"

export type Movie = {
    id: string;
    title: string;
    genre: string;
    year: number;
    director: string;
    image: string;
    duration?: string;
    description?: string;
    cast?: string[];
    movieUrl?: string; // embed URL or external link
    public: boolean
};

const BASE = import.meta.env.BASE_URL || "/";

function ResolveAssetUrl(url: string): string {
    if (!url.startsWith("__BASE_URL__/")) return url;
    return url.replace("__BASE_URL__/", BASE);
}

function MovieFromJsonObject(jsonObject: any): Movie {
    return {
        ...jsonObject,
        image: jsonObject.image ? ResolveAssetUrl(jsonObject.image) : "",
        public: jsonObject.public ? jsonObject.public : false,
    };
}

function IsMoviePublic(movie: Movie): boolean { return movie.public; }

const movies: Movie[] = rawMovies.map(MovieFromJsonObject).filter(IsMoviePublic);

export const getMovies = () => movies;

export const getMovieById = (id: string) => movies.find((m) => m.id === id);

export const getRelatedMovies = (movie: Movie, count = 3) => {
    // Prefer same director; fallback to same genre; exclude the current movie
    const sameDirector = movies.filter((m) => m.director === movie.director && m.id !== movie.id);
    const pool = sameDirector.length ? sameDirector : movies.filter((m) => m.genre === movie.genre && m.id !== movie.id);
    return pool.slice(0, count);
};
