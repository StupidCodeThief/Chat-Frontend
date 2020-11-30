import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { ConnectRoomProps } from "../../helpers/interfaces";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const ConnectRoom: React.FC<ConnectRoomProps> = ({
  socket,
  user,
  onExitRoom,
}) => {
  const classes = useStyles();
  const [roomData, setRoomData] = useState({
    user,
    roomId: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onExitRoom();
    socket.emit("JOIN:ROOM", roomData);
    setRoomData({ ...roomData, roomId: "", password: "" });
  };

  const onReset = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onExitRoom();
    socket.emit("EXIT:ROOM");
    setRoomData({ ...roomData, roomId: "", password: "" });
  };

  return (
    <div>
      <h1 className={"center"}>Connect to room</h1>
      <form
        className={`${classes.root} center`}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
        onReset={onReset}
      >
        <TextField
          id="standard-basic"
          label="Room Name"
          name="roomId"
          onChange={onChange}
          value={roomData.roomId}
        />
        <TextField
          id="standard-basic"
          label="Password"
          name="password"
          onChange={onChange}
          value={roomData.password}
        />
        <Button variant="contained" color="primary" type={"submit"}>
          Enter room
        </Button>
        <Button variant="contained" color="primary" type={"reset"}>
          Exit room
        </Button>
      </form>
    </div>
  );
};

export default ConnectRoom;
