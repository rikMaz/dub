import {useEffect, useState} from "react";
import {getMovieById} from "../service/SearchService";


export default function useMovie() {
  const [movie, setMovie] = useState()

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line
  },[])

  function onRefresh() {
    const currentPath = window.location.pathname.split("/");
    const previousSearch = currentPath[3].replace("%20", " ");
    getMovieById(previousSearch).then((item) => setMovie(item));
  }

  return [movie];
}
