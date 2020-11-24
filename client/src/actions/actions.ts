import axios from "axios";

import actionCreaters from "./actionCreators";

import setAuthToken from "../utils/setAuthToken";
import setAxiosHeders from "../services/axiosHTTP";

setAxiosHeders();

export const loadUser = () => async (dispatch: any): Promise<void> => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth/user");

    dispatch(actionCreaters.loadUserSuccess(res.data));
  } catch (error) {
    const errors: [] = error.response?.data?.errors || [
      { message: "Server error" },
    ];

    if (errors) {
      errors.forEach((error: any) => {
        console.error(error);
      });
    }

    dispatch(actionCreaters.authError());
  }
};

export const login = ({ email, password }: any) => async (dispatch: any) => {
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth/login", body);

    localStorage.setItem("token", res.data.token);

    dispatch(actionCreaters.loginSuccess(res.data.token));
    console.log(res.data);

    dispatch(loadUser());
  } catch (error) {
    const errors: [] = error.response?.data?.errors || [
      { message: "Server error" },
    ];

    if (errors) {
      errors.forEach((error: any) => {
        console.error(error);
      });
    }

    localStorage.removeItem("token");

    dispatch(actionCreaters.authError());
  }
};

export const register = ({ email, password, username }: any) => async (
  dispatch: any
) => {
  const body = JSON.stringify({ email, password, username });

  try {
    const res = await axios.post("/api/auth/register", body);

    localStorage.setItem("token", res.data.token);

    dispatch(actionCreaters.registerSuccess(res.data.token));

    dispatch(loadUser());
  } catch (error) {
    const errors: [] = error.response?.data?.errors || [
      { message: "Server error" },
    ];

    if (errors) {
      errors.forEach((error: any) => {
        console.error(error);
      });
    }

    localStorage.removeItem("token");

    dispatch(actionCreaters.authError());
  }
};

export const logout = () => async (dispatch: any) => {
  try {
    localStorage.removeItem("token");

    dispatch(actionCreaters.logoutSuccess());
  } catch (error) {
    const errors: [] = error.response?.data?.errors || [
      { message: "Server error" },
    ];

    if (errors) {
      errors.forEach((error: any) => {
        console.error(error);
      });
    }
    localStorage.removeItem("token");

    dispatch(actionCreaters.authError());
  }
};
