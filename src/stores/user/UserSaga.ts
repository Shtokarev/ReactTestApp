import { call, put, takeEvery } from 'redux-saga/effects';

import { RegisterUserAction, UserAction, UserActionType, } from './UserAction';
import { setUserProfile } from './UserAction'
import { setAuthLoading, setAuth, } from '../auth/AuthAction';
import { resolveWith } from '../common/thunk.helper';
import { api } from '../../services/api';
import { UserProfile } from './UserTypes';
import { finalFormErrorHandler } from '../common/saga.helper';


function* registerHandler(action: RegisterUserAction) {
  try {
    yield put(setAuthLoading({ loading: true }));

    const response = yield call(api.rawPost, 'auth/sign-up', action.payload);
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

function handle<T extends UserAction>(
  type: UserActionType,
  handler: (action: T) => void
) {
  return takeEvery(type, handler);
}

export default function* authSaga() {
  yield handle('AUTH_REGISTER_USER', registerHandler);
}
