import {useEffect, useState} from "react";
import {getMovieDetailsById} from "../service/SearchService";


export default function useMovie() {
  const [movie, setMovie] = useState()

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line
  },[])

  function onRefresh() {
    const currentPath = window.location.pathname.split("/");
    const previousSearch = currentPath[3].replace("%20", " ");
    getMovieDetailsById(previousSearch).then((item) => setMovie(item));
  }

  return [movie];
}
