import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';


export default function SearchItem({searchItem}){
  const history = useHistory();

  return(
      <SearchItemWrapper>

        {searchItem.type === "actor" &&
        <>
          {searchItem.character === null ?

              <NameStyled>{searchItem.name}</NameStyled>

              :

              <ActorNamesStyled>
                <ActorNameStyled>{searchItem.name}</ActorNameStyled>
                <ActorCharacterStyled>{searchItem.character}</ActorCharacterStyled>
              </ActorNamesStyled>
          }
        </>
        }

        {searchItem.type === "voiceactor" &&
        <NameStyled>{searchItem.name}</NameStyled>
        }

        <ImgStyled alt="SearchItemImage" src={searchItem.image} onClick={() => history.push(`/details/${searchItem.type}/${searchItem.id}`)} onError={noImage} height="525px" width="350px" />
      </SearchItemWrapper>
  )

  function noImage(event){
    event.target.src = "/imageerror.png";
  }

}

const SearchItemWrapper = styled.div`
  position: relative;
`;

const ImgStyled = styled.img`
  border-radius: 10px;
`;

const NameStyled = styled.div`
  font-size: 16px;
  padding: 9px;
  background: white;
  border-radius: var(--border-round);
  position: absolute;
  top: 475px;
  left: 10px;
`;

const ActorNamesStyled = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  align-content: center;
  justify-content: center;
  position: absolute;
  top: 475px;
  left: 10px;
`;

const ActorNameStyled = styled.div`
  font-size: 0.8em;
  padding: 9px;
  background: white;
  border-bottom-left-radius: var(--border-round);
  border-top-left-radius: var(--border-round);
  white-space: nowrap;

`;

const ActorCharacterStyled = styled.div`
  font-size: 0.8em;
  padding: 9px;
  background: #333;
  color: white;
  border-bottom-right-radius: var(--border-round);
  border-top-right-radius: var(--border-round);
  white-space: nowrap;
`;
