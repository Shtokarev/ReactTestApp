import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { connect } from "react-redux";

import { AppState, AuthState, AccountsType } from "store";
import { routes } from "routes";

type RouteFor = "authenticated" | AccountsType;

interface PrivateRouteOwnProps {
  component: React.ElementType;
  routeFor?: RouteFor;
}

interface PrivateRouteStoreProps {
  auth: AuthState;
}

type PrivateRouteProps = RouteProps &
  PrivateRouteOwnProps &
  PrivateRouteStoreProps;

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  auth,
  routeFor = "authenticated",
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !auth.authenticated ? (
        <Redirect to={routes.login()} />
      ) : routeFor === "authenticated" ? (
        <Component {...props} />
      ) : (routeFor === "user" && auth.role === "user") ||
        (routeFor === "admin" && auth.role === "admin") ? (
        <Component {...props} />
      ) : (
        <Redirect to={routes.restricted()} />
      )
    }
  />
);

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
