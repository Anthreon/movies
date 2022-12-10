import axios from "axios";
import { DetailsAboutMovie } from "../types/interfaces";

const API_DETAIL_URL = "http://omdbapi.com/?apikey=aa5c3014&r=json&type=movie";

function lowerObjectKeys(obj: any) {
  return Object.keys(obj).reduce((accumulator: any, key: any) => {
    accumulator[key.toLowerCase()] = obj[key];
    return accumulator;
  }, {});
}

export const fetchMovieDetailPage = async (pageId: string) => {
  const { data } = await axios.get(`${API_DETAIL_URL}&i=${pageId}`);
  const movie: DetailsAboutMovie = lowerObjectKeys(data);
  delete movie.ratings;
  return movie;
};
