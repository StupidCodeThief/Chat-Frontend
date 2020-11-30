import { RootStateOrAny } from "react-redux";

export const getIsAuthenticated = (state: RootStateOrAny) =>
  state.auth.isAuthenticated;

export const getIsLoading = (state: RootStateOrAny) => state.auth.loading;

export const getUserName = (state: RootStateOrAny) => state.auth.user.username;

export const getUser = (state: RootStateOrAny) => state.auth.user;
