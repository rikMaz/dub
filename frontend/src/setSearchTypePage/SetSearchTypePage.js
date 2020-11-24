import React, {useContext} from "react";
import { useHistory } from 'react-router-dom';
import SearchContext from "../context/SearchContext";

export default function SetSearchTypePage() {
  const {setSearchType} = useContext(SearchContext);
  const history = useHistory();

  return (
    <>
      <div>SetSearchTypePage</div>

      <button onClick={handleSearchMovie}>Search Movie</button>

      <button onClick={handleSearchActor}>Search Actor</button>

      <button onClick={handleSearchVoiceActor}>Search Voice Actor</button>

      <button onClick={onCancel}>Cancel</button>
    </>
  )

  function onCancel() {
    history.goBack();
  }

  function handleSearchMovie() {
    setSearchType("Movies and TV Series")
    history.push("/searchpage");
  }

  function handleSearchActor() {
    setSearchType("Actors")
    history.push("/searchpage");
  }

  function handleSearchVoiceActor() {
    setSearchType("Voice Actors")
    history.push("/searchpage");
  }


}