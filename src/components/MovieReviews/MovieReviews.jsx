import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieReviews } from "/src/movies-api.js";
import ReviewCard from "../ReviewCard/ReviewCard";
import LoadingMessage from "../LoadingMessage/LoadingMessage";

export default function MovieReviews() {
  const { movieId } = useParams();

  const [reviews, setRewiews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        setIsLoading(true);
        const data = await getMovieReviews(movieId);

        if (data.length === 0) {
          throw new Error("We have no reviews for this movie");
        }

        setRewiews(data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieReviews();
  }, [movieId]);

  return (
    <>
      {error && (
        <div>
          <p>We have no reviews for this movie</p>
        </div>
      )}
      {isLoading && <LoadingMessage />}

      {reviews && (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
