import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { register } from "../../actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const isAuthenticated = useSelector(
    (state: RootStateOrAny) => state.auth.isAuthenticated
  );

  const [registerData, setRegisterData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const hasError = !(registerData.password === registerData.confirmPassword);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    registerData.password === registerData.confirmPassword &&
      setRegisterData({
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
      });
    dispatch(register(registerData));
  };

  if (isAuthenticated) {
    return <Redirect to={"/"} />;
  }

  return (
    <section className={"container"}>
      <h1 className={"center"}>Register</h1>
      <form
        className={`${classes.root} center`}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
          id="standard-basic"
          label="Email"
          value={registerData.email}
          name="email"
          onChange={onChange}
        />
        <TextField
          id="standard-basic"
          label="Name"
          value={registerData.username}
          name="username"
          onChange={onChange}
        />
        <TextField
          error={hasError}
          id={hasError ? "standard-error-helper-text" : "standard-basic"}
          helperText={hasError && "password didn`t match"}
          label="Password"
          type="password"
          value={registerData.password}
          name="password"
          onChange={onChange}
        />
        <TextField
          error={hasError}
          id={hasError ? "standard-error-helper-text" : "standard-basic"}
          helperText={hasError && "password didn`t match"}
          label="Confirm password"
          type="password"
          value={registerData.confirmPassword}
          name="confirmPassword"
          onChange={onChange}
        />
        <Link to="/login">Already have an account?</Link>
        <Button variant="contained" color="primary" type={"submit"}>
          Submit
        </Button>
      </form>
    </section>
  );
};

export default Register;
