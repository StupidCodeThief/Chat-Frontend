import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT,
  AUTH_ERROR,
  USER_LOADED
} from "./types";

import setAuthToken from "../utils/setAuthToken";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const loadUser = () => async (dispatch: any): Promise<void> => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:5000/api/auth/user");

    console.log(res.data)

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => {
        console.error(error);
      });
    }

    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = ({ email, password }: any) => async (dispatch: any) => {
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => {
        console.error(error);
      });
    }

    dispatch({
      type: LOGIN_FAILURE,
    });
  }
};

export const register = ({ email, password, username }: any) => async (
  dispatch: any
) => {
  const body = JSON.stringify({ email, password, username });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => {
        console.error(error);
      });
    }

    dispatch({
      type: REGISTER_FAILURE,
    });
  }
};

export const logout = () => async (dispatch: any) => {
  try {
    dispatch({
      type: LOG_OUT,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => {
        console.error(error);
      });
    }

    dispatch({
      type: AUTH_ERROR,
    });
  }
};
