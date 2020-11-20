import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from "./homePage/HomePage";
import SetSearchTypePage from "./setSearchTypePage/SetSearchTypePage";
import SearchContextProvider from "./context/SearchContextProvider";
import SearchPage from "./searchPage/SearchPage";
import MovieDetailsPage from "./detailsPage/MovieDetailsPage";
import ActorDetailsPage from "./detailsPage/ActorDetailsPage";

function App() {
  return (
    <SearchContextProvider>
      <Switch>
        <Route path="/homepage" component={HomePage}/>
        <Route path="/searchpage" component={SetSearchTypePage}/>
        <Route path="/searchresultpage" component={SearchPage}/>
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
