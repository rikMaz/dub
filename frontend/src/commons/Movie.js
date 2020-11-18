import React, { useState,useEffect,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchContext from "../context/SearchContext";


export default function Movie({movie}){
  const [imageUrl,setImageUrl] = useState("");
  const imageUrlBasis = "https://image.tmdb.org/t/p/w154/"
  const history = useHistory();
  const {getMovieById} = useContext(SearchContext);

  useEffect(() => {
    setImageUrl(imageUrlBasis + movie.poster_path);
  },[movie]);

  return(
    <>
      <div>{movie.title}</div>
      <img alt="MovieImage" src={imageUrl} onClick={onImageClick}/>
    </>
  )

  function onImageClick() {
    getMovieById(movie.id);
    history.push("/moviedetailspage");
  }

}