import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthLoadingScreen = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-surface text-primary">
    Loading...
  </div>
);

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export const PublicRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const redirectTo =
    (location.state as { from?: string } | null)?.from ?? '/dashboard';

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
