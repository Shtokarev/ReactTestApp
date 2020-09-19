import { all } from "redux-saga/effects";
import authSaga from "./auth/AuthSaga";
import userSaga from "./user/UserSaga";

export function* rootSaga(): any {
  yield all([authSaga(), userSaga()]);
}
