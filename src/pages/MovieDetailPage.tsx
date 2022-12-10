import { FC, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Styles from "./MovieDetailPage.module.css";
import { fetchMovieDetailPage } from "../util/http";
import MoviePlaceholder from "../assets/images/MoviePlaceholder.jpg";
import { Button } from "@mui/material";
import BackDropSpinner from "../components/BackDropSpinner";
import StarIcon from "../components/StarIcon";
import { FavouriteMoviesContext } from "../store/favourite-movies-context";
import { DetailsAboutMovie, MovieDetail } from "../types/interfaces";
import { JsxElement } from "typescript";

const MovieDetailPage: FC = () => {
  const favouriteMoviesCtx = useContext(FavouriteMoviesContext);
  const [movieData, setMovieData] = useState<DetailsAboutMovie | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isMovieFavourite, setIsMovieFavourite] = useState<boolean>(false);
  const [pageInError, setPageInError] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const movie: MovieDetail = location.state;

  useEffect(() => {
    favouriteMoviesCtx.saveMoviesToStorage();
  }, [favouriteMoviesCtx.favouriteMovies]);

  const navigateBack = (): void => {
    navigate(-1);
  };

  const addMovie = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    favouriteMoviesCtx.addFavouriteMovie(movie);
    const movieIsFavourite: boolean =
      favouriteMoviesCtx.isMovieInFavourites(movie);
    setIsMovieFavourite(!movieIsFavourite);
  };

  useEffect(() => {
    (async () => {
      try {
        const movieDetails: DetailsAboutMovie = await fetchMovieDetailPage(
          movie.id
        );
        setMovieData(movieDetails);
        window.scroll(0, 0);
        const movieIsFavourite: boolean =
          favouriteMoviesCtx.isMovieInFavourites(movie);
        setIsMovieFavourite(movieIsFavourite);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setPageInError(true);
      }
    })();
  }, []);

  const pageWithoutError: JSX.Element = (
    <>
      {loading && <BackDropSpinner></BackDropSpinner>}
      <div className={Styles.pageContainer}>
        <Button
          className={Styles.backButton}
          onClick={navigateBack}
          variant="contained"
          disableElevation
        >
          Back
        </Button>
        <main>
          <div className={Styles.container}>
            <div>
              <section className={Styles.imgWrapper}>
                <img
                  className={Styles.img}
                  src={
                    movieData?.poster !== "N/A"
                      ? movieData?.poster
                      : MoviePlaceholder
                  }
                  alt="Movie image"
                />
                <div>
                  <aside className={Styles.movieDetails}>
                    <ul className={Styles.movieDataList}>
                      <div>
                        <li>Title: {movieData?.title}</li>
                        <div onClick={addMovie} className={Styles.starWrapper}>
                          <StarIcon selected={isMovieFavourite}></StarIcon>
                        </div>
                      </div>

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
    </>
  );

  const pageWithError: JSX.Element = <div>ERORRRRR</div>;

  return <>{pageInError ? pageWithError : pageWithoutError}</>;
};

export default MovieDetailPage;
