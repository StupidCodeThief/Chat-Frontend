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

export interface InitialState {
  token: string | null | undefined;
  isAuthenticated: boolean | undefined;
  loading: boolean | undefined;
  user: null | IUser | undefined;
}

export interface ITypes {
  [key: string]: string;
}

export interface ConnectRoomProps {
  socket: SocketIOClient.Socket;
  user: IUser;
  onExitRoom: any;
}

export interface IMessage {
  message_id: number;
  user: number;
  room: number;
  text: string;
  username: string;
}

export interface StateMessages {
  messages: [] | [IMessage] | undefined;
}

export interface CreatorReturn {
  type: string;
  payload: {
    token?: string | null | undefined;
    isAuthenticated?: boolean | undefined;
    loading?: boolean | undefined;
    user?: null | IUser | undefined;
    messages?: [] | [IMessage] | undefined;
  };
}

export interface PrevMessage {
  message_id: number;
  room: number;
  text: string;
  user: number;
  username: string;
  date: Date;
}
