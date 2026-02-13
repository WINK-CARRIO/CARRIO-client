import Header from '../../components/Header.tsx';
import StackCard from '../../components/StackCard.tsx';
import CertificateSection from './certificateSection/CertificateSection.tsx';
import { useState } from 'react';
import ProjectSection from './projectSection/ProjectSection.tsx';
import PlusIcon from '../../assets/svgs/icon/PlusIcon.tsx';
import EditIcon from '../../assets/svgs/icon/EditIcon.tsx';
import UserMenu from '../../components/UserMenu.tsx';
export default function SpecPage() {
  const TABS = ['자격증', '프로젝트', '대외활동', '수상경력'] as const;
  type TabType = (typeof TABS)[number];

  const [activeTab, setActiveTab] = useState<TabType>('자격증');

  const mockResumeData = {
    structured_data: {
      education: {
        school: '서울대학교',
        major: '컴퓨터공학',
        grad_year: 2024,
        gpa: '3.87/4.5',
      },
      skills: ['Python', 'React', 'Docker'],
    },
    free_experiences: [
      {
        title: 'AI 챗봇 개발 프로젝트',
        description:
          'React와 GPT API를 활용하여 고객 상담 자동화 시스템을 구축했습니다.',
        period: '2023.03 - 2023.08',
        role: '프론트엔드 개발',
        achievements: '응답 시간 50% 단축, 고객 만족도 90% 달성',
      },
      {
        title: '캡스톤 디자인 프로젝트',
        description:
          'Spring Boot 기반 REST API 서버를 구축하고 JWT 인증을 구현했습니다.',
        period: '2023.09 - 2023.12',
        role: '백엔드 개발',
        achievements: 'API 응답 속도 30% 개선',
      },
    ],
  };
  const [gpaValue, gpaMax] = (
    mockResumeData.structured_data.education.gpa ?? ''
  ).split('/');
  return (
    <div className="inline-flex min-h-screen w-full flex-col items-start justify-start bg-indigo-50">
      <Header />
      <div className="inline-flex flex-1 items-center justify-start self-stretch">
        <UserMenu />
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
                      {mockResumeData.structured_data.education.school}
                    </div>
                    <div className="justify-start text-base leading-6 font-medium text-zinc-700">
                      {mockResumeData.structured_data.education.major}
                    </div>
                  </div>
                  {/*<div className="inline-flex items-center justify-center overflow-hidden rounded-[20px] bg-indigo-400 px-3.5 py-[5px]">*/}
                  {/*  <div className="justify-start text-center font-['Pretendard_Variable'] text-sm leading-5 font-medium text-white">*/}
                  {/*    재학*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
                <div className="flex h-52 flex-col items-start justify-between self-stretch">
                  <div className="flex w-52 flex-col items-start justify-start gap-5 overflow-hidden rounded-xl bg-indigo-50 px-5 py-3">
                    <div className="justify-start self-stretch text-sm leading-5 font-medium text-zinc-700">
                      입학 연도 :{' '}
                      {mockResumeData.structured_data.education.grad_year}년
                    </div>
                    <div className="justify-start self-stretch text-sm leading-5 font-medium text-zinc-700">
                      졸업 예정 연도 :{' '}
                      {mockResumeData.structured_data.education.grad_year + 4}
                      년{' '}
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-0.5 self-stretch">
                    <div className="h-7 justify-start self-stretch text-xs leading-8 font-medium text-neutral-500">
                      평균 학점
                    </div>
                    <div className="inline-flex w-52 items-start justify-start gap-2.5 overflow-hidden rounded-xl bg-indigo-50 px-12 py-7">
                      <div className="flex w-28 items-center justify-start gap-2">
                        <div className="justify-start text-3xl leading-5 font-semibold text-black">
                          {gpaValue}{' '}
                        </div>
                        <div className="justify-start text-xl leading-5 font-medium text-neutral-400">
                          / {gpaMax}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="inline-flex flex-1 items-start justify-start gap-16 rounded-[20px] bg-white px-5 py-7">
                <div className="inline-flex h-50 w-32 flex-col items-start justify-start gap-2.5 overflow-auto">
                  {mockResumeData.structured_data.skills.map((skill, index) => (
                    <StackCard key={`${skill}-${index}`} title={skill} />
                  ))}
                </div>
                <EditIcon />
              </div>
            </div>
            <div className="inline-flex h-[622px] flex-1 flex-col items-start justify-start rounded-[20px] bg-white px-12 py-7 outline outline-1 outline-offset-[-1px] outline-neutral-400/20">
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
                <div className="flex flex-col items-start justify-start gap-2 self-stretch">
                  <div className="inline-flex items-start justify-between self-stretch">
                    <div className="justify-start text-base leading-5 font-medium text-zinc-700">
                      총 {mockResumeData.free_experiences.length}건
                    </div>
                    <PlusIcon />
                  </div>
                  <div className="flex h-110 flex-col items-start justify-start self-stretch overflow-auto">
                    {activeTab === '자격증' && <CertificateSection />}
                    {activeTab === '프로젝트' && (
                      <ProjectSection
                        projects={mockResumeData.free_experiences}
                      />
                    )}
                    {activeTab === '대외활동' && <ActivitySection />}
                    {activeTab === '수상경력' && <AwardSection />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
