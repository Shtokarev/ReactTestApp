import React from "react";
import { Route, Switch } from "react-router";
import PrivateRoute from "./PrivateRoute";
import { routes } from "./routes";
import Home from "../pages/home/Home";
import Map from "../pages/map/Map";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import Upload from "../pages/upload/Upload";

export const routing = (
  <Switch>
    <Route exact path={routes.login()} component={LoginPage} />
    <Route exact path={routes.signup()} component={SignupPage} />

    <PrivateRoute exact path={routes.home()} component={Home} />
    <PrivateRoute exact path={routes.map()} component={Map} />
    <PrivateRoute exact path={routes.upload()} component={Upload} />

    <Route component={LoginPage} />
  </Switch>
);
