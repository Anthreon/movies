import { FC, ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Styles from "./MovieDetailPage.module.css";
import { DetailsAboutMovie, fetchMovieDetailPage } from "../util/http";
import MoviePlaceholder from "../assets/MoviePlaceholder.jpg";
const MovieDetailPage: FC = () => {
  const [movieData, setMovieData] = useState<DetailsAboutMovie | undefined>();
  const location = useLocation();
  const movieId: string = location.state;

  useEffect(() => {
    (async () => {
      const movieDetails: DetailsAboutMovie = await fetchMovieDetailPage(
        movieId
      );
      setMovieData(movieDetails);
    })();
  }, []);

  return (
    <div className={Styles.pageContainer}>
      <main>
        <div className={Styles.container}>
          <div>
            <section className={Styles.imgWrapper}>
              <img
                className={Styles.img}
                src={movieData?.poster ? movieData.poster : MoviePlaceholder}
                alt="Movie image"
              />
              <div>
                <aside className={Styles.movieDetails}>
                  <ul className={Styles.movieDataList}>
                    <li>Title: {movieData?.title}</li>
                    <li>Actors: {movieData?.actors}</li>
                    <li>Awards: {movieData?.awards}</li>
                    <li>Rating: {movieData?.imdbrating}</li>
                    <li>Director: {movieData?.director}</li>
                    <li>Genre: {movieData?.genre}</li>
                    <li>Language: {movieData?.language}</li>
                    <li>Year of creation: {movieData?.year}</li>
                    <li>Writers: {movieData?.writer}</li>
                    <li>Story of film: {movieData?.plot}</li>
                  </ul>
                </aside>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetailPage;
