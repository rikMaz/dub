import React from 'react';
import {useHistory} from "react-router-dom";
import useActor from "../hooks/useActor";
import SearchItem from "../searchPage/SearchItem";
import styled from 'styled-components/macro';

export default function ActorPage() {
  const history = useHistory();
  const [actor] = useActor();


  return (
    <>
      <HeaderStyled>
        <NameStyled>{actor?.name}</NameStyled>
      </HeaderStyled>

      <MainStyled>

        <DivWrapper>
          <ImgStyled alt="actorImage" src={actor?.image} height="525px" width="350px"/>

          {actor?.voiceActors.length > 0 &&
          <div>
              <ImgVoiceActorStyled alt="VoiceActorImage" src={actor?.voiceActors[0].image} onClick={onImageClick} height="160px" width="114px"/>
              <NameVoiceActorStyled>Voice Actor</NameVoiceActorStyled>
          </div>
          }

        </DivWrapper>

          <InfosStyled>

            <ListStyled>

              <ListItemStyled>
                <LabelStyled>Birthday:</LabelStyled>
                <div>{actor?.birthday}</div>
              </ListItemStyled>

              <ListItemStyled>
                <LabelStyled>Place of Birth:</LabelStyled>
                <div>{actor?.placeOfBirth}</div>
              </ListItemStyled>

              <ListItemStyled>
                <LabelStyled>Biography:</LabelStyled>
                <div>{actor?.biography}</div>
              </ListItemStyled>

            </ListStyled>
          </InfosStyled>


          <ListStyled>
            {actor?.movies.map((listItem) =>
              <li key={listItem.id}>
                <SearchItem searchItem={listItem}/>
              </li>
            )}
          </ListStyled>

      </MainStyled>

    </>
  )

  function onImageClick() {
    history.push(`/details/voiceactor/${actor?.voiceActors[0].id}`);
  }

}

const HeaderStyled = styled.div`
  display: grid;
  justify-items: center;
  align-items: end;
  padding-top: 20px;
`;

const NameStyled = styled.div`
  font-size: 1.4em;
  padding-top: 20px;
  color: white;
`;

const ImgStyled = styled.img`
  border-radius: 10px;
`;

const ImgVoiceActorStyled = styled.img`
  border: 2px solid white;
  border-radius: 10px;
  position: absolute;
  top: 395px;
  left: 225px;
`;

const MainStyled = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  justify-items: center;
  align-items: center;
`;

const DivWrapper = styled.div`
  padding-top: 40px;
  position: relative;
`;


const InfosStyled = styled.div`
color: white;
`;

const LabelStyled = styled.div`
font-size: 1em;
font-weight: bold;
`;

const ListStyled = styled.ul`
padding: 5px;
list-style: none;
`;

const ListItemStyled = styled.li`
padding: 10px;
`;

const NameVoiceActorStyled = styled.div`
  font-size: 0.5em;
  padding: 5px 36px 5px 36px;
  background: white;
  border-radius: 0px 0px 5px 5px;
  position: absolute;
  top: 535px;
  left: 225px;
  white-space: nowrap;
`;