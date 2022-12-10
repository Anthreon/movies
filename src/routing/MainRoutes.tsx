import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EntryPage from "../pages/EntryPage";
import FavouriteMovies from "../pages/FavouriteMovies";
import SearchContextProvider from "../store/search-context";
import { QueryClient, QueryClientProvider } from "react-query";
import FavouriteMoviesContextProvider from "../store/favourite-movies-context";
import MovieDetailPage from "../pages/MovieDetailPage";
import ScrollContextProvider from "../store/scroll-history.context";

const queryClient = new QueryClient();

const MainRoutes: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchContextProvider>
        <FavouriteMoviesContextProvider>
          <ScrollContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<EntryPage />} />
                <Route path="favourites" element={<FavouriteMovies />} />
                <Route path="movieDetail/:id" element={<MovieDetailPage />} />
                <Route
                  path="favourites/movieDetail/:id"
                  element={<MovieDetailPage />}
                />
              </Routes>
            </BrowserRouter>
          </ScrollContextProvider>
        </FavouriteMoviesContextProvider>
      </SearchContextProvider>
    </QueryClientProvider>
  );
};
export default MainRoutes;
