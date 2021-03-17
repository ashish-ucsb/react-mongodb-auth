import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "react-auth-kit";

import HomeComponent from "./HomeComponent";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";

export class RouteComponent extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={HomeComponent}
            loginPath="/login"
          ></PrivateRoute>
          <Route exact path="/login" component={LoginComponent}></Route>
          <Route exact path="/register" component={RegisterComponent}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RouteComponent;
