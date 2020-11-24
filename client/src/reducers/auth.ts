import { types } from "../actions/types";

import { CreatorReturn, InitialState } from "../helpers/interfaces";

const initialState: InitialState = {
  token: null,
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default function (state = initialState, action: CreatorReturn ): InitialState {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: action.payload.isAuthenticated,
        loading: action.payload.loading,
      };
    case types.LOG_OUT:
    case types.AUTH_ERROR:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: action.payload.isAuthenticated,
        loading: action.payload.loading,
        user: action.payload.user,
      };
    case types.USER_LOADED:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        loading: action.payload.loading,
        user: action.payload.user,
      };
    default:
      return {
        ...state,
      };
  }
}
