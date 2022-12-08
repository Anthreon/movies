import { FC, useContext, useEffect } from "react";
import SearchInput from "../components/SearchInput";
import Styles from "./EntryPage.module.css";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { SearchContext } from "../store/search-context";
const API_URL = "http://omdbapi.com/?apikey=aa5c3014&r=json&type=movie";

interface MovieDetail {
  image: string;
  title: string;
  type: string;
  year: string;
  id: string;
}

const EntryPage: FC = () => {
  const searchCtx = useContext(SearchContext);
  const validString: boolean = searchCtx.searchedInput.length > 2;
  console.log(validString);

  const {
    data,
    isLoading,
    isError,
  }: { data: MovieDetail[] | undefined; isLoading: boolean; isError: boolean } =
    useQuery(
      ["movies", searchCtx.searchedInput],
      fetchMovies.bind(this, `&s=${searchCtx.searchedInput}`),
      {
        enabled: validString,
      }
    );

  async function fetchMovies(searchMovieInput: string): Promise<MovieDetail[]> {
    const { data } = await axios.get(`${API_URL + searchMovieInput}`);

    const mappedMovies: MovieDetail[] = data.Search.map((movie: any) => {
      return {
        image: movie.Poster,
        title: movie.Title,
        type: movie.Type,
        year: movie.Year,
        id: movie.imdbID,
      };
    });

    return mappedMovies;
  }

  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }
  //   if (isError) {
  //     return <div>Error! {isError}</div>;
  //   }

  return (
    <div>
      <header className={Styles.header}>
        <SearchInput></SearchInput>
      </header>
      <Link to="favourites">Navigate to favourites</Link>
      {!isLoading && !isError
        ? data?.map((movie: any, index: number) => {
            return <li key={index}>{movie.title}</li>;
          })
        : null}
    </div>
  );
};

export default EntryPage;
