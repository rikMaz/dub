import React, { useState } from 'react';
import SearchContext from "./SearchContext";
import {getMovieSearchResultByName} from "../service/SearchService";

export default function SearchContextProvider({children}) {
  const [movies, setMovies] = useState([]);

  const getMoviesByName = (name) =>
    getMovieSearchResultByName(name).then((movieSearch) => setMovies(movieSearch))

  return (
    <SearchContext.Provider value={{movies,getMoviesByName}}>
      {children}
    </SearchContext.Provider>
  )
}