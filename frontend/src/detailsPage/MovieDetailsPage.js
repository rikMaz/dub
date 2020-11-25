import React, {useContext} from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";

export default function MovieDetailsPage() {
  const history = useHistory();
  const {movie,searchItems,lastSearch,getMoviesByName,getMovieCrewByMovieId,setSearchType} = useContext(SearchContext);

  return (
    <>
      <div>{movie?.name}</div>
      <img alt="MovieImage" src={movie?.image}/>
      <button onClick={getMovieCrew}>Crew</button>
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
    if(searchItems.length === 0) {
      getMoviesByName(lastSearch);
    }
    setSearchType("Movies and TV Series")
    history.goBack();
  }

  function getMovieCrew() {
    setSearchType("Crew")
    getMovieCrewByMovieId(movie.id).then(() => history.push("/searchpage"))
  }

}
