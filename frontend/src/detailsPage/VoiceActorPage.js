import React from 'react';
import {useHistory} from "react-router-dom";
import SearchItem from "../commons/SearchItem";
import useVoiceActor from "../hooks/useVoiceActor";

export default function VoiceActorPage() {
  const history = useHistory();
  const [voiceActor] = useVoiceActor();

  return (
    <>
      <div>{voiceActor?.name}</div>
      <img alt="ActorImage" src={voiceActor?.image} height="231px" width="154px"/>
      <label>Birthday<p>{voiceActor?.birthday}</p></label>
      <button onClick={onCancel}>Cancel</button>

      <ul>
        {voiceActor?.actors.map((listItem) =>
          <li key={listItem.id}>
            <SearchItem searchItem={listItem}/>
          </li>
        )}
      </ul>
    </>
  )

  function onCancel() {
    history.goBack();
  }

}
