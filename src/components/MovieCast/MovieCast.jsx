import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieCast } from "/src/movies-api.js";
import ActorCard from "../ActorCard/ActorCard";
import LoadingMessage from "../LoadingMessage/LoadingMessage";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieCast() {
  const { movieId } = useParams();

  const [cast, setCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        setIsLoading(true);
        const data = await getMovieCast(movieId);
        setCast(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      {error && <ErrorMessage />}
      {isLoading && <LoadingMessage />}

      {cast && (
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>
              <ActorCard actor={actor} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
