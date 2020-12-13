import {useContext, useEffect, useState} from "react";
import {getMovieById} from "../service/SearchService";
import UserContext from "../context/UserContext";


export default function useMovie() {
  const [movie, setMovie] = useState();
  const { token } = useContext(UserContext);

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line
  },[])

  function onRefresh() {
    const currentPath = window.location.pathname.split("/");
    const previousSearch = currentPath[3].replace("%20", " ");
    getMovieById(previousSearch,token).then((item) => setMovie(item));
  }

  return [movie];
}
