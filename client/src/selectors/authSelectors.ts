import { RootStateOrAny } from "react-redux";

export const getIsAuthenticated = () => {
  return (state: RootStateOrAny) => state.auth.isAuthenticated;
};

export const getUserName = () => {
  return (state: RootStateOrAny) => state.auth.user.username;
};

export const getUser = () => {
  return (state: RootStateOrAny) => state.auth.user;
};