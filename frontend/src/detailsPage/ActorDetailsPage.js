import React, {useContext, useEffect} from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";

export default function ActorDetailsPage() {
  const history = useHistory();
  const {actor,searchItems,setReloadStatus,getActorById} = useContext(SearchContext);

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line
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
    if(searchItems.length === 0) {
      setReloadStatus(true);
    }
    history.goBack();
  }

  function onRefresh() {
    let currentPath = window.location.pathname.split("/");
    const previousSearch = currentPath[3].replace("%20", " ");
    getActorById(previousSearch);
  }

}
