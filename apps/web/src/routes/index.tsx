import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Home } from '../pages/Home';
import Search from '../pages/Search';
import { Diary } from '../pages/Diary';
import { Profile } from '../pages/Profile';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
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
    ],
  },
]);
