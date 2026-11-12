import MoviePlayer from "@/views/MoviePlayer";
import { getMovies } from "@/data/movies";

export const dynamicParams = false;

export function generateStaticParams() {
  return getMovies().map((movie) => ({ id: movie.id }));
}

export default function MoviePage() {
  return <MoviePlayer />;
}
