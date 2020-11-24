import React, { useContext } from 'react';
import SearchContext from "../context/SearchContext";
import SearchItem from "../commons/SearchItem";


export default function VoiceActorActorList() {
  const { actors } = useContext(SearchContext);

  return(
    <>
      <button onClick={showActorList}>ShowActorsinConsole</button>
      <div>Voice Actor Actors Liste: </div>
      <ul>
        {actors.map((listItem) =>
          <li key={listItem.id}>
            <SearchItem searchItem={listItem}/>
          </li>
        )}
      </ul>
    </>
  )

  function showActorList() {
    console.log(actors);
  }

}

