import { types } from "../actions/types";

interface IUser {
  id: number;
  username: string;
  email: string;
}

interface InitialState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: null | IUser;
}

interface IActon {
  type: string;
  data: string | IUser;
}

const initialState: InitialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default function (state = initialState, action: IActon): any {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.data,
        isAuthenticated: true,
        loading: false,
      };
    case types.LOG_OUT:
    case types.AUTH_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case types.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.data,
      };
    default:
      return {
        ...state,
      };
  }
}
