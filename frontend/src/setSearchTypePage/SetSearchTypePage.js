import React, {useContext} from "react";
import { useHistory } from 'react-router-dom';
import SearchContext from "../context/SearchContext";

export default function SetSearchTypePage() {
  const {setSearchType} = useContext(SearchContext);
  const history = useHistory();

  return (
    <>
      <div>SearchPage</div>

      <button onClick={handleSearchMovie}>Search Movie</button>

      <button onClick={handleSearchActor}>Search Actor</button>

      <button onClick={onCancel}>Cancel</button>
    </>
  )

  function onCancel() {
    history.goBack();
  }

  function handleSearchMovie() {
    setSearchType("movie")
    history.push("/searchresultpage");
  }

  function handleSearchActor() {
    setSearchType("actor")
    history.push("/searchresultpage");
  }


}