import React from "react";
import { Link } from "react-router-dom";
import { RootStateOrAny, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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

  const isAuthenticated = useSelector(
    (state: RootStateOrAny) => state.auth.isAuthenticated
  );

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
            <Link to="/">
              <span className={"nav-link"}>Connect to room</span>
            </Link>
          ) : (
            <Link to="/login">
              <span className={"nav-link"}>Login</span>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
