import React, {useContext, useState} from 'react';
import SearchContext from "./SearchContext";
import {
  getMoviesByName,
  getMovieById,
  getActorsByName,
  getActorById,
  getMovieCrewById,
  getVoiceActorsByName,
  getVoiceActorById
} from "../service/SearchService";
import {useHistory} from "react-router-dom";
import UserContext from "./UserContext";


export default function SearchContextProvider({children}) {
  const history = useHistory();
  const { token } = useContext(UserContext);
  const [name,setName] = useState("");
  const [actor, setActor] = useState([]);
  const [movie, setMovie] = useState([]);
  const [voiceActor, setVoiceActor] = useState([]);
  const [actors,setActors] = useState([]);
  const voiceActorActors = [];
  const [searchType, setSearchType] = useState("movie");
  const [searchItems, setSearchItems] = useState([]);
  const [searchPlaceholder,setSearchPlaceholder] = useState("movies...")
  const [reloadStatus,setReloadStatus] = useState(false);

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

  const getVoiceActors = (name) =>
    getVoiceActorsByName(name,token).then((item) => setSearchItems(item));

  const getVoiceActor = (name) =>
    getVoiceActorById(name,token).then((item) => setVoiceActor(item));

  function onSearch() {
    console.log(searchType);
    switch (searchType) {

      case "movie":
        getMovies(name).then(() => history.push(`/search/${searchType}/${name}`));
        break;

      case "actor":
        getActors(name).then(() => history.push(`/search/${searchType}/${name}`));
        break;

      case "voiceactor":
        getVoiceActors(name).then(() => history.push(`/search/${searchType}/${name}`));
        break;

      default:
        break;
    }
  }

  async function onRefresh() {

    let currentPath = window.location.pathname.split("/");
    if (currentPath.length > 2) {
      const previousSearch = currentPath[3].replace("%20", " ");
      setSearchType(currentPath[2]);
      switch (currentPath[2]) {

        case "movie":
          await getMovies(previousSearch);
          break;

        case "actor":
          await getActors(previousSearch);
          setSearchPlaceholder("actors...");
          break;

        case "voiceactor":
          await getVoiceActors(previousSearch);
          break;

        case "crew":
          setName(previousSearch.replace("%20"," "));
          await getMovieCrew(currentPath[4]);
          break;

        default:
          break;

      }
    }
  }

  return (
    <SearchContext.Provider value={{
      searchPlaceholder,setSearchPlaceholder,
      reloadStatus,
      setReloadStatus,
      name,
      setName,
      actors,
      setActors,
      voiceActorActors,
      voiceActor,
      setVoiceActor,
      actor,
      movie,
      searchItems,
      setSearchItems,
      searchType,
      setSearchType,
      onSearch,
      onRefresh,
      getVoiceActor,
      getVoiceActors,
      getActors,
      getMovies,
      getActor,
      getMovie,
      getMovieCrew}}>
      {children}
    </SearchContext.Provider>
  )
}