import { FC, useContext } from "react";
import Styles from "./MovieDetailCard.module.css";
import MoviePlaceholder from "../assets/MoviePlaceholder.jpg";
import { Link } from "react-router-dom";
import { FavouriteMoviesContext } from "../store/favourite-movies-context";
import StarIcon from "./StarIcon";
import { MovieDetail } from "../types/interfaces";

const MovieDetailCard: FC<MovieDetail> = (props: MovieDetail) => {
  const favouriteMoviesCtx = useContext(FavouriteMoviesContext);

  const removeMovie = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    favouriteMoviesCtx.removeFavouriteMovie(props.id);
  };

  return (
    <Link
      to={{
        pathname: `movieDetail/${props.id}`,
      }}
      state={props}
    >
      <div className={Styles.cardContainer} id={props.id}>
        {props.favouritePage ? (
          <div onClick={removeMovie} className={Styles.starWrapper}>
            <StarIcon selected={true}></StarIcon>
          </div>
        ) : null}

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
    </Link>
  );
};

export default MovieDetailCard;
