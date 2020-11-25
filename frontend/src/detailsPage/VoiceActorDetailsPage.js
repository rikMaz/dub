import React, {useContext} from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";

export default function VoiceActorDetailsPage() {
  const history = useHistory();
  const {voiceActor,voiceActorActors,actors,searchItems,getVoiceActorByName} = useContext(SearchContext);


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
    if(searchItems.length === 0) {
      getVoiceActorByName(voiceActor.name);
    }
    history.goBack();
  }

}
