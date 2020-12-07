import {useEffect, useState} from "react";


export default function useAudio() {
  const [error, setError] = useState("")

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line
  },[])

  function onRefresh() {
    const currentPath = window.location.pathname.split("/");
    setError(currentPath[2])
  }

  return [error];
}