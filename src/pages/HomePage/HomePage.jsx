import { useEffect, useState } from "react";
import { getTrendingMovies } from "/src/movies-api.js";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import LoadingMessage from "../../components/LoadingMessage/LoadingMessage";

export default function HomePage() {
  const [trendingMovies, settrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        setIsLoading(true);
        const data = await getTrendingMovies();
        settrendingMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      {error && <ErrorMessage />}
      {isLoading && <LoadingMessage />}
      {!error && <h2>Trending today</h2>}

      {trendingMovies.length > 0 && <MovieList movies={trendingMovies} />}
    </div>
  );
}
