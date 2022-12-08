import { FC, useState } from "react";
import Styles from "./SearchInput.module.css";

const SearchInput: FC = () => {
  const [movieInput, setMovieInput] = useState<string>("");

  const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue: string = e.currentTarget.value;
    setMovieInput(newValue);
  };

  return (
    <div>
      <input
        value={movieInput}
        onChange={inputHandler}
        className={Styles.searchInput}
        placeholder="Search movie"
      ></input>
    </div>
  );
};

export default SearchInput;
