import { FC, useContext, useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import Styles from "./EntryPage.module.css";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { SearchContext } from "../store/search-context";
import useDebounce from "../customHooks/useDebounce";
import MovieDetailCard from "../components/MovieDetailCard";
import { Pagination } from "@mui/material";
import EmptySearch from "../components/EmptySearch";
import BackDropSpinner from "../components/BackDropSpinner";
import NoResultsFound from "../components/NoResultsFound";
import { MovieDetail } from "../types/interfaces";
import { fetchMoviesBySearch } from "../util/http";
import { ScrollContext } from "../store/scroll-history.context";

const EntryPage: FC = () => {
  const searchCtx = useContext(SearchContext);
  const scrollCtx = useContext(ScrollContext);
  const validString: boolean = searchCtx.searchedInput.length > 2;
  const debouncedSearchTerm = useDebounce(searchCtx.searchedInput, 1000);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState<number>(0);
  const [fetchedMovies, setFetchedMovies] = useState<MovieDetail[]>([]);
  const [currentScrollPosition, setCurrentScrollPosition] = useState<number>(0);
  const [pageInError, setPageInError] = useState<boolean>(false);

  const listenForScroll = () => {
    setCurrentScrollPosition(window.scrollY);
    scrollCtx.changeScrollPositionHandler("entryPage", window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenForScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", listenForScroll);
    };
  }, [currentScrollPosition]);

  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      window.scrollTo({
        top: scrollCtx.scrollPositionOfPage.entryPage,
        behavior: "auto",
      });
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

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
    handleMoviesState.bind(handleMoviesState, searchCtx.pagination),
    {
      enabled: validString,
    }
  );

  async function handleMoviesState(pageNumber: number): Promise<void> {
    try {
      setPageInError(false);
      const movies: { movies: MovieDetail[]; totalResults: number } =
        await fetchMoviesBySearch(debouncedSearchTerm, pageNumber);
      setTotalNumberOfPages(Math.floor(movies.totalResults / 10));
      setFetchedMovies(movies.movies);
    } catch (error: any) {
      console.log(error);
      setPageInError(true);
    }
  }

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    searchCtx.changePaginationHandler(value);
    await handleMoviesState(value);
  };

  const errorPage: JSX.Element = (
    <div>
      {isLoading && status !== "error" ? (
        <BackDropSpinner></BackDropSpinner>
      ) : null}

      <Link className={Styles.favouritePageLink} to="favourites">
        My Favourites
      </Link>
      <header className={Styles.header}>
        <SearchInput></SearchInput>
      </header>

      <NoResultsFound></NoResultsFound>
    </div>
  );

  const validPage: JSX.Element = (
    <div>
      {isLoading && status !== "error" ? (
        <BackDropSpinner></BackDropSpinner>
      ) : null}

      <Link className={Styles.favouritePageLink} to="favourites">
        My Favourites
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

  return <>{pageInError && validString ? errorPage : validPage}</>;
};

export default EntryPage;
