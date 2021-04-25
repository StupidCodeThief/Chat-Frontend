import { types } from "./types";

import { IUser, CreatorReturn } from "../helpers/interfaces";

function loginSuccess(token: string): CreatorReturn {
  return {
    type: types.LOGIN_SUCCESS,
    payload: {
      token: token,
      isAuthenticated: true,
      loading: false,
    },
  };
}

function loadUserSuccess(user: IUser): CreatorReturn {
  return {
    type: types.USER_LOADED,
    payload: {
      isAuthenticated: true,
      loading: false,
      user: user,
    },
  };
}

function loadUsersSuccess(users: [IUser]): CreatorReturn {
  return {
    type: types.USERS_LOADED,
    payload: {
      loading: false,
      users: users,
    },
  };
}

function loadUsersError(): CreatorReturn {
  return {
    type: types.LOAD_USERS_ERROR,
    payload: {
      loading: false,
      users: [],
    },
  };
}

function authError(): CreatorReturn {
  return {
    type: types.AUTH_ERROR,
    payload: {
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
    },
  };
}

function registerSuccess(token: string): CreatorReturn {
  return {
    type: types.REGISTER_SUCCESS,
    payload: {
      token: token,
      isAuthenticated: true,
      loading: false,
    },
  };
}

function logoutSuccess(): CreatorReturn {
  return {
    type: types.LOG_OUT,
    payload: {
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
    },
  };
}

export default {
  loginSuccess,
  registerSuccess,
  loadUserSuccess,
  logoutSuccess,
  authError,
  loadUsersSuccess,
  loadUsersError
};
