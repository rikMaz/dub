import React, { useState } from 'react';
import SearchContext from "./SearchContext";
import {
  getMovieSearchResultByName,
  getMovieDetailsById,
  getActorSearchResultByName,
  getActorDetailsById} from "../service/SearchService";

export default function SearchContextProvider({children}) {
  const [movie, setMovie] = useState();
  const [searchItem, setSearchItem] = useState([]);
  const [actor, setActor] = useState();

  const getMoviesByName = (name) =>
    getMovieSearchResultByName(name).then((movieSearch) => setSearchItem(movieSearch));

  const getMovieById = (id) =>
    getMovieDetailsById(id).then((movieSearch) => setMovie(movieSearch));

  const getActorsByName = (name) =>
    getActorSearchResultByName(name).then((movieSearch) => setSearchItem(movieSearch));

  const getActorById = (id) =>
    getActorDetailsById(id).then((movieSearch) => setActor(movieSearch));

  return (
    <SearchContext.Provider value={{actor,movie,searchItem,getActorsByName,getMoviesByName,getActorById,getMovieById}}>
      {children}
    </SearchContext.Provider>
  )
}