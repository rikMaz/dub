import React, {useContext} from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";

export default function VoiceActorDetailsPage() {
  const history = useHistory();
  const {voiceActor} = useContext(SearchContext);

  return (
    <>
      <div>{voiceActor?.name}</div>
      <img alt="ActorImage" src={voiceActor?.image}/>
      <button onClick={onCancel}>Cancel</button>
      <label>Birthday<p>{voiceActor?.birthday}</p></label>
    </>
  )

  function onCancel() {
    history.goBack();
  }
}
