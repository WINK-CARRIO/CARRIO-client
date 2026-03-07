import AdminMenu from '../../components/AdminMenu';
import Header from '../../components/Header';
import PlusIcon from '../../assets/svgs/icon/PlusIcon';
import MagnifyIcon from '../../assets/svgs/icon/MagnifyIcon';
import DownIcon from '../../assets/svgs/icon/DownIcon';
import StatusBadge from '../../components/StatusBadge';

import JobTalentCard, {
  type JobTalentMock,
} from '../../components/JobTalentCard';
import OverallTalentCard, {
  type OverallTalentMock,
} from '../../components/OverallTalentCard';

import { useMemo, useState } from 'react';
import { MOCK_JOB_TALENTS, MOCK_OVERALL } from './mock.ts';

type Company = {
  id: number;
  name: string;
  sub: string;
  status: 'DONE' | 'RUNNING' | 'NONE';
  overall: OverallTalentMock;
  jobs: JobTalentMock[];
};

export default function AdminIdealTalentsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');
  const [openId, setOpenId] = useState<number | null>(null);

  const companies: Company[] = [
    {
      id: 1,
      name: '삼성전자',
      sub: '전사 ✓ · 직무별 2개',
      status: 'DONE',
      overall: { ...MOCK_OVERALL, status: 'DONE', id: 1, company_id: 1 },
      jobs: MOCK_JOB_TALENTS.map((j) => ({
        ...j,
        status: j.id === 2 ? 'RUNNING' : 'DONE',
      })), // status는 임시
    },
  ];

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();

    return companies.filter((c) => {
      const bySearch = !s || (c.name + c.sub).toLowerCase().includes(s);

      const byStatus =
        status === 'ALL'
          ? true
          : status === 'ACTIVE'
            ? c.status === 'DONE'
            : c.status !== 'DONE';

      return bySearch && byStatus;
    });
  }, [companies, search, status]);

  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <Header role="ADMIN" />

      <div className="flex w-full flex-1 overflow-hidden">
        <AdminMenu />

        <div className="flex flex-1 flex-col gap-6 overflow-hidden px-40 pt-12 pb-10">
          {/* 상단 */}
          <div className="flex w-full shrink-0 flex-col gap-10">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <div className="text-3xl leading-10 font-semibold text-black">
                  기업 관리
                </div>
                <div className="text-base leading-7 font-medium text-neutral-500">
                  기업을 추가하고 관리합니다
                </div>
              </div>

              <button className="flex items-center gap-4 rounded-xl bg-indigo-400 px-4 py-2">
                <PlusIcon color="white" />
                <div className="text-base leading-7 font-medium text-white">
                  새 기업 추가
                </div>
              </button>
            </div>

            {/* 검색/필터 */}
            <div className="flex items-center justify-between gap-4 self-stretch rounded-[20px] bg-white p-5 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]">
              <div className="flex w-full items-center gap-3 rounded-[20px] bg-neutral-100 px-3 py-2">
                <MagnifyIcon />
                <input
                  type="text"
                  placeholder="기업명 검색"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-base font-medium text-neutral-700 placeholder:text-neutral-500 focus:outline-none"
                />
              </div>

              <div className="flex w-full items-center gap-3 rounded-[20px] bg-neutral-100 px-3 py-2">
                <select
                  className="w-full bg-transparent text-base font-medium text-neutral-700 focus:outline-none"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                >
                  <option value="ALL">전체 상태</option>
                  <option value="ACTIVE">추출 완료</option>
                  <option value="INACTIVE">미추출/추출중</option>
                </select>
              </div>
            </div>
          </div>

          {/* 리스트 */}
          <div className="flex w-full flex-col gap-3 overflow-y-auto pb-2">
            {filtered.map((c) => {
              const open = openId === c.id;

              return (
                <div key={c.id} className="w-full">
                  {/* 회사 요약 카드 */}
                  <button
                    type="button"
                    onClick={() =>
                      setOpenId((prev) => (prev === c.id ? null : c.id))
                    }
                    className={[
                      'flex w-full items-center justify-between rounded-lg bg-white px-8 py-5',
                      'border border-neutral-200 shadow-[0px_4px_12px_rgba(0,0,0,0.08)]',
                      'transition hover:bg-neutral-50',
                    ].join(' ')}
                  >
                    <div className="flex flex-col gap-1 text-left">
                      <div className="text-sm font-semibold text-neutral-900">
                        {c.name}
                      </div>
                      <div className="text-xs font-medium text-neutral-500">
                        {c.sub}
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <StatusBadge status={c.status} />
                      <div
                        className={[
                          'transition-transform',
                          open ? 'rotate-180' : 'rotate-0',
                        ].join(' ')}
                      >
                        <DownIcon />
                      </div>
                    </div>
                  </button>

                  {/* 상세 */}
                  {open && (
                    <div
                      className={[
                        'mt-2 w-full rounded-lg bg-white',
                        'border border-neutral-200 shadow-[0px_4px_12px_rgba(0,0,0,0.08)]',
                        'p-6',
                      ].join(' ')}
                    >
                      <div className="flex flex-col gap-6">
                        {/* ✅ 전사 */}
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-semibold text-neutral-900">
                              전사 공통 인재상
                            </div>
                          </div>

                          <OverallTalentCard overall={c.overall} />
                        </div>

                        {/* ✅ 직무별 */}
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-semibold text-neutral-900">
                              직무별 인재상
                            </div>
                            <div className="text-xs font-medium text-neutral-500">
                              {c.jobs.length}개
                            </div>
                          </div>

                          <div className="flex flex-col gap-3">
                            {c.jobs.map((job) => (
                              <JobTalentCard key={job.id} job={job} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
