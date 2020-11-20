import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "./types";

import setAuthToken from "../utils/setAuthToken";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const loadUser = () => async (dispatch: any) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    // mock reqest to get user
    const token = localStorage.getItem("token");

    if (token) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token },
      });
    }
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => {
        console.error(error);
      });
    }
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

    // dispatch(loadUser());
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
