import { FC } from "react";
import SearchInput from "../components/SearchInput";
import Styles from "./EntryPage.module.css";
import { Link } from "react-router-dom";

const EntryPage: FC = () => {
  return (
    <div>
      <header className={Styles.header}>
        <SearchInput></SearchInput>
      </header>
      <Link to="favourites">Navigate to favourites</Link>
    </div>
  );
};

export default EntryPage;
