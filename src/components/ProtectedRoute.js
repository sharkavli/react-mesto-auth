import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoggedContext } from '../contexts/LoggedContext';

const ProtectedRoute = ({ element: Component, ...props }) => {
  const loggedIn = React.useContext(LoggedContext);
  return loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default ProtectedRoute;
