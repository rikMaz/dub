import React, {useContext, useState} from "react";
import { useHistory } from 'react-router-dom';
import SearchContext from "../context/SearchContext";

export default function SearchPage() {
  const {getMoviesByName,getActorsByName} = useContext(SearchContext);
  const [actorName,setActorName] = useState("");
  const [movieName,setMovieName] = useState("");
  const history = useHistory();

  return (
    <>
      <div>SearchPage</div>
      <label>Movie/TVSeries<input name="moviename" value={movieName} type="text" onChange={event => setMovieName(event.target.value)}/></label>
      <button onClick={handleSearchMovie}>Search Movie</button>

      <label>Actor<input name="actorname" value={actorName} type="text" onChange={event => setActorName(event.target.value)}/></label>
      <button onClick={handleSearchActor}>Search Actor</button>

      <button onClick={onCancel}>Cancel</button>
    </>
  )

  function onCancel() {
    history.goBack();
  }

  function handleSearchMovie() {
    getMoviesByName(movieName).then(() => history.push("/searchresultpage"));
  }

  function handleSearchActor() {
    getActorsByName(actorName).then(() => history.push("/searchresultpage"));
  }


}