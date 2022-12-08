import { FC } from "react";
import SearchInput from "../components/SearchInput";
import Styles from "./EntryPage.module.css";

const EntryPage: FC = () => {
  return (
    <header className={Styles.header}>
      <SearchInput></SearchInput>
    </header>
  );
};

export default EntryPage;
