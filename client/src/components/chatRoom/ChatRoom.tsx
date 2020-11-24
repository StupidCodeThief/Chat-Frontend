import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import socket from "../../utils/connectSocket";
import ConnectRoom from "./ConnectRoom";
import {getUserName} from "../../selectors/authSelectors"

interface IMessage {
  user: string;
  text: string;
}

const Chatroom: React.FC = () => {
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [userInput, setUserInput] = useState<string>("");
  const user = useSelector(getUserName())

  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  socket.on("message", (data: IMessage) => {
    setMessages([{ user: data.user, text: data.text }, ...messages]);
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput) {
      setMessages([{ user, text: userInput }, ...messages]);
      socket.emit("message", userInput);
      setUserInput("");
    }
  };

  return (
    <section className={"chat-container"}>
      <ConnectRoom />
      <div className={"chat"}>
        <div className={"message-container"}>
          {messages.length
            ? messages.map((message) => {
                return (
                  <>
                    {user === message.user ? (
                      <span className={"message"}>
                        {message.user}: {message.text}
                      </span>
                    ) : (
                      <span className={"message inbox"}>
                        {message.text}: {message.user}
                      </span>
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
