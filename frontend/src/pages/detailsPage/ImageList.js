import React from "react";
import styled from "styled-components/macro";
import SearchItem from "../searchPage/SearchItem";

export default function ImageList({item,type}) {

  return (
    <ComponentLayout>

      {type === "actor" &&
      <TitleStyled>Speaking roles:</TitleStyled>
      }
      <ListStyled>
        {item?.map((listItem) =>
          <li key={listItem.id}>
            <SearchItem searchItem={listItem}/>
          </li>
        )}
      </ListStyled>

    </ComponentLayout>
  )

}

const ComponentLayout = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  padding: 5px;
  list-style: none;
  gap: var(--size-xxl);
`;

const ListStyled = styled.div`
  display: grid;
  justify-content: center;
`;

const TitleStyled = styled.div`
  color: white;
  font-size: 1em;
  font-weight: bold;
  padding-left: 10px;
`;
