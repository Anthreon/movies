import { FC, useContext, useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import Styles from "./EntryPage.module.css";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { SearchContext } from "../store/search-context";
import useDebounce from "../customHooks/useDebounce";

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
  const debouncedSearchTerm = useDebounce(searchCtx.searchedInput, 500);
  const [totalMoviesResults, setTotalMoviesResults] = useState<number>(0);

  const {
    data,
    isLoading,
    isError,
    status,
  }: {
    data: MovieDetail[] | undefined;
    isLoading: boolean;
    isError: boolean;
    status: string;
  } = useQuery(
    ["movies", debouncedSearchTerm],
    fetchMovies.bind(this, `&s=${debouncedSearchTerm}&page=${1}`),
    {
      enabled: validString,
    }
  );

  async function fetchMovies(searchMovieInput: string): Promise<MovieDetail[]> {
    const { data } = await axios.get(`${API_URL + searchMovieInput}`);
    console.log(data);
    setTotalMoviesResults(data.totalResults);
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

      <main className={Styles.moviesContainer}>
        {!isLoading && !isError ? (
          data?.map((movie: any, index: number) => {
            return <li key={index}>{movie.title}</li>;
          })
        ) : (
          <p>error state</p>
        )}
      </main>

      {/* <Link to="favourites">Navigate to favourites</Link> */}

      {/* {status}
      {totalMoviesResults} */}
    </div>
  );
};

export default EntryPage;
