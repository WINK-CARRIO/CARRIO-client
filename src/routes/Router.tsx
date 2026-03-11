import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import type { ReactNode } from 'react';
import LoginPage from '../pages/login/LoginPage.tsx';
import SignUpPage from '../pages/login/SignUpPage.tsx';
import IdealTalentPage from '../pages/IdealTalent/IdealTalentPage.tsx';
import LandingPage from '../pages/home/LandingPage.tsx';
import SpecPage from '../pages/spec/SpecPage.tsx';
import AdminJobsPage from '../pages/admin/AdminJobsPage.tsx';
import AdminIdealTalentsPage from '../pages/admin/AdminIdealTalentsPage.tsx';
import KakaoCallbackPage from '../pages/login/KakaoCallbackPage.tsx';

function AdminRoute({ children }: { children: ReactNode }) {
  let role = '';

  try {
    const rawUser = localStorage.getItem('user');
    if (rawUser && rawUser !== 'undefined' && rawUser !== 'null') {
      const parsed = JSON.parse(rawUser) as { role?: string };
      role = parsed.role ?? '';
    }
  } catch {
    role = '';
  }

  if (role !== 'admin') {
    return <Navigate to="/home" replace />;
  }

  return children;
}

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
      {
        path: '/admin/jobs',
        element: (
          <AdminRoute>
            <AdminJobsPage />
          </AdminRoute>
        ),
      },
      {
        path: '/admin/idealtalents',
        element: (
          <AdminRoute>
            <AdminIdealTalentsPage />
          </AdminRoute>
        ),
      },
      { path: '/kakao/callback', element: <KakaoCallbackPage /> },
    ],
  },
]);

export default router;
