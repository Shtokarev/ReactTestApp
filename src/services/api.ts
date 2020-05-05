import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { AnyAction } from 'redux';
import { Dispatch } from 'react';

import { getFingerPrintId } from "../utils/fingerPrint";
import { setRefreshTokens, RefreshTokensPayload, logoutAuth } from '../stores';

let authToken: string | null = null;
let refreshToken: string | null = null;
let instance = generateAxiosInstance();
let dispatchHook: Dispatch<AnyAction> | null = null;

export const getRefreshToken = () => refreshToken;
export const getInstance = () => instance;
export const getDispatchHook = () => dispatchHook;

let subscribers: ((token: string) => any)[] = [];
let isAlreadyFetchingAccessToken = false;

function generateAxiosInstance(): AxiosInstance {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-type': 'application/json',
    },
  });
}

export function setBearerToken(
  auth: string | null = null,
  refresh: string | null = null,
) {
  authToken = auth;
  refreshToken = refresh;
  instance = generateAxiosInstance();
  autoRefreshTokens(instance);
}

function autoRefreshTokens(instance: AxiosInstance) {
  instance.interceptors.response.use(
    function (response: AxiosResponse) {
      return response;
    },
    function (error: AxiosError) {
      if (error.response && isTokenExpiredError(error.response)) {
        return resetTokenAndReattemptRequest(error);
      }
      return Promise.reject(error);
    }
  );
}

function isTokenExpiredError(errorResponse: AxiosResponse) {
  const { status, data } = errorResponse;
  const message = data?.error?.message;

  if (status === 401) {
    if (message === 'Expired token') {
      return true;
    }
  }

  return false;
}

async function resetTokenAndReattemptRequest(error: AxiosError) {
  try {
    const { response: errorResponse } = error;

    if (!refreshToken) {
      return Promise.reject(error);
    }

    const retryOriginalRequest = new Promise(resolve => {
      addSubscriber((access_token: string) => {
        errorResponse!.config.headers.Authorization = 'Bearer ' + access_token;
        resolve(axios(errorResponse!.config));
      });
    });

    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;

      const fingerprint = await getFingerPrintId();

      const response = await instance.post('/auth/refresh-token', {
        refreshToken,
        fingerprint,
      });

      if (!response.data) {
        return Promise.reject(error);
      }

      const { status, data: { data } } = response;
      isAlreadyFetchingAccessToken = false;

      if (status === 201) {
        const { accessToken, refreshToken } = data;
        console.log('Token successfully refreshed');

        if (dispatchHook) {
          dispatchHook(
            setRefreshTokens({
              authToken: accessToken,
              refreshToken,
            } as RefreshTokensPayload)
          );
        }
        onAccessTokenFetched(accessToken);
      } else {
        onAccessTokenFetched('');
        resetAllAuth();
      }
    }

    return retryOriginalRequest;

  } catch (err) {
    resetAllAuth();
    return Promise.reject(err);
  }
}

function onAccessTokenFetched(access_token: string) {
  subscribers.forEach(callback => callback(access_token));
  subscribers = [];
}

function addSubscriber(callback: (token: string) => any) {
  subscribers.push(callback);
}

export function setDispatchHook(dispatch: Dispatch<AnyAction>) {
  dispatchHook = dispatch;
}

function authErrorHandler(e: any) {
  /// TODO insert correct checks when backend will be ready (reset auth)
  debugger
  if (e.response && e.response.data && e.response.data.statusCode === 401) {
    debugger
    resetAllAuth();
    return Promise.reject(e);
  } else {
    return Promise.reject(e);
  }
}

function resetAllAuth() {
  console.log('auth logout');
  if (dispatchHook) {
    dispatchHook(logoutAuth());
  }
}

function get<T = any>(url: string) {
  return instance.get<T>(url).catch(authErrorHandler);
}

function post(url: string, data: any, config?: AxiosRequestConfig) {
  return instance.post(url, data, config).catch(authErrorHandler);
}

function patch<T = any>(url: string, data: any) {
  return instance.patch<T>(url, data).catch(authErrorHandler);
}

function put(url: string, data: any) {
  return instance.put(url, data).catch(authErrorHandler);
}

function del(url: string, data?: any) {
  return instance.delete(url, { data }).catch(authErrorHandler);
}

function rawGet(url: string) {
  return instance.get(url);
}

function rawPost(url: string, data: any) {
  return instance.post(url, data);
}

export const api = {
  get,
  post,
  patch,
  put,
  delete: del,
  rawGet,
  rawPost,
};
