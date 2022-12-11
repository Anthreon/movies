import { FC } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import EntryPage from "../pages/EntryPage";
import FavouriteMovies from "../pages/FavouriteMovies";
import SearchContextProvider from "../store/search-context";
import { QueryClient, QueryClientProvider } from "react-query";
import FavouriteMoviesContextProvider from "../store/favourite-movies-context";
import MovieDetailPage from "../pages/MovieDetailPage";
import ScrollContextProvider from "../store/scroll-history.context";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const MainRoutes: FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <QueryClientProvider client={queryClient}>
        <SearchContextProvider>
          <FavouriteMoviesContextProvider>
            <ScrollContextProvider>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<EntryPage />} />
                <Route path="favourites" element={<FavouriteMovies />} />
                <Route path="movieDetail/:id" element={<MovieDetailPage />} />
                <Route
                  path="favourites/movieDetail/:id"
                  element={<MovieDetailPage />}
                />
              </Routes>
            </ScrollContextProvider>
          </FavouriteMoviesContextProvider>
        </SearchContextProvider>
      </QueryClientProvider>
    </AnimatePresence>
  );
};
export default MainRoutes;
