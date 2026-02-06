import Header from '../../components/Header.tsx';
import StackCard from '../../components/StackCard.tsx';
import CirtificateSection from './cirtificateSection/CirtificateSection.tsx';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import UploadIcon from '../../assets/svgs/icon/UploadIcon.tsx';
import ListIcon from '../../assets/svgs/icon/ListIcon.tsx';
import InfoCircleIcon from '../../assets/svgs/icon/InfoCircleIcon.tsx';
import PaperSearchIcon from '../../assets/svgs/icon/PaperSearchIcon.tsx';
import PersonIcon from '../../assets/svgs/icon/PersonIcon.tsx';

export default function SpecPage() {
  const TABS = ['자격증', '프로젝트', '대외활동', '수상경력'] as const;
  type TabType = (typeof TABS)[number];

  const [activeTab, setActiveTab] = useState<TabType>('자격증');

  const MAIN_MENUS = [
    { label: '초안 작성하기', path: '/spec', icon: <UploadIcon /> },
    { label: '기업별 인재상', path: '/idealTalent', icon: <ListIcon /> },
    { label: '서비스 소개', path: '/about', icon: <InfoCircleIcon /> },
  ];

  const MY_MENUS = [
    { label: '자소서 확인하기', path: '/result', icon: <PaperSearchIcon /> },
    { label: '내 스펙 조회하기', path: '/spec', icon: <PersonIcon /> },
  ];

  return (
    <div className="inline-flex min-h-screen w-full flex-col items-start justify-start bg-indigo-50">
      <Header />
      <div className="inline-flex flex-1 items-center justify-start self-stretch">
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
              <div className="h-7 w-7 bg-neutral-400"></div>
              <div className="inline-flex w-48 flex-col items-start justify-start">
                <div className="h-5 justify-start self-stretch text-base leading-6 font-semibold text-black">
                  이가인
                </div>
                <div className="h-5 justify-start self-stretch text-base leading-5 font-medium tracking-tight text-neutral-400">
                  gainlee@kookmin.ac.kr
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex flex-1 flex-col items-start justify-between self-stretch px-12 py-10">
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="justify-center self-stretch text-3xl leading-10 font-semibold text-black">
              이가인님의 스펙
            </div>
            <div className="justify-center self-stretch text-base leading-7 font-medium text-neutral-500">
              입력한 스펙 정보를 한눈에 확인해보세요
            </div>
          </div>
          <div className="inline-flex h-[619px] items-center justify-center gap-6 self-stretch">
            <div className="inline-flex w-64 flex-col items-start justify-start gap-7 self-stretch">
              <div className="flex h-80 flex-col items-start justify-start gap-4 rounded-[20px] bg-white px-5 py-7">
                <div className="inline-flex items-start justify-between self-stretch">
                  <div className="inline-flex flex-col items-start justify-start gap-[5px]">
                    <div className="justify-start text-xl leading-7 font-bold text-zinc-700">
                      국민대학교
                    </div>
                    <div className="justify-start text-base leading-6 font-medium text-zinc-700">
                      소프트웨어학부
                    </div>
                  </div>
                  <div className="relative h-4 w-4">
                    <div className="absolute top-[0.50px] left-[0.75px] h-3.5 w-3.5 bg-gray-500"></div>
                  </div>
                </div>
                <div className="flex h-52 flex-col items-start justify-between self-stretch">
                  <div className="flex w-52 flex-col items-start justify-start gap-5 overflow-hidden rounded-2xl bg-indigo-50 px-5 py-3">
                    <div className="justify-start self-stretch text-sm leading-5 font-medium text-zinc-700">
                      입학 : 2024년
                    </div>
                    <div className="justify-start self-stretch text-sm leading-5 font-medium text-zinc-700">
                      졸업 : 2028년{' '}
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-0.5 self-stretch">
                    <div className="h-7 justify-start self-stretch text-xs leading-8 font-medium text-neutral-500">
                      평균 학점
                    </div>
                    <div className="inline-flex w-52 items-start justify-start gap-2.5 overflow-hidden rounded-2xl bg-indigo-50 px-12 py-7">
                      <div className="flex w-28 items-center justify-start gap-2">
                        <div className="justify-start text-3xl leading-5 font-semibold text-black">
                          3.87{' '}
                        </div>
                        <div className="justify-start text-xl leading-5 font-medium text-neutral-400">
                          / 4.5
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="inline-flex flex-1 items-start justify-start gap-16 rounded-[20px] bg-white px-5 py-7">
                <div className="inline-flex h-50 w-32 flex-col items-start justify-start gap-2.5 overflow-auto">
                  <StackCard title={'Python'} />
                  <StackCard title={'TypeScript'} />
                  <StackCard title={'JavaScript'} />
                  <StackCard title={'Next.js'} />
                  <StackCard title={'React'} />
                  <StackCard title={'React'} />
                  <StackCard title={'React'} />
                  <StackCard title={'React'} />
                  <StackCard title={'React'} />
                </div>
                <div className="relative h-4 w-4">
                  <div className="absolute top-[0.50px] left-[0.75px] h-3.5 w-3.5 bg-gray-500"></div>
                </div>
              </div>
            </div>
            <div className="inline-flex h-[622px] flex-1 flex-col items-start justify-start gap-10 rounded-[20px] bg-white px-12 py-7 outline outline-1 outline-offset-[-1px] outline-neutral-400/20">
              <div className="flex flex-col items-start justify-start gap-10 self-stretch">
                <div className="inline-flex items-center justify-start gap-10 self-stretch">
                  {TABS.map((tab) => {
                    const isActive = activeTab === tab;

                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={[
                          'flex items-center justify-center py-[5px]',
                          'border-b-[3px] transition-colors',
                          isActive ? 'border-indigo-400' : 'border-transparent',
                        ].join(' ')}
                      >
                        <span
                          className={[
                            'text-center text-base leading-7 font-semibold',
                            isActive ? 'text-zinc-700' : 'text-neutral-400',
                          ].join(' ')}
                        >
                          {tab}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-col items-start justify-start gap-5 self-stretch">
                  <div className="inline-flex items-start justify-between self-stretch">
                    <div className="justify-start text-base leading-5 font-medium text-zinc-700">
                      총 5건
                    </div>
                    <div className="relative h-5 w-5">
                      <div className="absolute top-[4.17px] left-[4.17px] h-3 w-3 outline outline-2 outline-offset-[-1px] outline-zinc-700"></div>
                    </div>
                  </div>
                  <CirtificateSection />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
