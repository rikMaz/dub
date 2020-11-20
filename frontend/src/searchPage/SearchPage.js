import React, {useContext,useEffect,useState} from "react";
import { useHistory } from 'react-router-dom';
import SearchList from "./SearchList";
import SearchContext from "../context/SearchContext";

export default function SearchPage() {
  const history = useHistory();
  const [name,setName] = useState("");
  const {searchType,getActorsByName,getMoviesByName,setSearchItems} = useContext(SearchContext);
  const [title,setTitle] = useState("");

  useEffect(() => {
    if(searchType === "movie") {
      setTitle("Movies and TV Series")
    } else {
      setTitle("Actors")
    }
  },[searchType]);

  return (
    <>
      <div>{title}</div>
      <input name="name" value={name} type="text" onChange={event => setName(event.target.value)}/>
      <button onClick={onSearch} disabled={!name}>Search</button>

      <button onClick={onCancel}>Cancel</button>
      <SearchList/>
    </>
  )

  function onCancel() {
    history.goBack();
    setSearchItems([]);
  }

  function onSearch() {
    if(searchType === "movie") {
      getMoviesByName(name);
    } else {
      getActorsByName(name);
    }
  }
}