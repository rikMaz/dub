import React, { useContext } from 'react';
import SearchContext from "../context/SearchContext";
import SearchItem from "./SearchItem";


export default function SearchList() {
  const { searchItems } = useContext(SearchContext);

  return(
    <>
      <ul>
        {searchItems?.map((searchItem) =>
          <li key={searchItem.id}>
            <SearchItem searchItem={searchItem}/>
          </li>
        )}
      </ul>
    </>
  )
}
