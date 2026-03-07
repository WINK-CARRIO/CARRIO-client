import { createBrowserRouter, Outlet } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage.tsx';
import SignUpPage from '../pages/login/SignUpPage.tsx';
import IdealTalentPage from '../pages/IdealTalent/IdealTalentPage.tsx';
import LandingPage from '../pages/home/LandingPage.tsx';
import SpecPage from '../pages/spec/SpecPage.tsx';
import AdminJobsPage from '../pages/admin/AdminJobsPage.tsx';
import AdminIdealTalentsPage from '../pages/admin/AdminIdealTalentsPage.tsx';

const router = createBrowserRouter([
  {
    element: <Outlet />,

    children: [
      { path: '/', element: <LandingPage /> },

      { path: '/home', element: <LandingPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/spec', element: <SpecPage /> },
      { path: '/idealtalent', element: <IdealTalentPage /> },
      { path: '/admin/jobs', element: <AdminJobsPage /> },
      { path: '/admin/idealtalents', element: <AdminIdealTalentsPage /> },
    ],
  },
]);

export default router;
