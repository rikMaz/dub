import React from 'react';
import SearchItem from "../searchPage/SearchItem";
import useVoiceActor from "../hooks/useVoiceActor";
import styled from 'styled-components/macro';

export default function VoiceActorPage() {
  const [voiceActor] = useVoiceActor();

  return (
    <>

      <HeaderStyled>
        <NameStyled>{voiceActor?.name}</NameStyled>
      </HeaderStyled>

      <MainStyled>
        <MainImageStyled>

          <DivWrapper>
            <ImgStyled alt="ActorImage" src={voiceActor?.image} height="525px" width="350px"/>
          </DivWrapper>

        </MainImageStyled>

        <InfosStyled>

          <ListStyled>

            <ListItemStyled>
              <LabelStyled>Birthday:</LabelStyled>
              <div>{voiceActor?.birthday}</div>
            </ListItemStyled>

          </ListStyled>

        </InfosStyled>

        <ListStyled>
          {voiceActor?.actors.map((listItem) =>
            <li key={listItem.id}>
              <SearchItem searchItem={listItem}/>
            </li>
          )}
        </ListStyled>

      </MainStyled>
    </>
  )
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

const MainStyled = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
`;

const MainImageStyled = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;


const DivWrapper = styled.div`
  padding-top: 40px;
  position: relative;
`;

const InfosStyled = styled.div`
  color: white;
  display: grid;
  justify-items: start;
  align-items: center;
`;

const LabelStyled = styled.div`
font-size: 1em;
font-weight: bold;
`;

const ListStyled = styled.ul`
  display: grid;
  justify-items: center;
  align-items: center;
  padding: 5px;
  list-style: none;
`;

const ListItemStyled = styled.li`
padding: 10px;
`;
