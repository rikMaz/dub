import React, {useContext } from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";

export default function ActorDetailsPage() {
  const history = useHistory();
  const {actor,searchItems,getActorsByName} = useContext(SearchContext);
  //window.location.reload(false);
  return (
    <>
      <div>{actor?.name}</div>
      <img alt="ActorImage" src={actor?.image}/>
      <button onClick={onCancel}>Cancel</button>
      <label>Birthday<p>{actor?.birthday}</p></label>
      <label>Place of Birth<p>{actor?.placeOfBirth}</p></label>
      <label>Biography<p>{actor?.biography}</p></label>
    </>
  )

  function onCancel() {
    if(searchItems.length === 0) {
      getActorsByName(actor.name);
    }
    history.goBack();
  }

}
