import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchContext from "../context/SearchContext";
import styled from 'styled-components/macro';


export default function SearchItem({searchItem}){
  const history = useHistory();
  const {searchType} = useContext(SearchContext);

  if(searchType === "crew"){
    return(
      <>
        <div>{searchItem.name}</div>
        <div>{searchItem.character}</div>
        <img alt="SearchItemImage" src={searchItem.image} onClick={onImageClick} onError={noImage} height="231px" width="154px" />
      </>
    )
  }

  return(
    <div>
      <ImgStyled alt="SearchItemImage" src={searchItem.image} onClick={onImageClick} onError={noImage} height="525px" width="350px" />
    </div>
  )


  function noImage(event){
    event.target.src = "/imageerror.png";
  }

  function onImageClick() {

    switch (searchItem.type) {

      case "movie":
        history.push(`/details/${searchItem.type}/${searchItem.id}`);
        break;

      case "actor":
        history.push(`/details/${searchItem.type}/${searchItem.id}`);
        break;

      case "voiceactor":
        history.push(`/details/${searchItem.type}/${searchItem.id}`);
        break;

      default:
        break;
    }

  }


}

const ImgStyled = styled.img`
  border-radius: 10px;
`;