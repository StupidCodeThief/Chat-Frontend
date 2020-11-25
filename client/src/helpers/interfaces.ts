export interface IUser {
  id: number;
  username: string;
  email: string;
}

export interface ILogin {
  password: string;
  email: string;
}

export interface IRegister {
  password: string;
  email: string;
  username: string;
}

export interface CreatorReturn {
  type: string;
  payload: {
    token?: string | null | undefined | undefined;
    isAuthenticated?: boolean | undefined | undefined;
    loading?: boolean | undefined | undefined;
    user?: null | IUser | undefined | undefined;
  };
}

export interface InitialState {
  token: string | null  | undefined;
  isAuthenticated: boolean | undefined;
  loading: boolean | undefined;
  user: null | IUser | undefined;
}

export interface ITypes {
  [key: string]: string;
}

export interface ConnectRoomProps {
  socket: SocketIOClient.Socket;
  user: IUser
}