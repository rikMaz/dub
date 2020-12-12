import {useContext, useEffect, useState} from "react";
import {getVoiceActorById} from "../service/SearchService";
import UserContext from "../context/UserContext";


export default function useVoiceActor() {
 const [voiceActor, setVoiceActor] = useState();
 const { token } = useContext(UserContext);

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line
  },[])

  function onRefresh() {
    const currentPath = window.location.pathname.split("/");
    const previousSearch = currentPath[3].replace("%20", " ");
    getVoiceActorById(previousSearch,token).then((item) => setVoiceActor(item));
  }

 return [voiceActor];
}
