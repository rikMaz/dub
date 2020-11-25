import React, {useContext, useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import SearchList from "./SearchList";
import SearchContext from "../context/SearchContext";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

export default function SearchPage() {
  const history = useHistory();
  const [name,setName] = useState("");
  const {movie,searchType,setSearchType,getActorsByName,getMoviesByName,setSearchItems, setLastSearch,getVoiceActorByName} = useContext(SearchContext);


  useEffect(() => {
    onRefresh();
  },[])


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
        <Dropdown.Item onClick={() => setSearchType("voiceactor")}>Voice Actor</Dropdown.Item>
      </DropdownButton>

      <input name="name" disabled={!searchType} value={name} type="text" onChange={event => setName(event.target.value)}/>
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
        getMoviesByName(name).then(() => history.push(`/search/${searchType}/${name}`));
        break;

      case "actor":
        getActorsByName(name).then(() => history.push(`/search/${searchType}/${name}`));;
        break;

      case "voiceactor":
        getVoiceActorByName(name).then(() => history.push(`/search/${searchType}/${name}`));;
        break;

      default:
        break;
    }
  }

  function onRefresh() {

    let currentPath = window.location.pathname.split("/")

    /*if (window.performance) {
      console.info("window.performance works fine on this browser");
    }*/

    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      console.info("This page is reloaded");
      const previousName = currentPath[3].replace("%20", " ");
      const previousSearchType = currentPath[2];
      setSearchType(currentPath[2]);
      switch (previousSearchType) {

        case "movie":
          getMoviesByName(previousName);
          break;

        case "actor":
          getActorsByName(previousName);
          break;

        case "voiceactor":
          getVoiceActorByName(previousName);
          break;

        default:
          break;
      }
    }

  }

}