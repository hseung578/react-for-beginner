import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Detail.module.css";
function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovies(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  });
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <Link className={styles.back} to={"/"}>
            ◀Back
          </Link>
          <div className={styles.movie}>
            <img
              src={movies.medium_cover_image}
              alt={movies.title}
              className={styles.movie__img}
            />
            <div>
              <a className={styles.movie__title} href={movies.url}>
                {movies.title_long}
              </a>
              <ul className={styles.movie__genres}>
                {movies.genres.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
              <h3 className={styles.movie__rating}>{`⭐ ${movies.rating}`}</h3>
              <h3 className={styles.movie__runtime}>{movies.runtime}min</h3>
              <p className={styles.movie__description}>
                {movies.description_full}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Detail;
