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

const queryClient = new QueryClient();

const MainRoutes: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<EntryPage />} />
            <Route path="favourites" element={<FavouriteMovies />} />
          </Routes>
        </BrowserRouter>
      </SearchContextProvider>
    </QueryClientProvider>
  );
};
export default MainRoutes;
