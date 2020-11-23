export interface IUser {
  id: number;
  username: string;
  email: string;
}

export interface CreatorReturn {
  type: string;
  payload: {
    token?: string | null;
    isAuthenticated?: boolean;
    loading?: boolean;
    user?: null | IUser;
  };
}

export interface InitialState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: null | IUser;
}

export interface ITypes {
  [key: string]: string;
}
