import React, {useContext} from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";
import useMovie from "../hooks/useMovie";

export default function MoviePage() {
  const history = useHistory();
  const [movie] = useMovie();
  const {setName,getMovieCrew,setSearchType} = useContext(SearchContext);

  return (
    <>
      <div>{movie?.name}</div>
      <img alt="MovieImage" src={movie?.image}/>
      <button onClick={getCrew}>Crew</button>
      <button onClick={onCancel}>Cancel</button>
      <label>Release Date<p>{movie?.releaseDate}</p></label>
      <label>Original Language<p>{movie?.originalLanguage}</p></label>
      <label>Runtime<p>{movie?.runtime}</p></label>
      <label>Budget<p>{movie?.budget}</p></label>
      <label>Revenue<p>{movie?.revenue}</p></label>
      <label>Overview<p>{movie?.overview}</p></label>
    </>
  )

  function onCancel() {
    history.goBack();
  }

  function getCrew() {
    setSearchType("crew")
    setName(movie.name)
    getMovieCrew(movie.id).then(() => history.push(`/search/crew/${movie.name}/${movie.id}`))
  }


}
