import { useEffect, useMemo, useState } from 'react';
import RowMenu from './RowMenu.tsx';
import type { Job } from '../pages/admin/AdminJobsPage.tsx';

type SearchProps = {
  search: string;
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
};

const ITEMS_PER_PAGE = 4;

export default function JobTable({ search, jobs, onEdit, onDelete }: SearchProps) {
  const [page, setPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const filteredJobs = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return jobs;

    return jobs.filter((job) =>
      `${job.name} ${job.description}`.toLowerCase().includes(q)
    );
  }, [jobs, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredJobs.length / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pagedJobs = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(start, start + ITEMS_PER_PAGE);
  }, [page, filteredJobs]);

  const displayRows = useMemo(() => {
    const blanks = ITEMS_PER_PAGE - pagedJobs.length;

    const emptyRows = Array.from({ length: Math.max(0, blanks) }, (_, i) => ({
      id: -(page * 100 + i + 1),
      name: '',
      description: '',
      createdAt: '',
      __empty: true as const,
    }));

    return [
      ...pagedJobs.map((j) => ({ ...j, __empty: false as const })),
      ...emptyRows,
    ];
  }, [pagedJobs, page]);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const handleDelete = (job: Job) => {
    onDelete(job);
    setOpenMenuId(null);
  };

  return (
    <div>
      <div className="flex w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]">
        <div className="inline-flex h-16 shrink-0 items-center justify-between border-b border-neutral-400 bg-neutral-100 px-10 py-5">
          <div className="flex items-center gap-28">
            <div className="text-center text-lg font-semibold text-zinc-700">
              ID
            </div>
            <div className="w-20 text-center text-lg font-semibold text-zinc-700">
              직군명
            </div>
            <div className="w-40 text-center text-lg font-semibold text-zinc-700">
              설명
            </div>
            <div className="w-20 text-center text-lg font-semibold text-zinc-700">
              생성일
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          {displayRows.map((job) => (
            <div
              key={job.id}
              className={[
                'inline-flex h-24 w-full items-center justify-between border-b-[0.5px] px-10 py-5',
                job.__empty ? 'border-black/10' : 'border-black/20',
              ].join(' ')}
            >
              {job.__empty ? (
                <div className="h-full w-full" />
              ) : (
                <>
                  <div className="flex items-center gap-28">
                    <div className="w-4 text-center text-base font-semibold text-zinc-700">
                      {job.id}
                    </div>

                    <div className="w-20 text-center text-sm font-semibold text-zinc-700">
                      {job.name}
                    </div>

                    <div className="w-40 text-center text-xs text-zinc-700">
                      {job.description}
                    </div>

                    <div className="w-20 text-center text-xs text-zinc-700">
                      {job.createdAt}
                    </div>
                  </div>

                  <RowMenu
                    open={openMenuId === job.id}
                    onToggle={() =>
                      setOpenMenuId((prev) => (prev === job.id ? null : job.id))
                    }
                    onDelete={() => handleDelete(job)}
                    onEdit={() => {
                      onEdit(job);
                      setOpenMenuId(null);
                    }}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-10 py-4">
        <div className="flex items-center gap-3">
          <button
            disabled={!canPrev}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={[
              'rounded-lg px-3 py-2 text-sm font-medium',
              canPrev
                ? 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                : 'bg-neutral-50 text-neutral-300',
            ].join(' ')}
          >
            이전
          </button>

          <div className="text-sm text-neutral-600">
            {page} / {totalPages}
          </div>

          <button
            disabled={!canNext}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className={[
              'rounded-lg px-3 py-2 text-sm font-medium',
              canNext
                ? 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                : 'bg-neutral-50 text-neutral-300',
            ].join(' ')}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
