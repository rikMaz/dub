import React, {useContext,useState} from "react";
import { useHistory } from 'react-router-dom';
import SearchList from "./SearchList";
import SearchContext from "../context/SearchContext";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

export default function SearchPage() {
  const history = useHistory();
  const [name,setName] = useState("");
  const {movie,searchType,setSearchType,getActorsByName,getMoviesByName,setSearchItems, setLastSearch,getVoiceActorByName} = useContext(SearchContext);

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
      <DropdownButton id="searchtype" title="SearchType">
        <Dropdown.Item onClick={() => setSearchType("movie")}>Movie</Dropdown.Item>
        <Dropdown.Item onClick={() => setSearchType("actor")}>Actor</Dropdown.Item>
        <Dropdown.Item onClick={() => setSearchType("voiceActor")}>Voice Actor</Dropdown.Item>
      </DropdownButton>

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

      case "movie":
        getMoviesByName(name);
        break;

      case "actor":
        getActorsByName(name);
        break;

      case "voiceActor":
        getVoiceActorByName(name);
        break;

      default:
        history.goBack();
        break;
    }
  }
}