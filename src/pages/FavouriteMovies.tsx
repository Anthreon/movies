import { FC, useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import MovieDetailCard from "../components/MovieDetailCard";
import { FavouriteMoviesContext } from "../store/favourite-movies-context";
import { MovieDetail } from "../types/interfaces";
import Styles from "./FavouriteMovies.module.css";
import { motion } from "framer-motion";

const FavouriteMovies: FC = () => {
  const favouriteMoviesCtx = useContext(FavouriteMoviesContext);

  useEffect(() => {
    favouriteMoviesCtx.saveMoviesToStorage();
  }, [favouriteMoviesCtx.favouriteMovies]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
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
                    favouritePage={true}
                  />
                );
              }
            )}
          </div>
        </main>
      </motion.div>
    </>
  );
};

export default FavouriteMovies;
