import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadUser } from "../actions/actions";

import { getIsAuthenticated } from "../selectors/authSelectors";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated());

  useEffect(() => {
    console.log(isAuthenticated)
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, []);
  return (
    <>
      <h1>Main page</h1>
    </>
  );
};

export default Dashboard;
