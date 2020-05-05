import {
  BaseActionType,
  generateActionCreator,
  generateSimpleActionCreator,
} from '../common/base.actions';

// SetToastifyErrorAction
export interface ToastifyErrorPayload {
  error:
  | {
    description: string;
  }
  | undefined
  | null
  | string;
}
export type SetToastifyErrorAction = BaseActionType<
  'SET_TOASTIFY_ERROR',
  ToastifyErrorPayload
>;
export const setToastifyError = generateActionCreator<
  'SET_TOASTIFY_ERROR',
  ToastifyErrorPayload
>('SET_TOASTIFY_ERROR');

// ResetToastifyErrorAction
export type ResetToastifyErrorAction = BaseActionType<
  'RESET_TOASTIFY_ERROR'
>;
export const resetToastifyError = generateSimpleActionCreator<
  'RESET_TOASTIFY_ERROR'
>('RESET_TOASTIFY_ERROR');

export type ErrorActionType = 'SET_TOASTIFY_ERROR' | 'RESET_TOASTIFY_ERROR';

export type ErrorAction = SetToastifyErrorAction | ResetToastifyErrorAction;
