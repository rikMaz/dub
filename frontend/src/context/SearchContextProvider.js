import React, { useState } from 'react';
import SearchContext from "./SearchContext";
import {
  getMovieSearchResultByName,
  getMovieDetailsById,
  getActorSearchResultByName,
  getActorDetailsById,
  getMovieCrewById,
  uploadImage} from "../service/SearchService";


export default function SearchContextProvider({children}) {
  const [actor, setActor] = useState();
  const [movie, setMovie] = useState();
  const [searchType, setSearchType] = useState();
  const [lastSearch, setLastSearch] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [inputImageUrl,setInputImageUrl] = useState("/imageerror.png");
  const [inputImage,setInputImage] = useState(null);

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

  const awsRecognizeCelebrity = (file) =>
    uploadImage(file).then((item) => getActorsByName(item));

  return (
    <SearchContext.Provider value={{
      inputImage,
      setInputImage,
      inputImageUrl,
      setInputImageUrl,
      actor,
      movie,
      searchItems,
      setSearchItems,
      searchType,
      setSearchType,
      lastSearch,
      setLastSearch,
      awsRecognizeCelebrity,
      getActorsByName,
      getMoviesByName,
      getActorById,
      getMovieById,
      getMovieCrewByMovieId}}>
      {children}
    </SearchContext.Provider>
  )
}