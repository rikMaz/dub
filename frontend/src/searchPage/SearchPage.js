import React, {useContext, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import SearchList from "./SearchList";
import SearchContext from "../context/SearchContext";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

export default function SearchPage() {
  const history = useHistory();
  const {name,setName,searchType,setSearchType,getActorsByName,getMoviesByName,setSearchItems,getVoiceActorByName,getMovieCrewByMovieId} = useContext(SearchContext);

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line
  },[])


  if(searchType === "crew") {
    return (
      <>
        <div>{name}</div>
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
      <button onClick={goHome}>Cancel</button>
      <SearchList/>
    </>)


  function onCancel() {
    history.goBack();
    setSearchItems([]);
  }

  function goHome() {
    history.push("/");
    setName("");
    setSearchItems([]);
  }

  function onSearch() {

    switch (searchType) {

      case "movie":
        getMoviesByName(name).then(() => history.push(`/search/${searchType}/${name}`));
        break;

      case "actor":
        getActorsByName(name).then(() => history.push(`/search/${searchType}/${name}`));
        break;

      case "voiceactor":
        getVoiceActorByName(name).then(() => history.push(`/search/${searchType}/${name}`));
        break;

      default:
        break;
    }
  }

  function onRefresh() {

    let currentPath = window.location.pathname.split("/");
    if (currentPath.length > 2) {
      const previousSearch = currentPath[3].replace("%20", " ");
      setSearchType(currentPath[2]);
      switch (currentPath[2]) {

        case "movie":
          getMoviesByName(previousSearch);
          break;

        case "actor":
          getActorsByName(previousSearch);
          break;

        case "voiceactor":
          getVoiceActorByName(previousSearch);
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


}