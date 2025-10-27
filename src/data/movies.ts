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
};

const BASE = import.meta.env.BASE_URL || "/";

export const movies: Movie[] = [
    {
        id: "and-then-there-was-none",
        title: "And Then There Was None",
        genre: "Fiction",
        year: 2024,
        director: "Khalil Said & Wadii Klaii",
        duration: "10 minutes",
        description:
            "In a confined space, a group gathers around a circular table to share a simple ritual that soon reveals the depths of human desire and control. What begins as unity slowly transforms into a reflection on power, dependence, and the fragile balance between need and domination.",
        cast: [
            "Itaf Daghsen",
            "Hichem Gtari",
            "Khalil Said",
            "Siwar Ben Kileni",
            "Nour Ben Chiekh",
            "Ahmed Douiri",
            "Melek Ajej",
            "Wissem Rouin",
            "Wadii Klaii"],
        image: `${BASE}Posters/And_then_there_was_One.jpeg`,
        movieUrl: "https://drive.google.com/file/d/19WYQotQilhwJhS3MfkTotK-tmbWAeQTV/preview",
    },
    {
        id: "caged-bastards",
        title: "Caged Bastards",
        genre: "Fiction",
        year: 2023,
        director: "Khalil Said & Wadii Klaii",
        duration: "8 minutes",
        description:
            "In a secluded enclave, an overseer maintains control through mystery and influence. Within this tense and atmospheric world, the inhabitants struggle between survival, power, and desire.",
        cast: [
            "Khalil Said",
            "Iheb Ben Fdilen",
            "Mohamed Abdi",
            "Rami Ben Abdallah",
            "Hichem Gtari",
            "Melek Ajej",
            "Wissem Rouine",
            "Zineddine Mlaouhi",
            "Hassen Ben Zekri",
        ],
        image: `${BASE}Posters/Caged-bastards-extend.jpg`,
        movieUrl: "https://drive.google.com/file/d/1CoyNf3HyVwy5YQjPNw3pxtJ9zT82hqeQ/preview",
    },
    {
        id: "sire-ex-machina",
        title: "Sire Ex Machina",
        genre: "Fiction",
        year: 2023,
        director: "Safa Khiari",
        duration: "10 minutes",
        description:
            "",
        cast: [
            "Khalil Said",
            "Amine Ben Mohamed",
            "Wadii Klaii",
            "Sabrine Ghannoudi",
            "Radhouen Khaled",
            "Raoua Khouildi",
            "Mohamed Abdi",
            "Moataz Abderrahim",
            "Wissem Rouin",
            "Mariem Ouertani",
            "Rania Barkit",
            "Hichem Gtari",
        ],
        image: `${BASE}/Posters/Sire-Ex-Machina.jpg`,
        movieUrl: "https://drive.google.com/file/d/1t2oXm3sIwbIK5nXXf7XfuNWqxnwIOyqU/preview",
    },
    {
        id: "silence",
        title: "Silence",
        genre: "Fiction",
        year: 2016,
        director: "Fares Ben Khalifa",
        duration: "10 minutes",
        description: 
            "",
        cast: [
            "Aymen Landoulsi",
            "Amal Belhassen",
            "Badiaa Bouhrizi"
        ],
        image: `${BASE}Posters/silence.jpg`,
        movieUrl: "https://www.youtube.com/embed/LmrwjbQhByA"
    },
    {
        id: "la-gamelle",
        title: "La Gamelle",
        genre: "Fiction",
        year: 2010,
        director: "Meher Ben Khlifa",
        duration: "9 minutes",
        description:
            "",
        cast: [
            "Manel Karkour",
            "Saber Zammouri"
        ],
        image: "",//`${BASE}Posters/Caged-bastards-extend.jpg`,
        movieUrl: "https://www.youtube.com/embed/cyJbwaLiU-0",
    },
];
//"https://www.youtube.com/embed/cyJbwaLiU-0"

export const getMovies = () => movies;

export const getMovieById = (id: string) => movies.find((m) => m.id === id);

export const getRelatedMovies = (movie: Movie, count = 3) => {
    // Prefer same director; fallback to same genre; exclude the current movie
    const sameDirector = movies.filter((m) => m.director === movie.director && m.id !== movie.id);
    const pool = sameDirector.length ? sameDirector : movies.filter((m) => m.genre === movie.genre && m.id !== movie.id);
    return pool.slice(0, count);
};
