import React from 'react';
import VoiceActorActorList from "./VoiceActorActorList";
import {useHistory} from "react-router-dom";


export default function VoiceActorActorListPage() {
  const history = useHistory();

  return(
    <>
      <button onClick={onCancel}>Cancel</button>
      <VoiceActorActorList/>
    </>
  )

  function onCancel() {
    history.goBack();
  }

}