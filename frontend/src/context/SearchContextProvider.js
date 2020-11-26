import React, {useEffect, useState} from 'react';
import SearchContext from "./SearchContext";
import {
  getMovieSearchResultByName,
  getMovieDetailsById,
  getActorSearchResultByName,
  getActorDetailsById,
  getMovieCrewById,
  uploadImage,
  getVoiceActorSearchResultByName,
  getVoiceActorDetailsById} from "../service/SearchService";


export default function SearchContextProvider({children}) {
  const [name,setName] = useState("");
  const [actor, setActor] = useState([]);
  const [movie, setMovie] = useState([]);
  const [reloadStatus,setReloadStatus] = useState(false);
  const [voiceActor, setVoiceActor] = useState([]);
  const [searchType, setSearchType] = useState();
  const [searchItems, setSearchItems] = useState([]);
  const [inputImageUrl,setInputImageUrl] = useState("/imageerror.png");
  const [inputImage,setInputImage] = useState(null);
  const voiceActorActors = [];
  const [actors,setActors] = useState([]);

  useEffect(() => {
      if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        console.info("This page is reloaded");
        let currentPath = window.location.pathname.split("/");
        console.log(window.location.pathname);
        console.log(currentPath);
        if (currentPath[1] !== "home") {
          const previousSearch = currentPath[3].replace("%20", " ");
          setSearchType(currentPath[2]);
          switch (currentPath[2]) {

            case "movie":
              if (currentPath[1] === "search") {
                console.log(currentPath[1]);
                getMoviesByName(previousSearch);
              } else {
                console.log(currentPath[1]);
                getMovieById(previousSearch);
              }
              break;

            case "actor":
              if (currentPath[1] === "search") {
                getActorsByName(previousSearch);
              } else {
                getActorById(previousSearch);
              }
              break;

            case "voiceactor":
              if (currentPath[1] === "search") {
                getVoiceActorByName(previousSearch);
              } else {
                getVoiceActorById(previousSearch);
              }
              break;

            case "crew":
              setName(previousSearch);
              getMovieCrewByMovieId(currentPath[4]);
              break;

            default:
              break;

          }
        }
      }
    },[])

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

  const getVoiceActorByName = (name) =>
    getVoiceActorSearchResultByName(name).then((item) => setSearchItems(item));

  const getVoiceActorById = (name) =>
    getVoiceActorDetailsById(name).then((item) => setVoiceActor(item));

  const getVoiceActorActorList = (id) =>
    getActorDetailsById(id).then(item => setActors([...actors,item]));

  return (
    <SearchContext.Provider value={{
      reloadStatus,
      setReloadStatus,
      name,
      setName,
      actors,
      setActors,
      voiceActorActors,
      voiceActor,
      setVoiceActor,
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
      getVoiceActorActorList,
      getVoiceActorByName,
      getVoiceActorById,
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