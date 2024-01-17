import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function protectedRoute({ children, loggedIn, ...props }) {
  return (
    <Route {...props}>{loggedIn ? children : <Redirect to={"/login"} />}</Route>
  );
}
