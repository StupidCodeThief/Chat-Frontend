import io from "socket.io-client";

const socket = io("https://chat-cocket.herokuapp.com");

export default socket;