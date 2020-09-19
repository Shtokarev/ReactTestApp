import { UserAction } from "./UserAction";
import { UserProfile } from "./UserTypes";

export interface UserState {
  profile: UserProfile | null;
}

const initialState: UserState = {
  profile: null,
};

export function userReducer(
  state: UserState = initialState,
  action: UserAction
): UserState {
  switch (action.type) {
    case "SET_USER_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };

    case "CLEAR_USER_PROFILE":
      return {
        ...state,
        profile: null,
      };

    default:
      return state;
  }
}
