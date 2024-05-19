import React from "react";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ element }) => {
    if (!!localStorage.getItem("auth-access")) return <>{element}</>;
    return <Navigate to={"/"} />;
    // return true;
  };
  
  export default AuthRoute;
