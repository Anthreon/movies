import { FC, useContext, useState } from "react";
import SearchInput from "../components/SearchInput";
import Styles from "./EntryPage.module.css";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { SearchContext } from "../store/search-context";
import useDebounce from "../customHooks/useDebounce";
import MovieDetailCard from "../components/MovieDetailCard";
import { Pagination } from "@mui/material";
import EmptySearch from "../components/EmptySearch";
import BackDropSpinner from "../components/BackDropSpinner";
import NoResultsFound from "../components/NoResultsFound";
import { MovieDetail } from "../types/interfaces";
import { OMBD_API_URL } from "../util/constants";

const EntryPage: FC = () => {
  const searchCtx = useContext(SearchContext);
  const validString: boolean = searchCtx.searchedInput.length > 2;
  const debouncedSearchTerm = useDebounce(searchCtx.searchedInput, 500);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState<number>(0);
  const [fetchedMovies, setFetchedMovies] = useState<MovieDetail[]>([]);
  const [fetchingResults, setFetchingResults] = useState<boolean>(false);

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
    fetchMovies.bind(
      fetchMovies,
      `&s=${debouncedSearchTerm}`,
      searchCtx.pagination
    ),
    {
      enabled: validString,
    }
  );

  async function fetchMovies(
    searchMovieInput: string,
    pageNumber: number
  ): Promise<MovieDetail[]> {
    setFetchingResults(true);
    const { data } = await axios.get(
      `${OMBD_API_URL}&s=${debouncedSearchTerm}&page=${pageNumber}`
    );
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
    setFetchingResults(false);
    return mappedMovies;
  }

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    searchCtx.changePaginationHandler(value);
    await fetchMovies(searchCtx.searchedInput, value);
  };

  return (
    <div>
      {fetchingResults && status !== "error" ? (
        <BackDropSpinner></BackDropSpinner>
      ) : null}

      <Link className={Styles.favouritePageLink} to="favourites">
        My Favourites {}
      </Link>
      <header className={Styles.header}>
        <SearchInput></SearchInput>
      </header>

      {validString && status !== "error" ? (
        <div>
          <div className={Styles.paginationContainer}>
            <Pagination
              page={searchCtx.pagination}
              onChange={handlePageChange}
              count={totalNumberOfPages}
              color="secondary"
            />
          </div>

          <main className={Styles.moviesContainer}>
            {fetchedMovies?.map((movie: MovieDetail, index: number) => {
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
            })}
          </main>
        </div>
      ) : status !== "error" || !validString ? (
        <EmptySearch></EmptySearch>
      ) : (
        <NoResultsFound></NoResultsFound>
      )}
    </div>
  );
};

export default EntryPage;
