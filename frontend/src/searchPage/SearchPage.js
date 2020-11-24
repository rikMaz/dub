import React, {useContext,useState} from "react";
import { useHistory } from 'react-router-dom';
import SearchList from "./SearchList";
import SearchContext from "../context/SearchContext";

export default function SearchPage() {
  const history = useHistory();
  const [name,setName] = useState("");
  const {movie,searchType,getActorsByName,getMoviesByName,setSearchItems, setLastSearch,getVoiceActorByName} = useContext(SearchContext);

  if(searchType === "Crew") {
    return (
      <>
        <div>{movie.name}</div>
        <div>{searchType}</div>
        <button onClick={onCancel}>Cancel</button>
        <SearchList/>
      </> )
  }

  return (

    <>
      <div>{searchType}</div>
      <input name="name" value={name} type="text" onChange={event => setName(event.target.value)}/>
      <button onClick={onSearch} disabled={!name}>Search</button>
      <button onClick={onCancel}>Cancel</button>
      <SearchList/>
    </>)



  function onCancel() {
    history.goBack();
    setSearchItems([]);
  }

  function onSearch() {
    setLastSearch(name);

    switch (searchType) {

      case "Movies and TV Series":
        getMoviesByName(name);
        break;

      case "Actors":
        getActorsByName(name);
        break;

      case "Voice Actors":
        getVoiceActorByName(name);
        break;

      default:
        history.goBack();
        break;
    }
  }
}