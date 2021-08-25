import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { errorNotify } from "./helpers/notify";
import { getAuthToken, getProfile } from "./services/authService";
import Header from "./layout/Header";
import Sidenav from "./layout/Sidenav";
import Aside from "./layout/Aside";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Logout from "./pages/Logout";
import TracePage from "./pages/TracePage";

function App() {
  const [profile, setUserProfile] = useState({});

  const getUserProfile = async () => {
    try {
      const { data } = await getProfile(getAuthToken());
      setUserProfile(data);
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        errorNotify("An unexpected error occurred. Please try again later.");
        window.location = "/";
      }
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <Header profile={profile} />
        </div>
        <div className="col-md-2">
          <Sidenav />
        </div>
        <div className="col-md-8">
          <Switch>
            <Route
              exact
              path="/moh/dashboard"
              render={(props) => <Dashboard profile={profile} {...props} />}
            />
            <Route
              path="/moh/reports"
              render={(props) => <Reports profile={profile} {...props} />}
            />
            <Route
              path="/moh/trace"
              render={(props) => <TracePage profile={profile} {...props} />}
            />
            <Route path="/moh/logout" render={() => <Logout />} />
            <Redirect from="/moh" to="/moh/dashboard" />
          </Switch>
        </div>
        <div className="col-md-2">
          <Aside />
        </div>
      </div>
    </div>
  );
}

export default App;
