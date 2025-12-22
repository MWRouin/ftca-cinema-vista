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
    /*{
        id: "0TFjx-C-c5I",
        title: "wed trabelsia",
        //" واد الطرابلسية "
        genre: "test",
        year: 1777,
        director: "",
        duration: "",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/0TFjx-C-c5I",
    }, */
    {
        id: "and-then-there-was-one",
        title: "And Then There Was One",
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
        id: "chute-libre",
        title: "Chute Libre",
        genre: "test",
        year: 1777,
        director: "Amor Sbika",
        duration: "15:46",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/3GXHpGOlZ0A",
    },
    {
        id: "kari-for-dog",
        title: "Kari for Dog",
        genre: "test",
        year: 1777,
        director: "",
        duration: "02:17",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/yVOap57hQlc",
    },
    {
        id: "le-sifflet",
        title: "Le Sifflet",
        genre: "test",
        year: 1777,
        director: "",
        duration: "22:52",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/J4_7A6C06fI",
    },
    {
        id: "l-eveil-2",
        title: "L' Eveil 2",
        genre: "test",
        year: 1777,
        director: "",
        duration: "8:45",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/BxRwxUEQRuw",
    },
    {
        id: "chute-libre-2",
        title: "Chute Libre",
        genre: "test",
        year: 1777,
        director: "Amor Sbika",
        duration: "15:46",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/IEuiFhdonZY",
    },
    {
        id: "avenue-des-histoires-amputees",
        title: "Avenue des Histoires Amputées",
        genre: "test",
        year: 1777,
        director: "",
        duration: "17:09",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/5tTaPMYEcwk",
    },
    {
        id: "thara-taieb",
        title: "Thara Taieb",
        genre: "test",
        year: 1777,
        director: "",
        duration: "9:02",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/Xwc4sqBuzeM",
    },
    {
        id: "les-galleriens",
        title: "Les galleriens",
        genre: "test",
        year: 1777,
        director: "",
        duration: "12:30",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/-RqITnp5Z7M",
    },
    {
        id: "ذاكرة-راهينا",
        title: "ذاكرة راهينا",
        genre: "test",
        year: 1777,
        director: "",
        duration: "7:37",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/fjLGuhgbGps",
    },
    {
        id: "123-soleil",
        title: "123 Soleil",
        genre: "test",
        year: 1777,
        director: "",
        duration: "4:20",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/tcf6UorlgEo",
    },
    {
        id: "graine-de-lait-graine-de-vie",
        title: "Graine de Lait Graine de Vie",
        genre: "test",
        year: 1777,
        director: "",
        duration: "6:43",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/HoeVNDhcDWo",
    },
    {
        id: "v",
        title: "V",
        genre: "test",
        year: 1777,
        director: "",
        duration: "2:25",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/1_Eus_4KkZI",
    },
    {
        id: "au-pays-des-meres-vielles",
        title: "Au Pays des Méres Vielles",
        genre: "test",
        year: 1777,
        director: "",
        duration: "14:10",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/E3O6XSeZLr0",
    },
    {
        id: "accident-de-travail",
        title: "Accident de Travail",
        genre: "test",
        year: 1777,
        director: "",
        duration: "8:41",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/tuuI6huNJ68",
    },
    {
        id: "l-araignée",
        title: "L'Araignée",
        genre: "test",
        year: 1777,
        director: "",
        duration: "9:45",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/EzVzuup33Xg",
    },
    {
        id: "l-epingle",
        title: "L'Épingle",
        genre: "test",
        year: 1777,
        director: "",
        duration: "4:20",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/wSsrVYmT6BY",
    },
    {
        id: "home",
        title: "Home",
        genre: "test",
        year: 1777,
        director: "",
        duration: "5:42",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/u6t1FAir0vc",
    },
    {
        id: "mad-ant",
        title: "Mad Ant",
        genre: "test",
        year: 1777,
        director: "",
        duration: "5:57",
        description:
            "",
        cast: [],
        image: "",
        movieUrl: "https://www.youtube.com/embed/nflS_EOZwX0",
    },
    {
        id: "3al-7it",
        title: "3al 7it",
        genre: "test",
        year: 1777,
        director: "",
        duration: "3:12",
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
        title: " Des biéres et des progrés ",
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
