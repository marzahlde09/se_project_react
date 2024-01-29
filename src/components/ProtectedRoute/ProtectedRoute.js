import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import * as auth from "../../utils/auth";

export default function ProtectedRoute({ children, loggedIn, ...props }) {
  const [isLoading, setIsLoading] = useState(!loggedIn);
  const [isAuthorized, setIsAuthorized] = useState(loggedIn);

  useEffect(() => {
    setIsLoading(true);
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            //add user data to the state
            setIsAuthorized(true);
            setIsLoading(false);
          }
        })
        .catch((err) => console.error(err));
    }
  }, []);

  if (isLoading) {
    return null;
  }
  return (
    <Route {...props}>{isAuthorized ? children : <Redirect to={"/"} />}</Route>
  );
}
