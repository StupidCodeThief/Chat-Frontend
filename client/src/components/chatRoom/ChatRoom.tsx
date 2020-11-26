import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import socket from "../../utils/connectSocket";
import ConnectRoom from "./ConnectRoom";
import { getUser } from "../../selectors/authSelectors";

interface IMessage {
  user: string | undefined;
  text: string;
  username?: string;
}

const Chatroom: React.FC = () => {
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [userInput, setUserInput] = useState<string>("");
  const user = useSelector(getUser());

  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  socket.on("message", (data: IMessage) => {
    setMessages([{ user: data.user, text: data.text }, ...messages]);
  });

  socket.on("PREW:MSG", (prewMessage: any) => {
    console.log("get msg");
    setMessages([...messages, ...prewMessage]);
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput) {
      setMessages([{ user: user.username, text: userInput }, ...messages]);
      socket.emit("message", userInput);
      setUserInput("");
    }
  };

  const onExitRoom = () => {
    setMessages([]);
  };

  return (
    <section className={"chat-container"}>
      <ConnectRoom socket={socket} user={user} onExitRoom={onExitRoom} />
      <div className={"chat"}>
        <div className={"message-container"}>
          {messages.length
            ? messages.map((message, index) => {
                return (
                  <>
                    {user.username === message.user ? (
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
