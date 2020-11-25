import React, {useContext, useEffect} from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";

export default function ActorDetailsPage() {
  const history = useHistory();
  const {actor,getActorById} = useContext(SearchContext);

  useEffect(() => {
    onRefresh();
  },[])

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
    history.goBack();
  }

  function onRefresh() {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      console.info("This page is reloaded");
      let currentPath = window.location.pathname.split("/")
      getActorById(currentPath[2]);
    }
  }
}
