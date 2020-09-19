import { combineReducers } from "redux";
import { reducer as reduxSagaThunkReducer } from "redux-saga-thunk";
import { AuthState, authReducer } from "./auth/AuthReducer";
import { UserState, userReducer } from "./user/UserReducer";
import { ErrorState, errorReducer } from "./error/ErrorReducer";
import { MapboxState, mapboxReducer } from "./mapbox/MapboxReducer";

export const rootReducer = () =>
  combineReducers({
    thunk: reduxSagaThunkReducer,
    auth: authReducer,
    user: userReducer,
    error: errorReducer,
    mapbox: mapboxReducer,
  });

export interface AppState {
  auth: AuthState;
  user: UserState;
  error: ErrorState;
  mapbox: MapboxState;
}
