import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="h-screen w-screen flex items-center justify-center bg-surface text-primary">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
};

export const PublicRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="h-screen w-screen flex items-center justify-center bg-surface text-primary">Loading...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};
