import { combineReducers } from 'redux';
import { History } from 'history';
import { RouterState, connectRouter } from 'connected-react-router';
import { reducer as reduxSagaThunkReducer } from 'redux-saga-thunk';
import { AuthState, authReducer } from './auth/AuthReducer';
import { UserState, userReducer } from './user/UserReducer';
import { ErrorState, errorReducer } from './error/ErrorReducer';
import { MapboxState, mapboxReducer } from './mapbox/MapboxReducer';

const rootReducer = (history: History) =>
  combineReducers({
    thunk: reduxSagaThunkReducer,
    router: connectRouter(history),
    auth: authReducer,
    user: userReducer,
    error: errorReducer,
    mapbox: mapboxReducer,
  });

export interface AppState {
  router: RouterState;
  auth: AuthState;
  user: UserState;
  error: ErrorState;
  mapbox: MapboxState;
}

export default rootReducer;