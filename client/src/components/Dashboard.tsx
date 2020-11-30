import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadUser } from "../actions/actions";

import { getIsAuthenticated } from "../selectors/authSelectors";
import Chatroom from "./chatRoom/ChatRoom";


const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loadUser());
    }
  }, []);
  return isAuthenticated ? (<Chatroom />) : (<h1>Main page</h1>);
};

export default Dashboard;
