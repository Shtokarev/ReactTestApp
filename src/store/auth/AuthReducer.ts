import { AuthAction } from "./AuthAction";
import { AccountsType } from "../user/UserTypes";

export interface AuthState {
  authenticated: boolean;
  authToken: string | null;
  refreshToken: string | null;
  role: AccountsType | null;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  authenticated: false,
  authToken: null,
  refreshToken: null,
  role: null,
  error: null,
  loading: false,
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case "AUTH_RESET":
      return {
        ...state,
        authenticated: false,
        authToken: null,
        refreshToken: null,
        role: null,
        error: null,
        loading: false,
      };

    case "AUTH_SET_LOADING":
      return {
        ...state,
        loading: action.payload.loading,
      };

    case "AUTH_REFRESH_TOKENS":
      return {
        ...state,
        authToken: action.payload.authToken,
        refreshToken: action.payload.refreshToken,
      };

    case "AUTH_SET":
      return {
        ...state,
        authenticated: true,
        authToken: action.payload.authToken,
        refreshToken: action.payload.refreshToken,
        role: action.payload.role,
        error: null,
      };

    case "AUTH_ERROR":
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
}
