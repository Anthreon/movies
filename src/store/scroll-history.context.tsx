import { createContext, useState } from "react";
import { ChildrenProps } from "../types/interfaces";

interface ScrollPositions {
  entryPage: number;
  favouritePage: number;
  detailPage: number;
}

export const ScrollContext = createContext({
  scrollPositionOfPage: { entryPage: 0, favouritePage: 0, detailPage: 0 },
  changeScrollPositionHandler: (
    keyName: "entryPage" | "favouritePage" | "detailPage",
    scrollValue: number
  ) => {},
});

const ScrollContextProvider = ({ children }: ChildrenProps) => {
  const [scrollPositions, setScrollPositions] = useState<ScrollPositions>({
    entryPage: 0,
    favouritePage: 0,
    detailPage: 0,
  });

  const changeScrollPositionHandler = (
    keyName: "entryPage" | "favouritePage" | "detailPage",
    scrollValue: number
  ): void => {
    const newPositions: ScrollPositions = JSON.parse(
      JSON.stringify(scrollPositions)
    );
    newPositions[keyName as keyof ScrollPositions] = scrollValue;
    setScrollPositions(newPositions);
  };

  const value = {
    scrollPositionOfPage: scrollPositions,
    changeScrollPositionHandler: changeScrollPositionHandler,
  };

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
};

export default ScrollContextProvider;
