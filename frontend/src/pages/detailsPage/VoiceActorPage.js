import React from 'react';
import styled from 'styled-components/macro';
import useVoiceActor from "../../tech/hooks/useVoiceActor";
import HeaderDetailsPage from "./HeaderDetailsPage";
import InfoList from "./InfoList";
import ImageList from "./ImageList";


export default function VoiceActorPage() {
  const [voiceActor] = useVoiceActor();

  return (
    <PageLayout>

      <HeaderDetailsPage item={voiceActor}/>

      <MainStyled>

        <MainImageStyled>
          <ImgStyled alt="ActorImage" src={voiceActor?.image} height="525px" width="350px"/>
        </MainImageStyled>

        <InfoList item={voiceActor}/>

        <ImageList item={voiceActor?.actors} type={voiceActor?.actors[0].type}/>

      </MainStyled>
    </PageLayout>
  )

}

const PageLayout = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  height: 100vh;
`;

const MainStyled = styled.div`
  display: grid;
  grid-template-rows: min-content min-content 1fr;
`;

const ImgStyled = styled.img`
  border-radius: 10px;
`;

const MainImageStyled = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;
