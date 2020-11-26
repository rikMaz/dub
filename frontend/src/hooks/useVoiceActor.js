import React, {useEffect, useState} from "react";
import {getVoiceActorDetailsById} from "../service/SearchService";


export default function useVoiceActor() {
 const [voiceActor, setVoiceActor] = useState()

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line
  },[])

  function onRefresh() {
    const currentPath = window.location.pathname.split("/");
    const previousSearch = currentPath[3].replace("%20", " ");
    getVoiceActorDetailsById(previousSearch).then((item) => setVoiceActor(item));
  }

 return [voiceActor];
}
