import { ReactNode } from "react";

export interface MovieDetail {
  image: string;
  title: string;
  type: string;
  year: string;
  id: string;
  favouritePage?: boolean;
}

export interface ChildrenProps {
  children?: ReactNode;
}

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
