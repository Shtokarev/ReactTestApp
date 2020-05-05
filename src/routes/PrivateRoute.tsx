import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { connect } from "react-redux";

import { AppState, AuthState } from "../stores";
import { routes } from "./routes";
import { AccountsType } from "../stores";

type RouteFor = "authenticated" | AccountsType;

interface PrivateRouteOwnProps {
  component?: any;
  routeFor?: RouteFor;
}

interface PrivateRouteStoreProps {
  auth: AuthState;
}

type PrivateRouteProps = RouteProps &
  PrivateRouteOwnProps &
  PrivateRouteStoreProps;

class PrivateRoute<
  T extends PrivateRouteProps = PrivateRouteProps
> extends React.Component<T, any> {
  render() {
    const {
      auth,
      routeFor = "authenticated",
      component: Component,
      ...rest
    } = this.props;

    return (
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
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
