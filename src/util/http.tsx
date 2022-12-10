import axios from "axios";
import { DetailsAboutMovie } from "../types/interfaces";
import { OMBD_API_URL } from "./constants";

function lowerObjectKeys(obj: any) {
  return Object.keys(obj).reduce((accumulator: any, key: any) => {
    accumulator[key.toLowerCase()] = obj[key];
    return accumulator;
  }, {});
}

export const fetchMovieDetailPage = async (pageId: string) => {
  const { data } = await axios.get(`${OMBD_API_URL}&i=${pageId}`);
  const movie: DetailsAboutMovie = lowerObjectKeys(data);
  delete movie.ratings;
  return movie;
};
