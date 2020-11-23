import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import { loadUser } from "./actions/actions";

import Navbar from "./components/Navbar";
import Login from "./components/authentification/Login";
import Register from "./components/authentification/Register";

import "./index.css";

const App: React.FC = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      // store.dispatch(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <h1>Main page</h1>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
