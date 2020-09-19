import createSagaMiddleware from "redux-saga";
import { applyMiddleware, compose, createStore } from "redux";
import { middleware as reduxSagaThunkMiddleware } from "redux-saga-thunk";

import { rootReducer, rootSaga } from "store";
import { setDispatchHook } from "services/api";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer: typeof compose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = (persistedState: any) => {
  const store = createStore(
    rootReducer(),
    persistedState,
    composeEnhancer(applyMiddleware(reduxSagaThunkMiddleware, sagaMiddleware))
  );

  setDispatchHook(store.dispatch);
  sagaMiddleware.run(rootSaga);

  return store;
};
