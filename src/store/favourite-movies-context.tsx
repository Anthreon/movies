import { createContext, useState } from "react";
import { ChildrenProps, MovieDetail } from "../types/interfaces";

interface FavouriteContext {
  favouriteMovies: MovieDetail[];
  addFavouriteMovie: (newFavouriteMovie: MovieDetail) => void;
  removeFavouriteMovie: (id: string) => void;
  isMovieInFavourites: (newMovie: MovieDetail) => boolean;
}

export const FavouriteMoviesContext = createContext<FavouriteContext>({
  favouriteMovies: [],
  addFavouriteMovie: (newFavouriteMovie: MovieDetail) => {},
  removeFavouriteMovie: (id: string) => {},
  isMovieInFavourites: function (newMovie: MovieDetail): boolean {
    return false;
  },
});

const FavouriteMoviesContextProvider = ({ children }: ChildrenProps) => {
  const [favouriteMovies, setFavouriteMovies] = useState<MovieDetail[]>([]);

  const addFavouriteMovie = (newFavouriteMovie: MovieDetail): void => {
    if (isMovieInFavourites(newFavouriteMovie)) {
      removeFavouriteMovie(newFavouriteMovie.id);
      return;
    }
    setFavouriteMovies((previousFavouriteMovies: MovieDetail[]) => [
      ...previousFavouriteMovies,
      newFavouriteMovie,
    ]);
  };
  const removeFavouriteMovie = (id: string): void => {
    const newMovies: MovieDetail[] = favouriteMovies.filter(
      (movie: MovieDetail) => {
        return movie.id !== id;
      }
    );
    setFavouriteMovies(newMovies);
  };

  const isMovieInFavourites = (newMovie: MovieDetail): boolean => {
    const found: MovieDetail | undefined = favouriteMovies.find((movie) => {
      return movie.id === newMovie.id;
    });
    if (found) {
      return true;
    }
    return false;
  };

  const value = {
    favouriteMovies: favouriteMovies,
    addFavouriteMovie: addFavouriteMovie,
    removeFavouriteMovie: removeFavouriteMovie,
    isMovieInFavourites: isMovieInFavourites,
  };

  return (
    <FavouriteMoviesContext.Provider value={value}>
      {children}
    </FavouriteMoviesContext.Provider>
  );
};

export default FavouriteMoviesContextProvider;
