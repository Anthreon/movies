import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EntryPage from "../pages/EntryPage";
import FavouriteMovies from "../pages/FavouriteMovies";
import SearchContextProvider from "../store/search-context";

const MainRoutes: FC = () => {
  return (
    <SearchContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route path="favourites" element={<FavouriteMovies />} />
        </Routes>
      </BrowserRouter>
    </SearchContextProvider>
  );
};
export default MainRoutes;
