// src/components/Header.tsx

import { NavLink } from 'react-router-dom';
import Logo from '../assets/svgs/Logo.tsx';
const MENUS = [
  { label: '홈', path: '/home' },
  { label: '내 스펙 입력하기', path: '/spec' },
  { label: '초안 작성하기', path: '/draft' },
  { label: '결과 확인하기', path: '/result' },
  { label: '기업별 인재상', path: '/idealTalent' },
];

export default function Header() {
  return (
    <header className="inline-flex h-16 items-center justify-between self-stretch bg-indigo-400 px-8 py-3 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Logo />
        <span className="text-xl font-bold text-white">CARRIO</span>
      </div>

      {/* Menu */}
      <nav className="flex h-10 items-center gap-10">
        {MENUS.map(({ label, path }) => (
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
      </nav>
    </header>
  );
}
