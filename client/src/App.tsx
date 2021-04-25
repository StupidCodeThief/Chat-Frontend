import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import Navbar from "./components/Navbar";
import Login from "./components/authentification/Login";
import Register from "./components/authentification/Register";
import Dashboard from "./components/Dashboard";
import Messageslist from "./components/messages/messagesList";
import PrivateRoute from "./components/routing/PrivateRoute";
import Chatroom from "./components/chatRoom/ChatRoom";

import "./index.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <PrivateRoute exact path="/messages" component={Messageslist} />
          <PrivateRoute exact path="/chat-room" component={Chatroom} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
