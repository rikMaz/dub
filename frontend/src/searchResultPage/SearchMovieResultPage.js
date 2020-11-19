import React from "react";
import { useHistory } from 'react-router-dom';
import MovieList from "./MovieList";

export default function SearchMovieResultPage() {
  const history = useHistory();
  return (
    <>
      <div>SearchResultPage</div>
      <button onClick={onCancel}>Cancel</button>
      <MovieList/>
    </>
  )

  function onCancel() {
    history.goBack();
  }
}