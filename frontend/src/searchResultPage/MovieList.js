import React, { useContext } from 'react';
import SearchContext from "../context/SearchContext";
import Movie from "../commons/Movie";


export default function MovieList() {
  const { movies } = useContext(SearchContext);

  return(
    <>
      <div>MovieList</div>
      <ul>
        {movies?.map((movie) =>
          <li key={movie.id}>
            <Movie movie={movie}/>

          </li>
        )}
      </ul>
    </>
  )
}