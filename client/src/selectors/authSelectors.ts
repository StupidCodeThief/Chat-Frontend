import { RootStateOrAny } from "react-redux";

export const getIsAuthenticated = () => {
  return (state: RootStateOrAny) => state.auth.isAuthenticated;
};
