import { Navigate, Outlet } from 'react-router-dom';
import { hasAuthToken } from '@binger/shared';

export const ProtectedRoute = () => {
  if (!hasAuthToken()) {
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
};

export const PublicRoute = () => {
  if (hasAuthToken()) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};
