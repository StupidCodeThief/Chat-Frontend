import { types } from "../actions/types";

import { CreatorReturn, InitialStateUsers } from "../helpers/interfaces";

const initialState: InitialStateUsers = {
  loading: false,
  users: [],
};

export default function (
  state = initialState,
  action: CreatorReturn
): InitialStateUsers {
  switch (action.type) {
    case types.USERS_LOADED:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
      };
    case types.LOAD_USERS_ERROR:
      return {
        ...state,
        loading: false,
        users: [],
      };
    default:
      return {
        ...state,
      };
  }
}
