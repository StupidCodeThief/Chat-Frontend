import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import socket from "../../services/connectSocket";
import ConnectRoom from "./ConnectRoom";
import { getUser } from "../../selectors/authSelectors";
import { PrevMessage, OnlineUser } from "../../helpers/interfaces";

interface IMessage {
  user?: string | undefined;
  text: string;
  username?: string;
  date: Date;
  message_id?: number;
}

const Chatroom: React.FC = () => {
  const [messages, setMessages] = useState<Array<IMessage | PrevMessage>>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [onlineUsers, setOnlineUsers] = useState<Array<OnlineUser>>([]);
  const user = useSelector(getUser);

  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  socket.on("message", (data: IMessage) => {
    setMessages([
      ...messages,
      { username: data.username, text: data.text, date: new Date() },
    ]);
  });

  socket.on("PREW:MSG", (prewMessage: [PrevMessage]) => {
    setMessages([...messages, ...prewMessage]);
  });

  socket.on("ONLINE:NOW", (users: [OnlineUser]) => {
    setOnlineUsers([...users]);
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput) {
      setMessages([
        ...messages,
        { username: user.username, text: userInput, date: new Date() },
      ]);
      socket.emit("message", userInput);
      setUserInput("");
    }
  };

  const onExitRoom = () => {
    setMessages([]);
    setOnlineUsers([]);
  };

  return (
    <section className={"chat-container"}>
      <div>
        <ConnectRoom socket={socket} user={user} onExitRoom={onExitRoom} />
        <div className={"now-online"}>
          <h3>Now in chat: {onlineUsers.length}</h3>
          {onlineUsers.length > 0 &&
            onlineUsers.map((user) => {
              return (
                <div className={"online-user"} key={user.user_id}>
                  {user.username}
                </div>
              );
            })}
        </div>
      </div>
      <div className={"chat"}>
        <div className={"message-container"}>
          {messages.length
            ? messages.map((message) => {
                const formattedDate = new Date(
                  message.date
                ).toLocaleString("ru-RU", { hour12: false });
                return (
                  <>
                    {user.username === message.username ? (
                      <div
                        className={"message"}
                        key={message.message_id || formattedDate}
                      >
                        <span>
                          <strong>{message.username}</strong>: {message.text}
                        </span>
                        <span className={"message-date"}>{formattedDate}</span>
                      </div>
                    ) : (
                      <div
                        className={"message inbox"}
                        key={message.message_id || formattedDate}
                      >
                        <span>
                          {message.text}: <strong>{message.username}</strong>
                        </span>
                        <span className={"message-date"}>{formattedDate}</span>
                      </div>
                    )}
                  </>
                );
              })
            : null}
        </div>
        <form onSubmit={onSubmit} className={"chat-form"}>
          <TextField
            id="standard-basic"
            value={userInput}
            name="message"
            onChange={onChange}
            className={"message-input"}
          />
          <Button
            variant="contained"
            color="primary"
            type={"submit"}
            className={"send-button"}
          >
            Send
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Chatroom;
