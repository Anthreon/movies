import { FC, useContext, useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import Styles from "./EntryPage.module.css";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { SearchContext } from "../store/search-context";
import useDebounce from "../customHooks/useDebounce";
import MovieDetailCard from "../components/MovieDetailCard";
import { Pagination } from "@mui/material";

const API_URL = "http://omdbapi.com/?apikey=aa5c3014&r=json&type=movie";

export interface MovieDetail {
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
  const [totalNumberOfPages, setTotalNumberOfPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [fetchedMovies, setFetchedMovies] = useState<MovieDetail[]>([]);

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
    fetchMovies.bind(fetchMovies, `&s=${debouncedSearchTerm}`, page),
    {
      enabled: validString,
    }
  );

  async function fetchMovies(
    searchMovieInput: string,
    pageNumber: number
  ): Promise<MovieDetail[]> {
    if (searchMovieInput !== debouncedSearchTerm) {
      resetPagination();
    }
    const { data } = await axios.get(
      `${API_URL}&s=${debouncedSearchTerm}&page=${pageNumber}`
    );
    console.log(`${API_URL}&s=${searchMovieInput}&page=${pageNumber}`);
    console.log(data);
    setTotalMoviesResults(data.totalResults);
    setTotalNumberOfPages(Math.floor(data.totalResults / 10));
    const mappedMovies: MovieDetail[] = data.Search.map((movie: any) => {
      return {
        image: movie.Poster,
        title: movie.Title,
        type: movie.Type,
        year: movie.Year,
        id: movie.imdbID,
      };
    });

    setFetchedMovies(mappedMovies);
    return mappedMovies;
  }

  const resetPagination = (): void => {
    setPage(1);
  };

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    await fetchMovies(searchCtx.searchedInput, value);
  };

  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }
  //   if (isError) {
  //     return <div>Error! {isError}</div>;
  //   }

  return (
    <div>
      <Link className={Styles.favouritePageLink} to="favourites">
        My Favourites
      </Link>
      <header className={Styles.header}>
        <SearchInput></SearchInput>
      </header>
      <div className={Styles.paginationContainer}>
        <Pagination
          page={page}
          onChange={handlePageChange}
          count={totalNumberOfPages}
          color="secondary"
        />
      </div>

      <main className={Styles.moviesContainer}>
        {!isLoading && !isError ? (
          fetchedMovies?.map((movie: MovieDetail, index: number) => {
            return (
              <MovieDetailCard
                id={movie.id}
                image={movie.image}
                title={movie.title}
                year={movie.year}
                type={movie.type}
                key={index}
              />
            );
          })
        ) : (
          <p>error state</p>
        )}
      </main>

      {/* {status}
      {totalMoviesResults} */}
    </div>
  );
};

export default EntryPage;
