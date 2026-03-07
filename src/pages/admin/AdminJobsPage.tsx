import { useState } from 'react';
import Header from '../../components/Header.tsx';
import PlusIcon from '../../assets/svgs/icon/PlusIcon.tsx';
import MagnifyIcon from '../../assets/svgs/icon/MagnifyIcon.tsx';
import JobTable from '../../components/JobTable.tsx';
import AdminMenu from '../../components/AdminMenu.tsx';
import AddJobTalentModal from '../../components/AddJobTalentModal.tsx';

export type Job = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
};

const INITIAL_JOBS: Job[] = [
  {
    id: 1,
    name: '개발자',
    description: '소프트웨어 개발 및 엔지니어링',
    createdAt: '2026-01-18',
  },
  {
    id: 2,
    name: '데이터 분석',
    description: '데이터 분석 및 리포팅',
    createdAt: '2026-01-19',
  },
  {
    id: 3,
    name: '디자이너',
    description: 'UI/UX 디자인',
    createdAt: '2026-01-20',
  },
  {
    id: 4,
    name: '기획자',
    description: '서비스 기획',
    createdAt: '2026-01-21',
  },
];

export default function AdminJobsPage() {
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);

  const handleAddJob = (newJob: {
    job_category_name: string;
    description: string;
  }) => {
    const nextId =
      jobs.length > 0 ? Math.max(...jobs.map((job) => job.id)) + 1 : 1;

    const createdAt = new Date().toISOString().slice(0, 10);

    const job: Job = {
      id: nextId,
      name: newJob.job_category_name,
      description: newJob.description,
      createdAt,
    };

    setJobs((prev) => [...prev, job]);
  };

  return (
    <>
      <div className="flex h-screen w-full flex-col bg-white">
        <Header role="ADMIN" />

        <div className="flex w-full flex-1 overflow-hidden">
          <AdminMenu />

          <div className="flex flex-1 flex-col gap-6 overflow-hidden px-40 pt-12 pb-10">
            <div className="flex w-full shrink-0 flex-col gap-10">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-3">
                  <div className="text-3xl leading-10 font-semibold text-black">
                    직군 관리
                  </div>
                  <div className="text-base leading-7 font-medium text-neutral-500">
                    직군을 추가하고 관리합니다
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center gap-4 rounded-xl bg-indigo-400 px-4 py-2 hover:bg-indigo-500"
                >
                  <PlusIcon color="white" />
                  <div className="text-base leading-7 font-medium text-white">
                    새 직군 추가
                  </div>
                </button>
              </div>

              {/* 검색 */}
              <div className="flex items-center justify-between rounded-[20px] bg-white p-5 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]">
                <div className="flex flex-1 items-center gap-3 rounded-[20px] bg-neutral-100 px-3 py-2">
                  <MagnifyIcon className="text-neutral-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="직군 또는 설명으로 검색하기"
                    className="w-full bg-transparent text-base font-medium text-neutral-700 placeholder:text-neutral-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <JobTable search={search} jobs={jobs} setJobs={setJobs} />
          </div>
        </div>
      </div>

      <AddJobTalentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(job) => {
          handleAddJob(job);
          setIsAddModalOpen(false);
        }}
      />
    </>
  );
}
