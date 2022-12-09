import { FC } from "react";
import Styles from "./NoResultsFound.module.css";
import NoResults from "../assets/noResults.png";

const NoResultsFound: FC = () => {
  return (
    <div className={Styles.emptyContainer}>
      <div>
        <img className={Styles.img} src={NoResults}></img>
      </div>
    </div>
  );
};

export default NoResultsFound;
