import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { connect } from "react-redux";

import { AppState, AuthState } from "../stores";
import { routes } from "./routes";
import { AccountsType } from "../stores";

type RouteFor = "authenticated" | AccountsType;

interface PrivateRouteOwnProps {
  component?: React.ComponentType<any>; // new (props: any) => any; // React.Component<any, any>;
  routeFor?: RouteFor;
}

interface PrivateRouteStoreProps {
  auth: AuthState;
}

type PrivateRouteProps = RouteProps &
  PrivateRouteOwnProps &
  PrivateRouteStoreProps;

const PrivateRoute: React.FC<PrivateRouteProps> =
  // T extends PrivateRouteProps // = PrivateRouteProps
  // > extends React.Component<T, any> {
  ({ auth, routeFor = "authenticated", component: Component, ...rest }) => (
    <Route
      {...rest}
      render={
        (props) => <Component {...props} />
        // !auth.authenticated ? (
        //   <Redirect to={routes.login()} />
        // ) : routeFor === "authenticated" ? (
        //   React.createElement(Component, props)
        // ) : (routeFor === "user" && auth.role === "user") ||
        //   (routeFor === "admin" && auth.role === "admin") ? (
        //   <Component {...props} />
        // ) : (
        //   <Redirect to={routes.restricted()} />
        // )
      }
    />
  );

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
