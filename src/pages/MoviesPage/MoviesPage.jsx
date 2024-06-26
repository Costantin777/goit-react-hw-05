import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovies } from "/src/movies-api.js";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import LoadingMessage from "../../components/LoadingMessage/LoadingMessage";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setSearchParams({ query: newQuery });
    setMovies([]);
  };

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function fetchMovies() {
      try {
        setIsLoading(true);
        const data = await getMovies(query);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  return (
    <div>
      {error && <ErrorMessage />}
      {isLoading && <LoadingMessage />}

      <SearchBar onSearch={handleSearch} />
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
