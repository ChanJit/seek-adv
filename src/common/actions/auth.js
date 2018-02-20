import * as consts from '../constants/general';
import { getResponse } from '../helpers/responseData';

export function signIn(signInDetails) {
  return {
    types: [
      consts.SIGNIN,
      consts.AUTHENTICATED,
      consts.SIGNIN_FAIL
    ],
    promise: async (dispatch, getState, fetch) => {
      const state = getState();
      const apiBaseUrl = state.config.endpoints.api;

      const responsePromise = await fetch(`${apiBaseUrl}/login`, {
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(signInDetails)
      });

      const response = await getResponse(responsePromise);

      return response.user;
    }
  };
}

export function register(registerDetails) {
  return {
    types: [
      consts.REGISTER,
      consts.REGISTER_SUCCESS,
      consts.REGISTER_FAIL
    ],
    promise: async (dispatch, getState, fetch) => {
      const state = getState();
      const apiBaseUrl = state.config.endpoints.api;

      const responsePromise = await fetch(`${apiBaseUrl}/register`, {
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(registerDetails)
      });

      const response = await getResponse(responsePromise);

      return response.user;
    }
  };
}

export function signOut() {
  return {
    types: [
      consts.SIGNOUT,
      consts.SIGNOUT_SUCCESS,
      consts.SIGNOUT_FAIL
    ],
    promise: async (dispatch, getState, fetch) => {
      const state = getState();
      const apiBaseUrl = state.config.endpoints.api;

      const response = await fetch(`${apiBaseUrl}/logout`, {
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('An error occurred signing out');
      }
    }
  };
}