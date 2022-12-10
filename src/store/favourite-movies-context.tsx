import { createContext, useEffect, useState } from "react";
import { ChildrenProps, MovieDetail } from "../types/interfaces";
import { LOCAL_STORAGE_FAVOURITE_MOVIES } from "../util/constants";

interface FavouriteContext {
  favouriteMovies: MovieDetail[];
  addFavouriteMovie: (newFavouriteMovie: MovieDetail) => void;
  removeFavouriteMovie: (id: string) => void;
  loadFavouriteMoviesFromStorage: () => void;
  saveMoviesToStorage: () => void;
  isMovieInFavourites: (newMovie: MovieDetail) => boolean;
}

export const FavouriteMoviesContext = createContext<FavouriteContext>({
  favouriteMovies: [],
  addFavouriteMovie: (newFavouriteMovie: MovieDetail) => {},
  removeFavouriteMovie: (id: string) => {},
  loadFavouriteMoviesFromStorage: () => {},
  saveMoviesToStorage: () => {},
  isMovieInFavourites: function (newMovie: MovieDetail): boolean {
    return false;
  },
});

const FavouriteMoviesContextProvider = ({ children }: ChildrenProps) => {
  const loadFavouriteMoviesFromStorage = (): MovieDetail[] | undefined => {
    const moviesAsString: string | null = window.localStorage.getItem(
      LOCAL_STORAGE_FAVOURITE_MOVIES
    );
    const movies: MovieDetail[] =
      moviesAsString !== null ? JSON.parse(moviesAsString) : [];
    return movies;
  };
  const [favouriteMovies, setFavouriteMovies] = useState<MovieDetail[]>(
    loadFavouriteMoviesFromStorage() as any as MovieDetail[]
  );

  useEffect(() => {
    const loadedMovies: MovieDetail[] | undefined =
      loadFavouriteMoviesFromStorage();
    if (loadedMovies) {
      setFavouriteMovies(loadedMovies);
      return;
    }
    setFavouriteMovies([]);
  }, []);

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

  const saveMoviesToStorage = (): void => {
    localStorage.setItem(
      LOCAL_STORAGE_FAVOURITE_MOVIES,
      JSON.stringify(favouriteMovies)
    );
  };

  const value = {
    favouriteMovies: favouriteMovies,
    addFavouriteMovie: addFavouriteMovie,
    removeFavouriteMovie: removeFavouriteMovie,
    isMovieInFavourites: isMovieInFavourites,
    loadFavouriteMoviesFromStorage: loadFavouriteMoviesFromStorage,
    saveMoviesToStorage: saveMoviesToStorage,
  };

  return (
    <FavouriteMoviesContext.Provider value={value}>
      {children}
    </FavouriteMoviesContext.Provider>
  );
};

export default FavouriteMoviesContextProvider;
