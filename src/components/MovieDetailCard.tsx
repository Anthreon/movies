import { FC, useContext, useState, useEffect } from "react";
import Styles from "./MovieDetailCard.module.css";
import MoviePlaceholder from "../assets/MoviePlaceholder.jpg";

import { FavouriteMoviesContext } from "../store/favourite-movies-context";
import { MovieDetail } from "../pages/EntryPage";
import { Link } from "react-router-dom";
import StarIcon from "./StarIcon";

const MovieDetailCard: FC<MovieDetail> = (props: MovieDetail) => {
  const favouriteMoviesCtx = useContext(FavouriteMoviesContext);
  const addMovie = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    favouriteMoviesCtx.addFavouriteMovie(props);
  };

  return (
    <Link
      to={{
        pathname: `movieDetail/${props.id}`,
      }}
      state={props.id}
    >
      <div className={Styles.cardContainer} id={props.id}>
        <div onClick={addMovie} className={Styles.starWrapper}>
          <StarIcon selected={props.addedToFavourites}></StarIcon>
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
    </Link>
  );
};

export default MovieDetailCard;
