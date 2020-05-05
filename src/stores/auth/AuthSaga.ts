import { call, put, all, takeEvery, select } from 'redux-saga/effects';

import { saveState } from '../../utils/stateLocalStorage';
import { AppState } from '../index';
import {
  AuthActionType,
  AuthAction,
  AuthByEmailAction,
  resetAuth,
  setAuthLoading,
  setAuth,
} from './AuthAction';
import { setUserProfile, clearUserProfile } from '../user/UserAction'
import { AuthSetAction } from './AuthAction';
import { resolveWith } from '../common/thunk.helper';
import { api, setBearerToken } from '../../services/api';
import { UserProfile } from '../user/UserTypes';
import { finalFormErrorHandler } from '../common/saga.helper';


function* authByEmailHandler(action: AuthByEmailAction) {
  try {
    yield put(setAuthLoading({ loading: true }));

    const response = yield call(api.rawPost, 'auth/sign-in', action.payload);
    const { data } = response.data;

    const profile: UserProfile = {
      _id: data.profile._id,
      role: data.profile.role,
      address: data.profile.address,
      email: data.profile.email,
      firstName: data.profile.firstName,
      lastName: data.profile.lastName,
      avatar: data.profile.avatar,
    };

    yield put(setUserProfile(profile));
    yield put(
      resolveWith(
        action.meta,
        setAuth({
          authToken: data.accessToken,
          refreshToken: data.refreshToken,
          role: data.profile.role,
        })
      )
    );

  } catch (error) {
    yield finalFormErrorHandler(action, error);
  }
  yield put(setAuthLoading({ loading: false }));
}

const getAuth = (state: AppState) => state.auth;

function* logoutHandler() {
  try {
    const tasks = [
      put(resetAuth()),
      put(clearUserProfile()),
    ];

    yield all(tasks);
  } catch (e) {
    console.error(e);
  }
}

function* setTokenHandler(action: AuthSetAction) {
  try {
    setBearerToken(action.payload.authToken, action.payload.refreshToken);
    const auth = yield select(getAuth);
    saveState({ auth });
  } catch (e) {
    console.error(e);
  }
}

function* resetAuthHandler() {
  try {
    setBearerToken();
    const auth = yield select(getAuth);
    saveState({ auth });
  } catch (e) {
    console.error(e);
  }
}

function handle<T extends AuthAction>(
  type: AuthActionType,
  handler: (action: T) => void
) {
  return takeEvery(type, handler);
}

export default function* authSaga() {
  yield handle('AUTH_SET', setTokenHandler);
  yield handle('AUTH_REFRESH_TOKENS', setTokenHandler);
  yield handle('AUTH_LOGIN_BY_EMAIL', authByEmailHandler);
  yield handle('AUTH_LOGOUT', logoutHandler);
  yield handle('AUTH_RESET', resetAuthHandler);
}
