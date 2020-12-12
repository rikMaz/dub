import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import UserContextProvider from "./tech/context/UserContextProvider";
import SearchContextProvider from "./tech/context/SearchContextProvider";
import ProtectedRoute from "./tech/routing/ProtectedRoute";
import LoginPage from "./pages/loginPage/LoginPage";
import HomePage from "./pages/homePage/HomePage";
import SearchPage from "./pages/searchPage/SearchPage";
import MoviePage from "./pages/detailsPage/MoviePage";
import ActorPage from "./pages/detailsPage/ActorPage";
import VoiceActorPage from "./pages/detailsPage/VoiceActorPage";
import ImagePreview from "./pages/previewPage/ImagePreview";
import AudioPreview from "./pages/previewPage/AudioPreview";
import CameraPage from "./pages/cameraPage/CameraPage";


function App() {
  return (
    <UserContextProvider>
      <SearchContextProvider>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <ProtectedRoute path="/home" component={HomePage}/>
            <ProtectedRoute path="/search" component={SearchPage}/>
            <ProtectedRoute path="/details/movie/:id" component={MoviePage}/>
            <ProtectedRoute path="/details/actor/:id" component={ActorPage}/>
            <ProtectedRoute path="/details/voiceactor/:id" component={VoiceActorPage}/>
            <ProtectedRoute path="/image" component={ImagePreview}/>
            <ProtectedRoute path="/audio" component={AudioPreview}/>
            <ProtectedRoute path="/camera" component={CameraPage}/>
            <Route path="/">
              <Redirect to="/home"/>
            </Route>
          </Switch>
      </SearchContextProvider>
    </UserContextProvider>
  );
}

export default App;