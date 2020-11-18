import React, { useEffect, useState } from 'react';
import SearchContext from "./SearchContext";
import {getMovieSearchResultByName} from "../service/SearchService";

export default function SearchContextProvider({children}) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovieSearchResultByName(name).then(setMovies)
  },[]);

  return (
    <SearchContext.Provider value={{movies}}>
      {children}
    </SearchContext.Provider>
  )
}