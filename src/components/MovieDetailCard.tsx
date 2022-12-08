import { FC, SVGProps } from "react";
import Styles from "./MovieDetail.module.css";

interface MovieDetail {
  image: string;
  title: string;
  type: string;
  year: string;
  id: string;
}

const MovieDetailCard: FC<MovieDetail> = ({
  image,
  title,
  type,
  year,
  id,
}: MovieDetail) => {
  return (
    <div className={Styles.cardContainer} id={id}>
      <div>
        <img className={Styles.cardImage} src={image}></img>
      </div>
      <h2 className={Styles.cardTitle}>{title} </h2>
      <h4 className={Styles.cardYear}>{year}</h4>
      <h5 className={Styles.cardType}>{type}</h5>
    </div>
  );
};

export default MovieDetailCard;
