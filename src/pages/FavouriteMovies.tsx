import { FC, useContext } from "react";
import { SearchContext } from "../store/search-context";
import { Link } from "react-router-dom";
import Styles from "./FavouriteMovies.module.css";

const FavouriteMovies: FC = () => {
  const searchCtx = useContext(SearchContext);
  return (
    <header className={Styles.header}>
      <Link className={Styles.entryPageLink} to="/">
        Back to search movies
      </Link>
      <h1>Your Favourite Movies</h1>
    </header>
  );
};

export default FavouriteMovies;
