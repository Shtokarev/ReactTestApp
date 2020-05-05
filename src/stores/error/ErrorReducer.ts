import { ErrorAction } from './ErrorAction';

export interface ErrorState {
  toastify: string | null;
}

const initialState: ErrorState = {
  toastify: null,
};

export function errorReducer(
  state: ErrorState = initialState,
  action: ErrorAction
): ErrorState {
  switch (action.type) {
    case 'SET_TOASTIFY_ERROR':
      const error = action.payload?.error;
      const toastify = !error
        ? 'Something wet wrong'
        : typeof error === 'string'
          ? error
          : error?.description + ' \n' + JSON.stringify(error); // JSON for debugging

      return {
        ...state,
        toastify,
      };

    case 'RESET_TOASTIFY_ERROR':
      return {
        ...state,
        toastify: null,
      };

    default:
      return state;
  }
}
