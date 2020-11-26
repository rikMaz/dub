import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from "./homePage/HomePage";
import SearchContextProvider from "./context/SearchContextProvider";
import SearchPage from "./searchPage/SearchPage";
import MoviePage from "./detailsPage/MoviePage";
import ActorPage from "./detailsPage/ActorPage";
import PreviewPage from "./previewPage/PreviewPage";
import VoiceActorPage from "./detailsPage/VoiceActorPage";

function App() {
  return (
    <SearchContextProvider>
      <Switch>
        <Route path="/home" component={HomePage}/>
        <Route path="/search" component={SearchPage}/>
        <Route path="/details/movie" component={MoviePage}/>
        <Route path="/details/actor" component={ActorPage}/>
        <Route path="/details/voiceactor" component={VoiceActorPage}/>
        <Route path="/previewpage" component={PreviewPage}/>
        <Route path="/">
          <Redirect to="/home"/>
        </Route>
      </Switch>
    </SearchContextProvider>
  );
}

export default App;
