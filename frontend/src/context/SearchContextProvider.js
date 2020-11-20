import React, { useState } from 'react';
import SearchContext from "./SearchContext";
import {
  getMovieSearchResultByName,
  getMovieDetailsById,
  getActorSearchResultByName,
  getActorDetailsById,
  getMovieCrewById} from "../service/SearchService";


export default function SearchContextProvider({children}) {
  const [actor, setActor] = useState();
  const [movie, setMovie] = useState();
  const [searchType, setSearchType] = useState();
  const [lastSearch, setLastSearch] = useState("");
  const [searchItems, setSearchItems] = useState([]);

  const getMoviesByName = (name) =>
    getMovieSearchResultByName(name).then((item) => setSearchItems(item));

  const getMovieById = (id) =>
    getMovieDetailsById(id).then((item) => setMovie(item));

  const getActorsByName = (name) =>
    getActorSearchResultByName(name).then((item) => setSearchItems(item));

  const getActorById = (id) =>
    getActorDetailsById(id).then((item) => setActor(item));

  const getMovieCrewByMovieId = (id) =>
    getMovieCrewById(id).then((item) => setSearchItems(item));

  return (
    <SearchContext.Provider value={{actor,movie,searchItems,setSearchItems,searchType,setSearchType,lastSearch, setLastSearch,getActorsByName,getMoviesByName,getActorById,getMovieById,getMovieCrewByMovieId}}>
      {children}
    </SearchContext.Provider>
  )
}