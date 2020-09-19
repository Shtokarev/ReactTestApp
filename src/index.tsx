import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { setBearerToken } from "./services/api";
import { configureStore } from "store";
import { loadState } from "utils/stateLocalStorage";
import * as serviceWorker from "./serviceWorker";

import App from "./App";
import "./styles/index.scss";

const persistedState = loadState();

if (persistedState?.auth?.authToken && persistedState?.auth?.refreshToken) {
  Object.assign(persistedState.auth, { loading: false });

  setBearerToken(
    persistedState.auth.authToken,
    persistedState.auth.refreshToken
  );
}

const store = configureStore(persistedState);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
