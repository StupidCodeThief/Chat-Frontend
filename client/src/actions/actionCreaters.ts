import { types } from "./types";

interface IUser {
  id: number;
  username: string;
  email: string;
}

interface CreaterReturn {
  type: string;
  data?: string | IUser;
}

function loginSuccess(data: string | IUser): CreaterReturn {
  return {
    type: types.LOGIN_SUCCESS,
    data,
  };
}

function loadUserSuccess(data: string | IUser): CreaterReturn {
  return {
    type: types.USER_LOADED,
    data,
  };
}

function authError(): CreaterReturn {
  return { type: types.AUTH_ERROR };
}

function registerSuccess(data: string | IUser): CreaterReturn {
  return {
    type: types.REGISTER_SUCCESS,
    data,
  };
}

function logoutSuccess(): CreaterReturn {
  return { type: types.LOG_OUT };
}

export default {
  loginSuccess,
  registerSuccess,
  loadUserSuccess,
  logoutSuccess,
  authError,
};
