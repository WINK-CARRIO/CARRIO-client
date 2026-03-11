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
import DraftGuidePage from '../pages/draft/DraftGuidePage.tsx';
import DraftStep1Page from '../pages/draft/DraftStep1Page.tsx';
import DraftStep2Page from '../pages/draft/DraftStep2Page.tsx';
import DraftStep3Page from '../pages/draft/DraftStep3Page.tsx';
import ResultPage from '../pages/result/ResultPage.tsx';
import SidebarLayout from '../components/SidebarLayout.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';

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
        path: '/draft',
        element: (
          <ProtectedRoute>
            <SidebarLayout>
              <DraftGuidePage />
            </SidebarLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: '/draft/step1',
        element: (
          <ProtectedRoute>
            <SidebarLayout>
              <DraftStep1Page />
            </SidebarLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: '/draft/step2',
        element: (
          <ProtectedRoute>
            <SidebarLayout>
              <DraftStep2Page />
            </SidebarLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: '/draft/step3',
        element: (
          <ProtectedRoute>
            <SidebarLayout>
              <DraftStep3Page />
            </SidebarLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: '/result',
        element: (
          <ProtectedRoute>
            <SidebarLayout>
              <ResultPage />
            </SidebarLayout>
          </ProtectedRoute>
        ),
      },
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
