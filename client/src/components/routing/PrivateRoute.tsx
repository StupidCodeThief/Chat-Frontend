import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  getIsAuthenticated,
  getIsLoading,
} from "../../selectors/authSelectors";

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const loading = useSelector(getIsLoading);

  if (!loading) {
    return isAuthenticated ? (
      <Route
        path={props.path}
        exact={props.exact}
        component={props.component}
      />
    ) : (
      <Redirect to="/page/login" />
    );
  }

  return null;
};
export default PrivateRoute;
