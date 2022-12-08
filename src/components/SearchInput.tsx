import { FC, useContext, useState } from "react";
import { SearchContext } from "../store/search-context";
import Styles from "./SearchInput.module.css";

const SearchInput: FC = () => {
  const searchCtx = useContext(SearchContext);

  const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue: string = e.currentTarget.value;
    searchCtx.changeSearchInputHandler(newValue);
  };

  return (
    <div>
      <input
        value={searchCtx.searchedInput}
        onChange={inputHandler}
        className={Styles.searchInput}
        placeholder="Search movie (type at least 3 chars)"
      ></input>
      <p>{searchCtx.searchedInput}</p>
    </div>
  );
};

export default SearchInput;
