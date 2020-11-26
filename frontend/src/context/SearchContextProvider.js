import React, {useState} from 'react';
import SearchContext from "./SearchContext";
import {
  getMoviesByName,
  getMovieById,
  getActorsByName,
  getActorById,
  getMovieCrewById,
  uploadImage,
  getVoiceActorsByName,
  getVoiceActorById} from "../service/SearchService";
import {useHistory} from "react-router-dom";


export default function SearchContextProvider({children}) {
  const history = useHistory();
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


  const getMovies = (name) =>
    getMoviesByName(name).then((item) => setSearchItems(item));

  const getMovie = (id) =>
    getMovieById(id).then((item) => setMovie(item));

  const getActors = (name) =>
    getActorsByName(name).then((item) => setSearchItems(item));

  const getActor = (id) =>
    getActorById(id).then((item) => setActor(item));

  const getMovieCrew = (id) =>
    getMovieCrewById(id).then((item) => setSearchItems(item));

  const recognizeCelebrity = (file) =>
    uploadImage(file).then((item) => history.push("/search/actor/" + item));

  const getVoiceActors = (name) =>
    getVoiceActorsByName(name).then((item) => setSearchItems(item));

  const getVoiceActor = (name) =>
    getVoiceActorById(name).then((item) => setVoiceActor(item));


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
      getVoiceActor,
      getVoiceActors,
      getActors,
      getMovies,
      getActor,
      getMovie,
      getMovieCrew,
      recognizeCelebrity}}>
      {children}
    </SearchContext.Provider>
  )
}