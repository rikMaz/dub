import React from "react";
import styled from "styled-components/macro";
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from "./homePage/HomePage";
import SearchContextProvider from "./context/SearchContextProvider";
import SearchPage from "./searchPage/SearchPage";
import MoviePage from "./detailsPage/MoviePage";
import ActorPage from "./detailsPage/ActorPage";
import ImagePreview from "./previewPage/ImagePreview";
import VoiceActorPage from "./detailsPage/VoiceActorPage";
import Camera from "./camera/Camera";

function App() {
  return (
    <SearchContextProvider>
      <AppStyled>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <SearchPageStyled>
            <Route path="/search" component={SearchPage}/>
          </SearchPageStyled>
          <Route path="/details/movie" component={MoviePage}/>
          <Route path="/details/actor" component={ActorPage}/>
          <Route path="/details/voiceactor" component={VoiceActorPage}/>
          <Route path="/image" component={ImagePreview}/>
          <Route path="/audio" component={ImagePreview}/>
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
  background-color: #333;
  overflow: scroll;
`;

const SearchPageStyled = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  height: 100vh;
  background-size: cover;
  background-color: #333;
  overflow: scroll;
`;