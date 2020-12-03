import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { TextField, Button, Avatar } from "@material-ui/core";

import socket from "../../services/connectSocket";
import { getUser, getUsers } from "../../selectors/authSelectors";
import { loadUsers } from "../../actions/actions";
import { IUser } from "../../helpers/interfaces";

interface IMessage {
  date: string | Date;
  message_id?: number;
  recipient_id: number | undefined;
  sender_id: number;
  sender_name: string | undefined;
  recipient_name: string | undefined;
  text: string;
}

const Messageslist: React.FC = () => {
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [messagesList, setMessagesList] = useState<Array<IMessage>>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isUserList, setUserList] = useState<boolean>(false);
  const [usersList, setUsersList] = useState<Array<IUser>>([]);
  const [recipient, setRecipient] = useState<IUser>();
  const users = useSelector(getUsers);
  const user: IUser = useSelector(getUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!users.length) {
      dispatch(loadUsers());
    }

    socket.connect();

    socket.emit("get:messages", user.id);

    setUsersList([...users]);

    socket.on("MSG:LIST", (msg: [IMessage]) => {
      setMessagesList([...msg]);
    });

    socket.on("PREW:MSG", (msg: [IMessage]) => {
      setMessages([...msg]);
    });

    socket.on("new:message", () => {
      socket.emit("get:messages", user.id);
    });
    return () => {
      socket.close();
    };
  }, [users]);

  const onToggleUserList = () => {
    setUserList(!isUserList);
  };

  const onClick = (recipient: number) => {
    setRecipient(users.find((user: IUser) => user.id === recipient));
    socket.emit("get:correspondence", {
      sender_id: user.id,
      recipient_id: recipient,
    });
    setMessages([]);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput && recipient) {
      setMessages([
        ...messages,
        {
          sender_id: user.id,
          recipient_id: recipient!.id,
          sender_name: user.username,
          recipient_name: recipient.username,
          text: userInput,
          date: new Date(),
        },
      ]);

      socket.emit("private:message", {
        sender_id: user.id,
        recipient_id: recipient.id,
        sender_name: user.username,
        recipient_name: recipient.username,
        text: userInput,
        date: new Date(),
      });
      setUserInput("");
      socket.emit("get:messages", user.id);
    }
  };

  return (
    <section className={"chat-container"}>
      <div>
        {isUserList ? (
          <div className={"messages-list"}>
            <h3>User list:</h3>
            {usersList.length > 0 &&
              usersList.map((user) => {
                return (
                  <div key={user.id}>
                    <div className={"users"}>
                      <Avatar></Avatar>
                      <span>{user.username}</span>
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => onClick(user.id)}
                    >
                      Sent message
                    </Button>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className={"messages-list"}>
            <h3>Inbox messages:</h3>
            {messagesList.length > 0 &&
              messagesList.map((message) => {
                return (
                  <div key={message.message_id}>
                    <div className={"users"}>
                      <Avatar></Avatar>
                      <span>
                        {message.sender_name}: {message.text}
                      </span>
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => onClick(message.sender_id)}
                    >
                      Reply
                    </Button>
                  </div>
                );
              })}
          </div>
        )}
        <div className={"toggle-buttons"}>
          <Button
            variant="contained"
            color="primary"
            className={"button-margins"}
            onClick={onToggleUserList}
          >
            Messages
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={"button-margins"}
            onClick={onToggleUserList}
          >
            Users
          </Button>
        </div>
      </div>
      <div className={"chat private"}>
        <div className={"message-container"}>
          {messages.length
            ? messages.map((message) => {
                const formattedDate = new Date(
                  message.date
                ).toLocaleString("ru-RU", { hour12: false });
                return user.id === message.sender_id ? (
                  <div
                    className={"message"}
                    key={message.message_id || formattedDate}
                  >
                    <span>
                      <strong>{message.sender_name}</strong>: {message.text}
                    </span>
                    <span className={"message-date"}>{formattedDate}</span>
                  </div>
                ) : (
                  <div
                    className={"message inbox"}
                    key={message.message_id || formattedDate}
                  >
                    <span>
                      {message.text}: <strong>{message.recipient_name}</strong>
                    </span>
                    <span className={"message-date"}>{formattedDate}</span>
                  </div>
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

export default Messageslist;
