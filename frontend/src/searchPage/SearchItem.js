import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';


export default function SearchItem({searchItem}){
  const history = useHistory();

  return(
    <div>
      <DivWrapper>

        {searchItem.type === "actor" &&
        <>
          {searchItem.character === null ?

              <NameStyled>{searchItem.name}</NameStyled>

              :

              <NameStyled>{searchItem.name}, {searchItem.character}</NameStyled>
          }
        </>
        }

        {searchItem.type === "voiceactor" &&
        <NameStyled>{searchItem.name}</NameStyled>
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