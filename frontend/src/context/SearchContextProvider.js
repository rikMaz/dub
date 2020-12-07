import React, {useContext, useState} from 'react';
import SearchContext from "./SearchContext";
import {
  getMoviesByName,
  getMovieById,
  getActorsByName,
  getActorById,
  getMovieCrewById,
  uploadImage,
  getVoiceActorsByName,
  getVoiceActorById, uploadAudio
} from "../service/SearchService";
import {useHistory} from "react-router-dom";
import UserContext from "./UserContext";


export default function SearchContextProvider({children}) {
  const history = useHistory();
  const { token, tokenIsValid } = useContext(UserContext);
  const [name,setName] = useState("");
  const [actor, setActor] = useState([]);
  const [movie, setMovie] = useState([]);
  const [reloadStatus,setReloadStatus] = useState(false);
  const [voiceActor, setVoiceActor] = useState([]);
  const [searchType, setSearchType] = useState("movie");
  const [searchItems, setSearchItems] = useState([]);
  const [inputImageUrl,setInputImageUrl] = useState("/imageerror.png");
  const [inputImage,setInputImage] = useState(null);
  const voiceActorActors = [];
  const [actors,setActors] = useState([]);
  const [devices, setDevices] = useState([]);
  const [inputAudio,setInputAudio] = useState();
  const [inputAudioUrl,setInputAudioUrl] = useState();
  const [audioBlob,setAudioBlob] = useState();

  const getMovies = (name) =>
    getMoviesByName(name,token).then((item) => setSearchItems(item));

  const getMovie = (id) =>
    getMovieById(id,token).then((item) => setMovie(item));

  const getActors = (name) =>
    getActorsByName(name,token).then((item) => setSearchItems(item));

  const getActor = (id) =>
    getActorById(id,token).then((item) => setActor(item));

  const getMovieCrew = (id) =>
    getMovieCrewById(id,token).then((item) => setSearchItems(item));

  const recognizeCelebrity = (file) =>
    uploadImage(file,token).then((item) => history.push("/search/actor/" + item));

  const identifyVoiceActor = (file) =>
    uploadAudio(file,token).then(function(item){
      if(item === ("couldntIdentifySpeaker")) {
        history.push("/audio/notFound");
      } else {
        history.push("/details/voiceactor/" + item);
      }
    });

  const getVoiceActors = (name) =>
    getVoiceActorsByName(name,token).then((item) => setSearchItems(item));

  const getVoiceActor = (name) =>
    getVoiceActorById(name,token).then((item) => setVoiceActor(item));


  return (
    <SearchContext.Provider value={{
      audioBlob,setAudioBlob,
      inputAudioUrl,setInputAudioUrl,
      inputAudio,setInputAudio,
      devices, setDevices,
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
      recognizeCelebrity,
      identifyVoiceActor}}>
      {children}
    </SearchContext.Provider>
  )
}