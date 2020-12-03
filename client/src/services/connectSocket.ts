import io from "socket.io-client";
import store from "../store";

const socket = io("http://localhost:5000");

function select(state: any) {
  return state.auth.user;
}

let user: any;

const handleUser = () => {
  user = select(store.getState());
  if (user) {
    socket.emit("login", user)
  }
};

store.subscribe(handleUser);

export default socket;
