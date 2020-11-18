import React, { useState,useEffect } from 'react';


export default function Movie({movie}){
  const [imageUrl,setImageUrl] = useState("");
  const imageUrlBasis = "https://image.tmdb.org/t/p/w154/"

  useEffect(() => {
    setImageUrl(imageUrlBasis + movie.poster_path);
  },[movie]);

  return(
    <>
      <div>{movie.title}</div>
      <img alt="MovieImage" src={imageUrl}/>
    </>
  )
}