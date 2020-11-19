import React, { useContext } from 'react';
import SearchContext from "../context/SearchContext";
import SearchItem from "../commons/SearchItem";


export default function SearchList() {
  const { searchItem } = useContext(SearchContext);

  return(
    <>
      <div>MovieList</div>
      <ul>
        {movies?.map((movie) =>
          <li key={movie.id}>
            <SearchItem movie={movie}/>
          </li>
        )}
      </ul>
    </>
  )
}
