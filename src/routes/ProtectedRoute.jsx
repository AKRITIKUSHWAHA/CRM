import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ product = 'crm' }) => {
  const { isCrmAuthenticated, isOalAuthenticated } = useAuth();

  if (product === 'crm' && !isCrmAuthenticated) {
    return <Navigate to="/crm/login" replace />;
  }

  if (product === 'oal' && !isOalAuthenticated) {
    return <Navigate to="/oal/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
