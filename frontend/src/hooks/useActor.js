import {useEffect, useState} from "react";
import {getActorById} from "../service/SearchService";


export default function useActor() {
  const [actor, setActor] = useState()

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line
  },[])

  function onRefresh() {
    const currentPath = window.location.pathname.split("/");
    const previousSearch = currentPath[3].replace("%20", " ");
    getActorById(previousSearch).then((item) => setActor(item));
  }

  return [actor];
}