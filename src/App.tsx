import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthState, AppState, ErrorState } from "store";
import { routing } from "routes";

import { AppLoader } from "components/AppLoader/AppLoader";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";

interface AppProps {
  auth: AuthState;
  error: ErrorState;
}

class App extends React.PureComponent<AppProps> {
  render() {
    const {
      auth: { loading },
      error,
    } = this.props;

    return (
      <Router>
        {routing}
        <ErrorMessage error={error.toastify} />
        {loading && <AppLoader />}
      </Router>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps)(App);
