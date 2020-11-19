import React, { useState,useEffect,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchContext from "../context/SearchContext";


export default function Movie({actor}){
  const [imageUrl,setImageUrl] = useState("");
  const imageUrlBasis = "https://image.tmdb.org/t/p/w154/";
  const history = useHistory();
  const {getActorById} = useContext(SearchContext);

  useEffect(() => {
    setImageUrl(imageUrlBasis + actor.poster_path);
  },[actor]);

  return(
    <>
      <div>{movie.name}</div>
      <img alt="MovieImage" src={imageUrl} onClick={onImageClick} onError={noImage} height="231px" width="154px" />
    </>
  )

  function noImage(event){
    event.target.src = "/imageerror.png";
  }

  function onImageClick() {
    getMovieById(movie.id).then(history.push("/moviedetailspage"));
  }

}