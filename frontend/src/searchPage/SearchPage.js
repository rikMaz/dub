import React, {useContext, useState} from "react";
import { useHistory } from 'react-router-dom';
import SearchContext from "../context/SearchContext";

export default function SearchPage() {
  const {getMoviesByName,getActorsByName} = useContext(SearchContext);
  const [name,setName] = useState("");
  const history = useHistory();

  return (
    <>
      <div>SearchPage</div>
      <label>Movie/TVSeries<input name="name" value={name} type="text" onChange={event => setName(event.target.value)}/></label>
      <button onClick={handleSearchMovie}>Search Movie</button>

      <label>Actor<input name="name" value={name} type="text" onChange={event => setName(event.target.value)}/></label>
      <button onClick={handleSearchActor}>Search Movie</button>

      <button onClick={onCancel}>Cancel</button>
    </>
  )

  function onCancel() {
    history.goBack();
  }

  function handleSearchMovie() {
    getMoviesByName(name).then(history.push("/searchresultpage"));
  }

  function handleSearchActor() {
    getActorsByName(name).then(history.push("/searchresultpage"));
  }


}