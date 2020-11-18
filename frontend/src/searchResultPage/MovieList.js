import React from "react";
import { useHistory } from 'react-router-dom';
import SearchContext from "../context/SearchContext";


export default function MovieList() {
  const {movies} = useContext(SearchContext);
  const history = useHistory();

  return(
    <ul>


    </ul>
  )
}