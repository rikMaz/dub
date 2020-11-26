import React, {useContext, useEffect, useState} from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";
import SearchItem from "../commons/SearchItem";

export default function VoiceActorDetailsPage() {
  const history = useHistory();
  const {voiceActor,searchItems,setReloadStatus,getVoiceActorById} = useContext(SearchContext);

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line
  },[])

  return (
    <>
      <div>{voiceActor?.name}</div>
      <img alt="ActorImage" src={voiceActor?.image} height="231px" width="154px"/>
      <label>Birthday<p>{voiceActor?.birthday}</p></label>
      <button onClick={showActorList}>ShowActorList</button>
      <button onClick={onCancel}>Cancel</button>

      <div>Actors Liste: </div>
      <ul>
        {voiceActor?.actors.map((listItem) =>
          <li key={listItem.id}>
            <SearchItem searchItem={listItem}/>
          </li>
        )}
      </ul>
    </>
  )


  function showActorList() {
   console.log(voiceActor?.actors);
  }



  function onCancel() {
    if(searchItems.length === 0) {
      setReloadStatus(true);
    }
    history.goBack();
  }

  function onRefresh() {
    let currentPath = window.location.pathname.split("/");
    const previousSearch = currentPath[3].replace("%20", " ");
    getVoiceActorById(previousSearch);
  }

}
