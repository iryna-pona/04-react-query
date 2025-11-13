import axios from "axios";
import type { MovieResponse } from "../types/movie"


export default async function fetchMovies(query: string, page: number = 1): Promise<MovieResponse> {
    const token = import.meta.env.VITE_TMDB_TOKEN;

    if (!token) {
      throw new Error("VITE_TMDB_TOKEN is not defined in environment variables");
    }

    const response = await axios.get<MovieResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        page,
        include_adult: false,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
