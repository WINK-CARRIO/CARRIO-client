import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/svgs/Logo.tsx';

const BASE_MENUS = [
  { label: '홈', path: '/home' },
  { label: '내 스펙 입력하기', path: '/spec' },
  { label: '초안 작성하기', path: '/draft' },
  { label: '결과 확인하기', path: '/result' },
  { label: '기업별 인재상', path: '/idealTalent' },
];

type StoredUser = {
  id?: number;
  email?: string;
  name?: string;
  role?: string;
  oauth_provider?: string | null;
  created_at?: string;
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminPath = location.pathname.startsWith('/admin');

  let user: StoredUser = {};

  try {
    const rawUser = localStorage.getItem('user');

    if (rawUser && rawUser !== 'undefined' && rawUser !== 'null') {
      user = JSON.parse(rawUser);
    }
  } catch (error) {
    console.error('user parse error:', error);
    localStorage.removeItem('user');
  }

  const isAdmin = user.role === 'admin';
  const isLoggedIn = !!user?.email;

  const menus = isAdmin
    ? [...BASE_MENUS, { label: '관리자 페이지', path: '/admin/jobs' }]
    : BASE_MENUS;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 inline-flex h-16 w-full items-center justify-between bg-indigo-400 px-8 py-3 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]">
      <div className="flex items-center gap-2">
        <Logo />
        <span className="text-xl font-bold text-white">
          {isAdminPath ? 'CARRIO for ADMIN' : 'CARRIO'}
        </span>
      </div>

      <nav className="flex h-10 items-center gap-10">
        {menus.map(({ label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              [
                'text-sm font-medium transition-colors',
                isActive
                  ? 'text-white underline underline-offset-4'
                  : 'text-white/80 hover:text-white',
              ].join(' ')
            }
          >
            {label}
          </NavLink>
        ))}

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            로그아웃
          </button>
        )}
      </nav>
    </header>
  );
}
