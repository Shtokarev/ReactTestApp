import { all } from 'redux-saga/effects';
import authSaga from './auth/AuthSaga';
import mapboxSaga from './mapbox/MapboxSaga';
import userSaga from './user/UserSaga';

export default function* rootSaga(): any {
  yield all([
    authSaga(),
    mapboxSaga(),
    userSaga(),
  ]);
}
