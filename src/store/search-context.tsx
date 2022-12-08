import { createContext, ReactNode, useState } from "react";

interface SearchProps {
  children?: ReactNode;
}

export const SearchContext = createContext({
  searchedInput: "",
  changeSearchInputHandler: (searchTerm: string) => {},
});

const SearchContextProvider = ({ children }: SearchProps) => {
  const [searchInput, setSearchInput] = useState<string>("");

  const changeSearchInputHandler = (searchTerm: string): void => {
    setSearchInput(searchTerm);
  };

  const value = {
    searchedInput: searchInput,
    changeSearchInputHandler: changeSearchInputHandler,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchContextProvider;
