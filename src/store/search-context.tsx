import { createContext, useState } from "react";
import { ChildrenProps } from "../types/interfaces";

export const SearchContext = createContext({
  searchedInput: "",
  pagination: 1,
  changeSearchInputHandler: (searchTerm: string) => {},
  changePaginationHandler: (pageNumber: number) => {},
  resetPagination: () => {},
});

const SearchContextProvider = ({ children }: ChildrenProps) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [pagination, setPagination] = useState<number>(1);

  const changeSearchInputHandler = (searchTerm: string): void => {
    setSearchInput(searchTerm);
    resetPagination();
  };

  const changePaginationHandler = (pageNumber: number): void => {
    setPagination(pageNumber);
  };
  const resetPagination = (): void => {
    setPagination(1);
  };

  const value = {
    searchedInput: searchInput,
    pagination: pagination,
    changeSearchInputHandler: changeSearchInputHandler,
    changePaginationHandler: changePaginationHandler,
    resetPagination: resetPagination,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchContextProvider;
