import React, { useState } from 'react';
import SearchContext from "./SearchContext";
import {
  getMovieSearchResultByName,
  getMovieDetailsById,
  getActorSearchResultByName,
  getActorDetailsById} from "../service/SearchService";


export default function SearchContextProvider({children}) {
  const [actor, setActor] = useState();
  const [movie, setMovie] = useState();
  const [searchItems, setSearchItems] = useState([]);

  const getMoviesByName = (name) =>
    getMovieSearchResultByName(name).then((item) => setSearchItems(item));

  const getMovieById = (id) =>
    getMovieDetailsById(id).then((item) => setMovie(item));

  const getActorsByName = (name) =>
    getActorSearchResultByName(name).then((item) => setSearchItems(item));

  const getActorById = (id) =>
    getActorDetailsById(id).then((item) => setActor(item));

  return (
    <SearchContext.Provider value={{actor,movie,searchItems,getActorsByName,getMoviesByName,getActorById,getMovieById}}>
      {children}
    </SearchContext.Provider>
  )
}