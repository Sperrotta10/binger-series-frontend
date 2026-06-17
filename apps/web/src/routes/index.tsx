import { createBrowserRouter, Navigate, useParams } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Home } from '../pages/Home';
import Search from '../pages/Search';
import { Diary } from '../pages/Diary';
import { Profile } from '../pages/Profile';
import { ShowDetails } from '../pages/ShowDetails';
import { CatalogGrid } from '../pages/CatalogGrid';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { Landing } from '../pages/Landing';
import { ProtectedRoute, PublicRoute } from '../components/AuthGuard';

function SeriesRedirect() {
  const { id } = useParams<{ id: string }>();
  return <Navigate to={`/shows/${id}`} replace />;
}

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/register",
        element: <RegisterPage />,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPasswordPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "dashboard",
            element: <Home />,
          },
          {
            path: "search",
            element: <Search />,
          },
          {
            path: "diary",
            element: <Diary />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "shows/:id",
            element: <ShowDetails />,
          },
          {
            path: "catalog/:type",
            element: <CatalogGrid />,
          },
          {
            path: "trending",
            element: <Navigate to="/catalog/trending" replace />,
          },
          {
            path: "series/:id",
            element: <SeriesRedirect />,
          },
        ],
      },
    ],
  },
]);
