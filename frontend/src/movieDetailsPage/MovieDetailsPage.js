import React, {useContext, useEffect, useState} from 'react';
import SearchContext from "../context/SearchContext";
import {useHistory} from "react-router-dom";

export default function MovieDetailsPage() {
  const [imageUrl,setImageUrl] = useState("");
  const imageUrlBasis = "https://image.tmdb.org/t/p/w154/"
  const history = useHistory();
  const {movie} = useContext(SearchContext);

  useEffect(() => {
    setImageUrl(imageUrlBasis + movie?.poster_path);
  },[movie]);

  return (
    <>
      <div>{movie?.title}</div>
      <img alt="MovieImage" src={imageUrl}/>
      <button onClick={onCancel}>Cancel</button>
    </>
  )

  function onCancel() {
    history.goBack();
  }
}
