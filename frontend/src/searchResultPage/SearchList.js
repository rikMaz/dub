import React, { useContext } from 'react';
import SearchContext from "../context/SearchContext";
import SearchItem from "../commons/SearchItem";


export default function SearchList() {
  const { searchItems } = useContext(SearchContext);

  return(
    <>
      <div>SearchList</div>
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
