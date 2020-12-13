import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import SearchItem from "./SearchItem";
import SearchContext from "../../tech/context/SearchContext";


export default function SearchList() {
  const { searchItems } = useContext(SearchContext);

  return(
    <>
      <StyledList>
        {searchItems?.map((searchItem) =>
          <li key={searchItem.id}>
            <SearchItem searchItem={searchItem}/>
          </li>
        )}
      </StyledList>
    </>
  )
}

const StyledList = styled.ul`
  overflow: scroll;
  margin: 0;
  padding-top: 10px;
  padding-left: 0px;
  list-style: none;

  display: grid;
  grid-auto-rows: min-content;
  gap: var(--size-xxl);

  li:last-child:after {
    content: '';
    display: block;
    height: 28px;
  }
`;