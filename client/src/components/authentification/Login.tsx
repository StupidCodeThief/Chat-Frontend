import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { login } from "../../actions/actions";

import { getIsAuthenticated } from "../../selectors/authSelectors";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const isAuthenticated = useSelector(getIsAuthenticated());

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(login(loginData));
    setLoginData({ email: "", password: "" });
  };

  if (isAuthenticated) {
    return <Redirect to={"/"} />;
  }

  return (
    <section className={"container"}>
      <h1 className={"center"}>Login</h1>
      <form
        className={`${classes.root} center`}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
          id="standard-basic"
          label="Email"
          value={loginData.email}
          name="email"
          onChange={onChange}
        />
        <TextField
          id="standard-basic"
          label="Password"
          type="password"
          value={loginData.password}
          name="password"
          onChange={onChange}
        />
        <Link to="/register">Do not have an account?</Link>
        <Button variant="contained" color="primary" type={"submit"}>
          Submit
        </Button>
      </form>
    </section>
  );
};

export default Login;
