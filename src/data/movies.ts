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
        image: `${BASE}Posters/Sire-Ex-Machina.jpg`,
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
            "Behind closed doors, a prisoner attempts to stop the flow of torture.",
        cast: [
            "Manel Karkour",
            "Saber Zammouri"
        ],
        image: `${BASE}Posters/La-Gamelle.png`,
        movieUrl: "https://www.youtube.com/embed/cyJbwaLiU-0",
    },
    {
        id: "0TFjx-C-c5I",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/0TFjx-C-c5I",
    },
    {
        id: "3GXHpGOlZ0A",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/3GXHpGOlZ0A",
    },
    {
        id: "yVOap57hQlc",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/yVOap57hQlc",
    },
    {
        id: "J4_7A6C06fI",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/J4_7A6C06fI",
    },
    {
        id: "BxRwxUEQRuw",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/BxRwxUEQRuw",
    },
    {
        id: "IEuiFhdonZY",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/IEuiFhdonZY",
    },
    {
        id: "5tTaPMYEcwk",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/5tTaPMYEcwk",
    },
    {
        id: "Xwc4sqBuzeM",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/Xwc4sqBuzeM",
    },
    {
        id: "-RqITnp5Z7M",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/-RqITnp5Z7M",
    },
    {
        id: "fjLGuhgbGps",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/fjLGuhgbGps",
    },
    {
        id: "tcf6UorlgEo",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/tcf6UorlgEo",
    },
    {
        id: "HoeVNDhcDWo",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/HoeVNDhcDWo",
    },
    {
        id: "1_Eus_4KkZI",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/1_Eus_4KkZI",
    },
    {
        id: "E3O6XSeZLr0",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/E3O6XSeZLr0",
    },
    {
        id: "tuuI6huNJ68",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/tuuI6huNJ68",
    },
    {
        id: "EzVzuup33Xg",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/EzVzuup33Xg",
    },
    {
        id: "wSsrVYmT6BY",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/wSsrVYmT6BY",
    },
    {
        id: "LmrwjbQhByA",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/LmrwjbQhByA",
    },
    {
        id: "u6t1FAir0vc",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/u6t1FAir0vc",
    },
    {
        id: "nflS_EOZwX0",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/nflS_EOZwX0",
    },
    {
        id: "CSOq74FcOtE",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/CSOq74FcOtE",
    },
    {
        id: "IwgBUO4ytPg",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/IwgBUO4ytPg",
    },
    {
        id: "exchuf6B5wo",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/exchuf6B5wo",
    },
    {
        id: "z4QYI_pfS8k",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/z4QYI_pfS8k",
    },
    {
        id: "o-sYF4R-kwM",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/o-sYF4R-kwM",
    },
    {
        id: "I4sbcCFHEzo",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/I4sbcCFHEzo",
    },
    {
        id: "V2SnHlKTIjA",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/V2SnHlKTIjA",
    },
    {
        id: "oBFUiVaU_ls",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/oBFUiVaU_ls",
    },
    {
        id: "FuywJo34B1Y",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/FuywJo34B1Y",
    },
    {
        id: "R2eAdk96RTU",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/R2eAdk96RTU",
    },
    {
        id: "sMg0arZ7lPM",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/sMg0arZ7lPM",
    },
    {
        id: "8JKJnARlwgI",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/8JKJnARlwgI",
    },
    {
        id: "Oz9AcNMuUZw",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/Oz9AcNMuUZw",
    },
    {
        id: "eukOd7aTAg8",
        title: "test",
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/eukOd7aTAg8",
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
