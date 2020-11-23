import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT,
  AUTH_ERROR,
  USER_LOADED,
} from "../actions/types";

interface InitialState {
  token: string | any;
  isAuthenticated: boolean;
  loading: boolean;
  user: null | any;
}

const initialState: InitialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default function (state = initialState, action: any): any {
  const { payload, type } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case LOG_OUT:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case USER_LOADED:
      return {
        ...state,
        token: localStorage.getItem("token"),
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    default:
      return {
        ...state,
      };
  }
}
