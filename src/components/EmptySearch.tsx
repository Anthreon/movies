import { FC } from "react";
import Styles from "./EmptySearch.module.css";
import EmptyResults from "../assets/empty.png";
const EmptySearch: FC = () => {
  return (
    <div className={Styles.emptyContainer}>
      <div>
        <img className={Styles.img} src={EmptyResults}></img>
      </div>
      <div className={Styles.text}>
        <h1>No Search Yet</h1>
      </div>
    </div>
  );
};

export default EmptySearch;
