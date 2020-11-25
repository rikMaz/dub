import React, {useContext, useEffect} from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";

export default function VoiceActorDetailsPage() {
  const history = useHistory();
  const {voiceActor,getVoiceActorActorList,voiceActorActors,setSearchType,actors,setActors,getVoiceActorById} = useContext(SearchContext);

  useEffect(() => {
    onRefresh();
  },[])

  return (
    <>
      <div>{voiceActor?.name}</div>
      <img alt="ActorImage" src={voiceActor?.image} height="231px" width="154px"/>
      <label>Birthday<p>{voiceActor?.birthday}</p></label>
      <button onClick={showActors}>Actors</button>
      <button onClick={showActorList}>ShowActorList</button>
      <button onClick={onCancel}>Cancel</button>
    </>
  )

  function showActors() {
    //voiceActor?.actors.forEach((item) => getVoiceActorActorList(item.id));

    /*for (let i = 0; i < voiceActor?.actors.length; i++) {
      getVoiceActorActorList(voiceActor?.actors[i].id);
    }*/


    /*setSearchType("Movies and TV Series");
    setActors(voiceActorActors);
    history.push("/voiceactoractorlistpage");*/
  }

  function showActorList() {
    console.log(voiceActorActors);
    console.log(actors);
  }

  function onCancel() {
    history.goBack();
  }

  function onRefresh() {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      console.info("This page is reloaded");
      let currentPath = window.location.pathname.split("/")
      getVoiceActorById(currentPath[2]);
    }
  }
}
