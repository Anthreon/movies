import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EntryPage from "../pages/EntryPage";
import FavouriteMovies from "../pages/FavouriteMovies";
import SearchContextProvider from "../store/search-context";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import FavouriteMoviesContextProvider from "../store/favourite-movies-context";

const queryClient = new QueryClient();

const MainRoutes: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchContextProvider>
        <FavouriteMoviesContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<EntryPage />} />
              <Route path="favourites" element={<FavouriteMovies />} />
            </Routes>
          </BrowserRouter>
        </FavouriteMoviesContextProvider>
      </SearchContextProvider>
    </QueryClientProvider>
  );
};
export default MainRoutes;
