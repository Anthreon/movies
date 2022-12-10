import axios from "axios";

export interface DetailsAboutMovie {
  actors: string;
  awards: string;
  boxoffice: string;
  country: string;
  director: string;
  dvd: string;
  genre: string;
  imdbid: string;
  imdbrating: string;
  imdbvotes: string;
  language: string;
  metascore: string;
  plot: string;
  poster: string;
  production: string;
  rated: string;
  ratings?: [{ Source: string; Value: string }];
  released: string;
  response: string;
  runtime: string;
  title: string;
  type: string;
  website: string;
  writer: string;
  year: string;
}

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
