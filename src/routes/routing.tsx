import React from "react";
import { Route, Switch } from "react-router";
import PrivateRoute from "./PrivateRoute";
import { routes } from "./routes";
import Home from "../pages/home/Home";
import MapPage from "../pages/map/MapPage";
import MapUploadPage from "../pages/map/MapUploadPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";

export const routing = (
  <Switch>
    <Route exact path={routes.login()}>
      <LoginPage />
    </Route>

    <Route exact path={routes.signup()}>
      <SignupPage />
    </Route>

    <PrivateRoute exact path={routes.home()} component={Home} />
    <PrivateRoute exact path={routes.map()} component={MapPage} />
    <PrivateRoute exact path={routes.upload()} component={MapUploadPage} />

    <Route component={LoginPage} />
  </Switch>
);
