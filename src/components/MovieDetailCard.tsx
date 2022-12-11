import { FC, useContext, useState } from "react";
import Styles from "./MovieDetailCard.module.css";
import MoviePlaceholder from "../assets/images/MoviePlaceholder.jpg";
import { Link } from "react-router-dom";
import { FavouriteMoviesContext } from "../store/favourite-movies-context";
import StarIcon from "./StarIcon";
import { MovieDetail } from "../types/interfaces";
import { motion, TapInfo } from "framer-motion";

const MovieDetailCard: FC<MovieDetail> = (props: MovieDetail) => {
  const [rotate, setRotate] = useState<boolean>(false);
  const favouriteMoviesCtx = useContext(FavouriteMoviesContext);

  const variants = {
    rotate: { scale: 0.1, transition: { duration: 0.5 } },
  };

  const removeMovie = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    setRotate(true);
    setTimeout(() => {
      favouriteMoviesCtx.removeFavouriteMovie.call(this, props.id);
      setRotate(false);
    }, 500);
  };

  return (
    <motion.div
      initial={false}
      animate={rotate ? "rotate" : undefined}
      variants={variants}
    >
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
    </motion.div>
  );
};

export default MovieDetailCard;
