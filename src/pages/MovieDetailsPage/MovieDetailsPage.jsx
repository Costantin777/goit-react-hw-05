import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, NavLink, Outlet } from "react-router-dom";
import { getMovieById } from "/src/movies-api.js";
import MovieCard from "../../components/MovieCard/MovieCard";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import LoadingMessage from "../../components/LoadingMessage/LoadingMessage";
import { Suspense } from "react";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const locationStateRef = useRef(location.state);

  const [movie, setMovie] = useState(locationStateRef.current?.movie || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (movie) {
      return;
    }

    async function fetchMovie() {
      try {
        setIsLoading(true);
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();
  }, [movie, movieId]);

  return (
    <div>
      {error && <ErrorMessage />}
      {isLoading && <LoadingMessage />}

      {movie && <MovieCard movie={movie} />}
      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
}
