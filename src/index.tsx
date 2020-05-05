import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import { middleware as reduxSagaThunkMiddleware } from "redux-saga-thunk";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./stores/rootReducer";
import rootSaga from "./stores/rootSaga";
import { loadState } from "./utils/stateLocalStorage";
import { setBearerToken, setDispatchHook } from "./services/api";
import "./styles/index.scss";

const sagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

const composeEnhancer: typeof compose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

if (
  persistedState &&
  persistedState.auth &&
  persistedState.auth.authToken &&
  persistedState.auth.refreshToken
) {
  Object.assign(persistedState.auth, { loading: false });
  setBearerToken(
    persistedState.auth.authToken,
    persistedState.auth.refreshToken
  );
}

const store = createStore(
  rootReducer(history),
  persistedState,
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      reduxSagaThunkMiddleware,
      sagaMiddleware
    )
  )
);

setDispatchHook(store.dispatch);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App history={history} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
