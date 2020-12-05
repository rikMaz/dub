import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchContext from "../context/SearchContext";
import styled from 'styled-components/macro';


export default function SearchItem({searchItem}){
  const history = useHistory();
  const {searchType} = useContext(SearchContext);

  return(
    <div>
      <DivWrapper>
        {searchType === "crew" &&
          <NameStyled>{searchItem.name}, {searchItem.character}</NameStyled>
        }
        <ImgStyled alt="SearchItemImage" src={searchItem.image} onClick={() => history.push(`/details/${searchItem.type}/${searchItem.id}`)} onError={noImage} height="525px" width="350px" />
      </DivWrapper>
    </div>
  )

  function noImage(event){
    event.target.src = "/imageerror.png";
  }

}

const ImgStyled = styled.img`
  border-radius: 10px;
`;

const NameStyled = styled.div`
  font-size: 16px;
  padding: 9px;
  background: white;
  border-radius: 50px;
  position: absolute;
  top: 475px;
  left: 10px;
`;

const DivWrapper = styled.div`
  position: relative;
`;