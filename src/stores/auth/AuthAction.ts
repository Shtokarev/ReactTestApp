import {
  BaseActionType,
  generateActionCreator,
  generateSimpleActionCreator,
} from '../common/base.actions';
import { AccountsType } from '../user/UserTypes';

// AuthByEmailAction
export interface AuthByEmailPayload {
  email: string;
  password: string;
  fingerprint: string;
}
export type AuthByEmailAction = BaseActionType<
  'AUTH_LOGIN_BY_EMAIL',
  AuthByEmailPayload
>;
export const authByEmail = generateActionCreator<
  'AUTH_LOGIN_BY_EMAIL',
  AuthByEmailPayload
>('AUTH_LOGIN_BY_EMAIL');

// AuthErrorAction
export interface AuthErrorPayload {
  error: string | null;
}
export type AuthErrorAction = BaseActionType<
  'AUTH_ERROR',
  AuthErrorPayload
>;
export const setAuthError = generateActionCreator<
  'AUTH_ERROR',
  AuthErrorPayload
>('AUTH_ERROR');

// AuthResetAction
export type AuthResetAction = BaseActionType<'AUTH_RESET'>;
export const resetAuth = generateSimpleActionCreator<'AUTH_RESET'>('AUTH_RESET');

// RefreshTokensAction
export interface RefreshTokensPayload {
  authToken: string;
  refreshToken: string;
}
export type RefreshTokensAction = BaseActionType<
  'AUTH_REFRESH_TOKENS',
  RefreshTokensPayload
>;
export const setRefreshTokens = generateActionCreator<
  'AUTH_REFRESH_TOKENS',
  RefreshTokensPayload
>('AUTH_REFRESH_TOKENS');

// AuthSetAction
export interface AuthSetPayload extends RefreshTokensPayload {
  role: AccountsType;
}
export type AuthSetAction = BaseActionType<
  'AUTH_SET',
  AuthSetPayload
>;
export const setAuth = generateActionCreator<
  'AUTH_SET',
  AuthSetPayload
>('AUTH_SET');

// AuthLogoutAction
export type AuthLogoutAction = BaseActionType<'AUTH_LOGOUT'>;
export const logoutAuth = generateSimpleActionCreator<'AUTH_LOGOUT'>('AUTH_LOGOUT');

// AuthSetLoadingAction
export interface AuthSetLoadingPayload {
  loading: boolean;
}
export type AuthSetLoadingAction = BaseActionType<
  'AUTH_SET_LOADING',
  AuthSetLoadingPayload
>;
export const setAuthLoading = generateActionCreator<
  'AUTH_SET_LOADING',
  AuthSetLoadingPayload
>('AUTH_SET_LOADING');

export type AuthActionType =
  | 'AUTH_ERROR'
  | 'AUTH_LOGIN_BY_EMAIL'
  | 'AUTH_LOGOUT'
  | 'AUTH_RESET'
  | 'AUTH_SET_LOADING'
  | 'AUTH_SET'
  | 'AUTH_REFRESH_TOKENS';

export type AuthAction =
  | AuthByEmailAction
  | AuthErrorAction
  | AuthLogoutAction
  | AuthResetAction
  | AuthSetLoadingAction
  | AuthSetAction
  | RefreshTokensAction;
