import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage.tsx';
import SignUpPage from '../pages/login/SignUpPage.tsx';
import LandingPage from '../pages/home/LandingPage.tsx';
import SpecPage from '../pages/spec/SpecPage.tsx';

const router = createBrowserRouter([
  {
    element: <Outlet />,

    children: [
      { path: '/', element: <LandingPage /> },

      { path: '/home', element: <LandingPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/spec', element: <SpecPage /> },
    ],
  },
]);

export default router;
