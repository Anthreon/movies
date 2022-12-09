import { FC, SVGProps, useContext } from "react";
import Styles from "./MovieDetailCard.module.css";
import MoviePlaceholder from "../assets/MoviePlaceholder.jpg";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarRateIcon from "@mui/icons-material/StarRate";
import { FavouriteMoviesContext } from "../store/favourite-movies-context";
import { MovieDetail } from "../pages/EntryPage";

const MovieDetailCard: FC<MovieDetail> = (props: MovieDetail) => {
  const favouriteMoviesCtx = useContext(FavouriteMoviesContext);

  const addMovie = () => {
    favouriteMoviesCtx.addFavouriteMovie(props);
    console.log(favouriteMoviesCtx);
  };
  const removeMovie = (id: string) => {
    favouriteMoviesCtx.removeFavouriteMovie(id);
    console.log(favouriteMoviesCtx);
  };

  return (
    <div className={Styles.cardContainer} id={props.id}>
      <div onClick={addMovie} className={Styles.starWrapper}>
        <StarBorderIcon fontSize="large"></StarBorderIcon>
      </div>
      <div>
        <img
          alt="Movie"
          className={Styles.cardImage}
          src={props.image.length > 5 ? props.image : MoviePlaceholder}
        ></img>
      </div>
      <div className={Styles.cardTextContainer}>
        <div className={Styles.container}>
          <h2 className={Styles.cardTitle}>{props.title} </h2>
          <h4 className={Styles.cardYear}>{props.year}</h4>
          <h5 className={Styles.cardType}>{props.type}</h5>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailCard;
