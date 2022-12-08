import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EntryPage from "../pages/EntryPage";
import FavouriteMovies from "../pages/FavouriteMovies";

const MainRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="favourites" element={<FavouriteMovies />} />
      </Routes>
    </BrowserRouter>
  );
};
export default MainRoutes;
