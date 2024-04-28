import { useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import css from "./MovieCard.module.css";

export default function MovieCard({
  movie: {
    original_title,
    release_date,
    vote_average,
    overview,
    genres,
    poster_path,
  },
}) {
  const location = useLocation();
  const backLinkURL = useRef(location.state ?? "/movies");
  const releaseDate = new Date(release_date).getFullYear();
  const score = Math.round(vote_average * 10);

  const getGenres = (items) => {
    return items.map((item) => item.name).join(" ");
  };
  const path = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <>
      <div>
        <NavLink to={backLinkURL.current} className={css.backLink}>
          Go back
        </NavLink>
      </div>
      <div className={css.movieWrap}>
        <img src={path} alt={original_title} width="250" />
        <div>
          <h2>
            {original_title} ({releaseDate})
          </h2>
          <p>User score: {score}%</p>
          <h3>Overwiew</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{getGenres(genres)}</p>
        </div>
      </div>
      <h3>Additional information</h3>
    </>
  );
}
