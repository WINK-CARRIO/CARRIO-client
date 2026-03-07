import { NavLink } from 'react-router-dom';
import Profile from '../assets/svgs/icon/Profile.tsx';
import JobIcon from '../assets/svgs/icon/JobIcon.tsx';
import CompanyIcon from '../assets/svgs/icon/CompanyIcon.tsx';

export default function AdminMenu() {
  const SERVICE_MENUS = [
    { label: '직군 관리', path: '/admin/jobs', icon: <JobIcon /> },
    {
      label: '기업 인재상 관리',
      path: '/admin/idealtalents',
      icon: <CompanyIcon />,
    },
  ];

  return (
    <div className="inline-flex w-72 flex-col items-start justify-between self-stretch border-r border-indigo-200 bg-white/20">
      <div className="flex flex-col items-start justify-start gap-6 self-stretch px-5 py-10">
        <div className="flex flex-col items-start justify-start gap-6 self-stretch">
          <div className="h-5 justify-start self-stretch text-base leading-5 font-medium text-gray-500">
            서비스 관리
          </div>
          {SERVICE_MENUS.map(({ label, path, icon }) => (
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
