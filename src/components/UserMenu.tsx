import { NavLink } from 'react-router-dom';
import Profile from '../assets/svgs/icon/Profile.tsx';
import UploadIcon from '../assets/svgs/icon/UploadIcon.tsx';
import PaperSearchIcon from '../assets/svgs/icon/PaperSearchIcon.tsx';
import PersonIcon from '../assets/svgs/icon/PersonIcon.tsx';

export default function UserMenu() {
  const MAIN_MENUS = [
    { label: '초안 작성하기', path: '/draft', icon: <UploadIcon /> },
  ];

  const MY_MENUS = [
    { label: '자소서 확인하기', path: '/result', icon: <PaperSearchIcon /> },
    { label: '내 스펙 조회하기', path: '/spec', icon: <PersonIcon /> },
  ];

  return (
    <div className="inline-flex w-72 flex-col items-start justify-between self-stretch border-r border-indigo-200 bg-white/20">
      <div className="flex flex-col items-start justify-start gap-6 self-stretch px-5 py-10">
        <div className="flex flex-col items-start justify-start gap-6 self-stretch">
          <div className="h-5 justify-start self-stretch text-base leading-5 font-medium text-gray-500">
            주요기능
          </div>
          {MAIN_MENUS.map(({ label, path, icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                [
                  'inline-flex items-center gap-4 self-stretch rounded-xl px-4 py-3',
                  isActive
                    ? 'bg-indigo-400/20 text-indigo-800'
                    : 'text-zinc-700 hover:bg-indigo-50',
                ].join(' ')
              }
            >
              {icon}
              <span className="flex-1 text-sm leading-5 font-medium">
                {label}
              </span>
            </NavLink>
          ))}
        </div>
        <div className="flex flex-col items-start justify-start gap-6 self-stretch">
          <div className="h-5 justify-start self-stretch text-base leading-5 font-medium text-gray-500">
            마이페이지
          </div>
          {MY_MENUS.map(({ label, path, icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                [
                  'inline-flex items-center gap-4 self-stretch rounded-xl px-4 py-3',
                  isActive
                    ? 'bg-indigo-400/20 text-indigo-800'
                    : 'text-zinc-700 hover:bg-indigo-50',
                ].join(' ')
              }
            >
              {icon}
              <span className="flex-1 text-sm leading-5 font-medium">
                {label}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex h-24 flex-col items-center justify-center gap-2.5 self-stretch overflow-hidden border-t border-indigo-400/30 py-6 pr-9 pl-8">
        <div className="inline-flex items-center justify-start gap-4 self-stretch">
          <Profile />
          <div className="inline-flex flex-col items-start justify-start">
            <div className="h-5 justify-start self-stretch text-base leading-6 font-semibold text-black">
              이가인
            </div>
            <div className="h-5 justify-start self-stretch text-xs leading-5 font-light tracking-tight text-neutral-400">
              gainlee@kookmin.ac.kr
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
