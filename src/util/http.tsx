import axios from "axios";
import { DetailsAboutMovie, MovieDetail } from "../types/interfaces";
import { OMBD_API_URL } from "./constants";
import { lowerObjectKeys } from "./helperFunctions";

export const fetchMovieDetailPage = async (
  pageId: string
): Promise<DetailsAboutMovie> => {
  const { data } = await axios.get(`${OMBD_API_URL}&i=${pageId}`);
  const movie: DetailsAboutMovie = lowerObjectKeys(data);
  delete movie.ratings;
  return movie;
};

export const fetchMoviesBySearch = async (
  searchMovieInput: string,
  pageNumber: number
): Promise<{ movies: MovieDetail[]; totalResults: number }> => {
  const { data } = await axios.get(
    `${OMBD_API_URL}&s=${searchMovieInput}&page=${pageNumber}`
  );
  const mappedMovies: MovieDetail[] = data.Search.map((movie: any) => {
    return {
      image: movie.Poster,
      title: movie.Title,
      type: movie.Type,
      year: movie.Year,
      id: movie.imdbID,
    };
  });
  return { movies: mappedMovies, totalResults: data.totalResults };
};
