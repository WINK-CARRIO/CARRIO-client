import CompanyIcon from '../../../../assets/svgs/icon/CompanyIcon.tsx';
import MagnifyIcon from '../../../../assets/svgs/icon/MagnifyIcon.tsx';
import JobIcon from '../../../../assets/svgs/icon/JobIcon.tsx';
import SidebarItem from './SideBarItem.tsx';

interface SideBarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

export default function SideBar({ activeMenu, setActiveMenu }: SideBarProps) {
  return (
    <div className="inline-flex w-64 flex-col items-start justify-start gap-5 self-stretch rounded-tl-xl rounded-bl-xl border-r border-indigo-400/30 bg-violet-50">
      <div className="flex flex-col items-start justify-start gap-1 self-stretch border-b border-indigo-400/30 px-7 py-5">
        <div className="justify-start text-lg leading-7 font-semibold text-black">
          기업 탐색
        </div>
        <div className="justify-start text-sm leading-5 font-semibold text-gray-400">
          Company Explorer
        </div>
      </div>
      <div className="flex flex-col items-end justify-start gap-4 self-stretch px-3">
        <SidebarItem
          icon={<CompanyIcon />}
          label={'기업 상세 조회'}
          active={activeMenu === 'company'}
          onClick={() => setActiveMenu('company')}
        />
        <SidebarItem
          icon={<MagnifyIcon />}
          label={'전사 인재상 조회'}
          active={activeMenu === 'talent'}
          onClick={() => setActiveMenu('talent')}
        />
        <SidebarItem
          icon={<JobIcon />}
          label={'직군 목록 조회'}
          active={activeMenu === 'job'}
          onClick={() => setActiveMenu('job')}
        />
      </div>
    </div>
  );
}
