import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { logout, loadUser } from "../actions/actions";
import { getIsAuthenticated } from "../selectors/authSelectors";

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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loadUser());
    }
  }, []);

  const isAuthenticated = useSelector(getIsAuthenticated);

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
              <Link to="/messages">
                <Button variant="contained" className={"button-margins"}>
                  Messages
                </Button>
              </Link>
              <Link to="/chat-room">
                <Button variant="contained" className={"button-margins"}>
                  Chat
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
