import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";

function Home() {
  return (
    <div>
      <Switch>
        <Route exact path="/" render={(props) => <Login {...props} />} />
        <Route path="/moh" render={(props) => <App {...props} />} />
        <Redirect from="/" to="/auth" />
      </Switch>
    </div>
  );
}

export default Home;
