import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage.tsx';
import SignUpPage from '../pages/login/SignUpPage.tsx';
import IdealTalentPage from '../pages/IdealTalent/IdealTalentPage.tsx';

const router = createBrowserRouter([
  {
    element: <Outlet />,

    children: [
      { path: '/', element: <LoginPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/idealtalent', element: <IdealTalentPage /> },
    ],
  },
]);

export default router;
