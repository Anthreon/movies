import { createContext, ReactNode, useState } from "react";
import { MovieDetail } from "../pages/EntryPage";

interface ChildrenProps {
  children?: ReactNode;
}

interface FavouriteContext {
  favouriteMovies: MovieDetail[];
  addFavouriteMovie: (newFavouriteMovie: MovieDetail) => void;
  removeFavouriteMovie: (id: string) => void;
}

export const FavouriteMoviesContext = createContext<FavouriteContext>({
  favouriteMovies: [],
  addFavouriteMovie: (newFavouriteMovie: MovieDetail) => {},
  removeFavouriteMovie: (id: string) => {},
});

const FavouriteMoviesContextProvider = ({ children }: ChildrenProps) => {
  const [favouriteMovies, setFavouriteMovies] = useState<MovieDetail[]>([]);

  const addFavouriteMovie = (newFavouriteMovie: MovieDetail): void => {
    const found: MovieDetail | undefined = favouriteMovies.find((movie) => {
      return movie.id === newFavouriteMovie.id;
    });
    if (found) {
      removeFavouriteMovie(found.id);
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

  const value = {
    favouriteMovies: favouriteMovies,
    addFavouriteMovie: addFavouriteMovie,
    removeFavouriteMovie: removeFavouriteMovie,
  };

  return (
    <FavouriteMoviesContext.Provider value={value}>
      {children}
    </FavouriteMoviesContext.Provider>
  );
};

export default FavouriteMoviesContextProvider;
