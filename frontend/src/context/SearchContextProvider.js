import React, { useState } from 'react';
import SearchContext from "./SearchContext";
import {
  getMovieSearchResultByName,
  getMovieDetailsById,
  getActorSearchResultByName,
  getActorDetailsById} from "../service/SearchService";

export default function SearchContextProvider({children}) {
  const [movie, setMovie] = useState();
  const [movies, setMovies] = useState([]);
  const [actor, setActor] = useState();
  const [actors, setActors] = useState([]);

  const getMoviesByName = (name) =>
    getMovieSearchResultByName(name).then((movieSearch) => setMovies(movieSearch));

  const getMovieById = (id) =>
    getMovieDetailsById(id).then((movieSearch) => setMovie(movieSearch));

  const getActorsByName = (name) =>
    getActorSearchResultByName(name).then((movieSearch) => setActors(movieSearch));

  const getActorById = (id) =>
    getActorDetailsById(id).then((movieSearch) => setActor(movieSearch));

  return (
    <SearchContext.Provider value={{actor,actors,movie,movies,getActorsByName,getMoviesByName,getActorById,getMovieById}}>
      {children}
    </SearchContext.Provider>
  )
}