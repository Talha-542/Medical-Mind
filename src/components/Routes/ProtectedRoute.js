
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Dashboard/UseAuth'; 
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); 

  if (!user) {
    
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;
