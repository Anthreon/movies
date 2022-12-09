import { FC, useContext } from "react";

import { Link } from "react-router-dom";
import MovieDetailCard from "../components/MovieDetailCard";
import { FavouriteMoviesContext } from "../store/favourite-movies-context";
import { MovieDetail } from "./EntryPage";
import Styles from "./FavouriteMovies.module.css";

const FavouriteMovies: FC = () => {
  const favouriteMoviesCtx = useContext(FavouriteMoviesContext);
  return (
    <>
      <header className={Styles.header}>
        <Link className={Styles.entryPageLink} to="/">
          Back to search movies
        </Link>
        <h1>Your Favourite Movies</h1>
      </header>
      <main>
        <div className={Styles.favouriteContainer}>
          {favouriteMoviesCtx.favouriteMovies?.map(
            (movie: MovieDetail, index: number) => {
              return (
                <MovieDetailCard
                  id={movie.id}
                  image={movie.image}
                  title={movie.title}
                  year={movie.year}
                  type={movie.type}
                  key={index}
                />
              );
            }
          )}
        </div>
      </main>
    </>
  );
};

export default FavouriteMovies;
