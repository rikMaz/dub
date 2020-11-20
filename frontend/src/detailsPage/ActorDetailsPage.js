import React, {useContext} from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";

export default function ActorDetailsPage() {
  const history = useHistory();
  const {actor} = useContext(SearchContext);

  return (
    <>
      <div>{actor?.name}</div>
      <img alt="ActorImage" src={"https://image.tmdb.org/t/p/w154/"+actor?.image}/>
      <button onClick={onCancel}>Cancel</button>
    </>
  )

  function onCancel() {
    history.goBack();
  }
}
