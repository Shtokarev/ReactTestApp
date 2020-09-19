import {
  BaseActionType,
  generateActionCreator,
  generateSimpleActionCreator,
} from "../common/base.actions";
import { UserProfile, AccountsType } from "./UserTypes";

// RegisterUserAction
export interface RegisterPayload {
  address?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  password: string;
  role: AccountsType;
  pin?: string;
  fingerprint: string;
}
export type RegisterUserAction = BaseActionType<
  "AUTH_REGISTER_USER",
  RegisterPayload
>;
export const registerUser = generateActionCreator<
  "AUTH_REGISTER_USER",
  RegisterPayload
>("AUTH_REGISTER_USER");

// SetUserProfileAction
export type SetUserProfileAction = BaseActionType<
  "SET_USER_PROFILE",
  UserProfile
>;
export const setUserProfile = generateActionCreator<
  "SET_USER_PROFILE",
  UserProfile
>("SET_USER_PROFILE");

// ClearUserProfileAction
export type ClearUserProfileAction = BaseActionType<"CLEAR_USER_PROFILE">;
export const clearUserProfile = generateSimpleActionCreator<
  "CLEAR_USER_PROFILE"
>("CLEAR_USER_PROFILE");

export type UserActionType =
  | "AUTH_REGISTER_USER"
  | "SET_USER_PROFILE"
  | "CLEAR_USER_PROFILE";

export type UserAction =
  | RegisterUserAction
  | SetUserProfileAction
  | ClearUserProfileAction;
