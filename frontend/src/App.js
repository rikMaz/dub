import React from "react";
import styled from "styled-components/macro";
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from "./homePage/HomePage";
import SearchContextProvider from "./context/SearchContextProvider";
import SearchPage from "./searchPage/SearchPage";
import MoviePage from "./detailsPage/MoviePage";
import ActorPage from "./detailsPage/ActorPage";
import PreviewPage from "./previewPage/PreviewPage";
import VoiceActorPage from "./detailsPage/VoiceActorPage";
import Camera from "./camera/Camera";

function App() {
  return (
    <SearchContextProvider>
      <AppStyled>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route path="/search" component={SearchPage}/>
          <Route path="/details/movie" component={MoviePage}/>
          <Route path="/details/actor" component={ActorPage}/>
          <Route path="/details/voiceactor" component={VoiceActorPage}/>
          <Route path="/previewpage" component={PreviewPage}/>
          <Route path="/camera" component={Camera}/>
          <Route path="/">
            <Redirect to="/home"/>
          </Route>
        </Switch>
      </AppStyled>
    </SearchContextProvider>
  );
}

export default App;

const AppStyled = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  height: 100vh;
  background-size: cover;
  background-color: #0A0F0D;
  overflow: scroll;
`;