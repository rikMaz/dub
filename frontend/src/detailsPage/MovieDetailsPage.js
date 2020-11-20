import React, {useContext} from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";

export default function MovieDetailsPage() {
  const history = useHistory();
  const {movie,getMovieCrewByMovieId} = useContext(SearchContext);

  return (
    <>
      <div>{movie?.name}</div>
      <img alt="MovieImage" src={"https://image.tmdb.org/t/p/w154/"+movie?.image}/>
      <button onClick={getMovieCrew}>Crew</button>
      <button onClick={onCancel}>Cancel</button>
    </>
  )

  function onCancel() {
    history.goBack();
  }

  function getMovieCrew() {
    getMovieCrewByMovieId(movie.id).then(() => history.push("/searchresultpage"))
  }

}
