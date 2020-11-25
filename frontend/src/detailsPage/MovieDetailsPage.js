import React, {useContext, useEffect} from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";

export default function MovieDetailsPage() {
  const history = useHistory();
  const {name,setName,movie,searchItems,lastSearch,getMoviesByName,getMovieCrewByMovieId,setSearchType,getMovieById} = useContext(SearchContext);

  useEffect(() => {
    onRefresh();
  },[])

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
    setSearchType("crew")
    setName(movie.name)
    getMovieCrewByMovieId(movie.id).then(() => history.push(`/search/crew/${movie.name}/${movie.id}`))
  }

  function onRefresh() {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      console.info("This page is reloaded");
      let currentPath = window.location.pathname.split("/")
      getMovieById(currentPath[2]);
    }
  }

}
