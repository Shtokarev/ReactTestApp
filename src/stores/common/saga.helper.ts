import { put } from 'redux-saga/effects';

import { rejectWith } from './thunk.helper';
import { setAuthError } from '../auth/AuthAction';
import { nop } from './base.actions';

export function* finalFormErrorHandler(action: any, error: any) {
  try {
    const serverError = error.response?.data?.error;
    const validationError = serverError?.validationError;
    const message = serverError?.message;

    if (validationError) {
      yield put(rejectWith(action.meta, nop(validationError)));
    } else {
      yield put(
        rejectWith(
          action.meta,
          setAuthError({
            error: `Server error: ${message || error.message}`,
          })
        )
      );
    }
  } catch (error) {
    console.error(error);
  }
}

