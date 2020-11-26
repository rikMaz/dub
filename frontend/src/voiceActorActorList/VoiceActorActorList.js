import React, { useContext } from 'react';
import SearchContext from "../context/SearchContext";
import SearchItem from "../commons/SearchItem";


export default function VoiceActorActorList({voiceActor}) {

  return(
    <>
      <div>Voice Actor Actors Liste: </div>
      <ul>
        {voiceActor?.actors.map((listItem) =>
          <li key={listItem.id}>
            <SearchItem searchItem={listItem}/>
          </li>
        )}
      </ul>
    </>
  )

}

