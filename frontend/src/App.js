import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from "./homePage/HomePage";
import SearchContextProvider from "./context/SearchContextProvider";
import SearchPage from "./searchPage/SearchPage";
import MovieDetailsPage from "./detailsPage/MovieDetailsPage";
import ActorDetailsPage from "./detailsPage/ActorDetailsPage";
import PreviewPage from "./previewPage/PreviewPage";
import VoiceActorDetailsPage from "./detailsPage/VoiceActorDetailsPage";

function App() {
  return (
    <SearchContextProvider>
      <Switch>
        <Route path="/home" component={HomePage}/>
        <Route path="/search" component={SearchPage}/>
        <Route path="/details/movie" component={MovieDetailsPage}/>
        <Route path="/details/actor" component={ActorDetailsPage}/>
        <Route path="/details/voiceactor" component={VoiceActorDetailsPage}/>
        <Route path="/previewpage" component={PreviewPage}/>
        <Route path="/">
          <Redirect to="/home"/>
        </Route>
      </Switch>
    </SearchContextProvider>
  );
}

export default App;
