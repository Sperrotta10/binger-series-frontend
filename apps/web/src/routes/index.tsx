import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Home } from '../pages/Home';
import Search from '../pages/Search';
import { Diary } from '../pages/Diary';

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
      // Here we will add more routes later (profile, etc.)
    ],
  },
]);
