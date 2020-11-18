import React from "react";
import { Route, Switch } from 'react-router-dom';
import HomePage from "./homePage/HomePage";

function App() {
  return (
    <>
      <Switch>
        <Route path="/homepage" component={HomePage}/>
      </Switch>
    </>
  );
}

export default App;
