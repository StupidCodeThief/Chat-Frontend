import axiosConfig from "../services/axiosConfig";

import actionCreators from "./actionCreators";

import setAuthToken from "../utils/setAuthToken";

import { ILogin, IRegister, CreatorReturn } from "../helpers/interfaces";
import { Dispatch } from "react";

export const loadUser = () => async (
  dispatch: Dispatch<CreatorReturn>
): Promise<void> => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const res = await axiosConfig.get("/api/auth/user");

    dispatch(actionCreators.loadUserSuccess(res.data));
  } catch (error) {
    const errors: [] = error.response?.data?.errors || [
      { message: "Server error" },
    ];

    if (errors) {
      errors.forEach((error: any) => {
        console.error(error);
      });
    }

    dispatch(actionCreators.authError());
  }
};

export const login = ({ email, password }: ILogin) => async (
  dispatch: Dispatch<CreatorReturn>
) => {
  const body = JSON.stringify({ email, password });

  try {
    const res = await axiosConfig.post("/api/auth/login", body);

    localStorage.setItem("token", res.data.token);
    setAuthToken(res.data.token);

    dispatch(actionCreators.loginSuccess(res.data.token));
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

    dispatch(actionCreators.authError());
  }
};

export const register = ({ email, password, username }: IRegister) => async (
  dispatch: Dispatch<CreatorReturn>
) => {
  const body = JSON.stringify({ email, password, username });

  try {
    const res = await axiosConfig.post("/api/auth/register", body);

    localStorage.setItem("token", res.data.token);
    setAuthToken(res.data.token);

    dispatch(actionCreators.registerSuccess(res.data.token));
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

    dispatch(actionCreators.authError());
  }
};

export const logout = () => async (dispatch: Dispatch<CreatorReturn>) => {
  try {
    localStorage.removeItem("token");

    dispatch(actionCreators.logoutSuccess());
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

    dispatch(actionCreators.authError());
  }
};

export const loadUsers = () => async (
  dispatch: Dispatch<CreatorReturn>
): Promise<void> => {
  try {
    const res = await axiosConfig.get("/api/auth/users");

    dispatch(actionCreators.loadUsersSuccess(res.data));
  } catch (error) {
    const errors: [] = error.response?.data?.errors || [
      { message: "Server error" },
    ];

    if (errors) {
      errors.forEach((error: any) => {
        console.error(error);
      });
    }

    dispatch(actionCreators.loadUsersError());
  }
};
