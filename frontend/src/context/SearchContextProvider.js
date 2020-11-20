import React, { useState } from 'react';
import SearchContext from "./SearchContext";
import {getMovieSearchResultByName,getMovieDetailsById} from "../service/SearchService";

export default function SearchContextProvider({children}) {
  const [movie, setMovie] = useState();
  const [movies, setMovies] = useState([]);

  const getMoviesByName = (name) =>
    getMovieSearchResultByName(name).then((movieSearch) => setMovies(movieSearch));

  const getMovieById = (id) =>
    getMovieDetailsById(id).then((movieSearch) => setMovie(movieSearch));

  return (
    <SearchContext.Provider value={{movie,movies,getMoviesByName,getMovieById}}>
      {children}
    </SearchContext.Provider>
  )
}