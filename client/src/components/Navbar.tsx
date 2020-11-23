import React from "react";
import { Link } from "react-router-dom";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { logout } from "../actions/actions";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootStateOrAny) => state.auth.isAuthenticated
  );

  const onClick = (): void => {
    dispatch(logout());
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">
              <span className={"nav-link"}>Pet Chat</span>
            </Link>
          </Typography>
          {isAuthenticated ? (
            <>
              <Link to="/">
                <Button variant="contained" className={"button-margins"}>
                  Connect to room
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="contained"
                  className={"button-margins"}
                  onClick={onClick}
                >
                  Logout
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <Button
                variant="contained"
                color="primary"
                className={"button-margins"}
              >
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
