import { FC, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Styles from "./MovieDetailPage.module.css";
import { DetailsAboutMovie, fetchMovieDetailPage } from "../util/http";
import MoviePlaceholder from "../assets/MoviePlaceholder.jpg";
import { Button } from "@mui/material";
import BackDropSpinner from "../components/BackDropSpinner";
import StarIcon from "../components/StarIcon";
import { FavouriteMoviesContext } from "../store/favourite-movies-context";
import { MovieDetail } from "./EntryPage";

const MovieDetailPage: FC = () => {
  const favouriteMoviesCtx = useContext(FavouriteMoviesContext);
  const [movieData, setMovieData] = useState<DetailsAboutMovie | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isMovieFavourite, setIsMovieFavourite] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const movie: MovieDetail = location.state;

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
    console.log(movie);

    (async () => {
      const movieDetails: DetailsAboutMovie = await fetchMovieDetailPage(
        movie.id
      );
      setMovieData(movieDetails);
      const movieIsFavourite: boolean =
        favouriteMoviesCtx.isMovieInFavourites(movie);
      setIsMovieFavourite(movieIsFavourite);
      setLoading(false);
    })();
  }, []);

  return (
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
};

export default MovieDetailPage;
