import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App"; // Adjust the import path as needed

const PrivateRoute = ({ children, requiredRole }) => {
  const { userAuth } = useContext(UserContext);

  if (!userAuth.accessToken) {
    console.log(userAuth.accessToken);
    // Redirect to sign-in page if not authenticated
    return <Navigate to="/" replace />;
  }

  if (userAuth.user && userAuth.user.role.name !== requiredRole) {
    // Redirect if the user does not have the required role
    return <Navigate to="/" replace />;
  }

  // Render the child components if authenticated and authorized
  return children;
};

export default PrivateRoute;
