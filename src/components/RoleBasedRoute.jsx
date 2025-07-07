import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

const RoleBasedRoute = ({ children, roles }) => {
  const { user } = useAuth();

  const isAuthorized = user && roles.includes(user.role);

  if (!isAuthorized) {
    return <Navigate to="/" />;
  }

  return children;
};

export const AdminRoute = ({ children }) => (
  <ProtectedRoute>
    <RoleBasedRoute roles={['Admin']}>
      {children}
    </RoleBasedRoute>
  </ProtectedRoute>
);

export const PatientRoute = ({ children }) => (
  <ProtectedRoute>
    <RoleBasedRoute roles={['Patient']}>
      {children}
    </RoleBasedRoute>
  </ProtectedRoute>
);