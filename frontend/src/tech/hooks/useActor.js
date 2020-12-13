import {useContext, useEffect, useState} from "react";
import {getActorById} from "../service/SearchService";
import UserContext from "../context/UserContext";


export default function useActor() {
  const [actor, setActor] = useState()
  const { token } = useContext(UserContext);

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line
  },[])

  function onRefresh() {
    const currentPath = window.location.pathname.split("/");
    const previousSearch = currentPath[3].replace("%20", " ");
    getActorById(previousSearch,token).then((item) => setActor(item));
  }

  return [actor];
}