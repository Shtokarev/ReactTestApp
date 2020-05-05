import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import { connect } from "react-redux";

import { AuthState, AppState, ErrorState } from "./stores";
import { routing } from "./routes";
import { AppLoader } from "./components/AppLoader/AppLoader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

interface AppProps {
  history: History;
  auth: AuthState;
  error: ErrorState;
}

class App extends React.PureComponent<AppProps> {
  render() {
    const {
      auth: { loading },
      history,
      error,
    } = this.props;

    return (
      <ConnectedRouter history={history}>
        {routing}
        <ErrorMessage error={error.toastify} />
        {loading && <AppLoader />}
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps)(App);
