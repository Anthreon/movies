import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Styles from "./MovieDetailPage.module.css";

interface MovieDetailPageProps {
  movieId: string;
}

const MovieDetailPage: FC = () => {
  const location = useLocation();
  const movieId: string = location.state;

  useEffect(() => {}, []);

  return <p>asdads {movieId}</p>;
};

export default MovieDetailPage;
