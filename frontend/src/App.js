import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from "./homePage/HomePage";
import SearchPage from "./searchPage/SearchPage";
import SearchContextProvider from "./context/SearchContextProvider";
import SearchResultPage from "./searchResultPage/SearchResultPage";
import MovieDetailsPage from "./detailsPage/MovieDetailsPage";
import ActorDetailsPage from "./detailsPage/ActorDetailsPage";

function App() {
  return (
    <SearchContextProvider>
      <Switch>
        <Route path="/homepage" component={HomePage}/>
        <Route path="/searchpage" component={SearchPage}/>
        <Route path="/searchresultpage" component={SearchResultPage}/>
        <Route path="/moviedetailspage" component={MovieDetailsPage}/>
        <Route path="/actordetailspage" component={ActorDetailsPage}/>
        <Route path="/">
          <Redirect to="/homepage"/>
        </Route>
      </Switch>
    </SearchContextProvider>
  );
}

export default App;
