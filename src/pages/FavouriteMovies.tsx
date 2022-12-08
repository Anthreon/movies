import { FC, useContext } from "react";
import { SearchContext } from "../store/search-context";
import Styles from "./FavouriteMovies.module.css";

const FavouriteMovies: FC = () => {
  const searchCtx = useContext(SearchContext);
  return <p>{searchCtx.searchedInput}</p>;
};

export default FavouriteMovies;
