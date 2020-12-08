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
import AudioPreview from "./previewPage/AudioPreview";
import UserContextProvider from "./context/UserContextProvider";
import ProtectedRoute from './routing/ProtectedRoute';
import LoginPage from "./loginPage/LoginPage";

function App() {
  return (
    <UserContextProvider>
      <SearchContextProvider>
        <AppStyled>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <ProtectedRoute path="/home" component={HomePage}/>
            <ProtectedRoute path="/search" component={SearchPage}/>
            <ProtectedRoute path="/details/movie/:id" component={MoviePage}/>
            <ProtectedRoute path="/details/actor/:id" component={ActorPage}/>
            <ProtectedRoute path="/details/voiceactor/:id" component={VoiceActorPage}/>
            <ProtectedRoute path="/image" component={ImagePreview}/>
            <ProtectedRoute path="/audio" component={AudioPreview}/>
            <ProtectedRoute path="/camera" component={Camera}/>
            <Route path="/">
              <Redirect to="/home"/>
            </Route>
          </Switch>
        </AppStyled>
      </SearchContextProvider>
    </UserContextProvider>
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