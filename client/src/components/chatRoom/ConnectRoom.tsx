import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const ConnectRoom: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <h1 className={"center"}>Connect to room</h1>
      <form className={`${classes.root} center`} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Room ID" name="roomId" />
        <TextField id="standard-basic" label="Password" name="password" />
        <Button variant="contained" color="primary" type={"submit"}>
          Enter room
        </Button>
      </form>
    </div>
  );
};

export default ConnectRoom;
