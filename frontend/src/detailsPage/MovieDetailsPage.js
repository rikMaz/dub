import React, {useContext} from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";

export default function MovieDetailsPage() {
  const history = useHistory();
  const {movie,searchItems,lastSearch,getMoviesByName,getMovieCrewByMovieId,setSearchType} = useContext(SearchContext);

  return (
    <>
      <div>{movie?.name}</div>
      <img alt="MovieImage" src={"https://image.tmdb.org/t/p/w154/"+movie?.image}/>
      <button onClick={getMovieCrew}>Crew</button>
      <button onClick={onCancel}>Cancel</button>
    </>
  )

  function onCancel() {
    if(searchItems.length === 0) {
      getMoviesByName(lastSearch);
    }
    setSearchType("movie")
    history.goBack();
  }

  function getMovieCrew() {
    setSearchType("crew")
    getMovieCrewByMovieId(movie.id).then(() => history.push("/searchpage"))
  }

}
