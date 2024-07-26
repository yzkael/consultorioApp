import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/RoleContext';

const UserAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { roles,isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />
  }


  if (roles === null) {
    // Handle loading state if roles are still being fetched
    return <div>Loading...</div>;
  }

  if (!roles || (!roles.includes('user') && !roles.includes('admin'))) {
    return <Navigate to="/dashboard" state={{ from: location }} />;
  }

  return children;
};

export default UserAuth;
