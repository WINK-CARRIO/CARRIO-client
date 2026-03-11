import StatusBadge from './StatusBadge.tsx';

export type JobTalentMock = {
  id: number;
  job_category_name: string;
  status?: 'DONE' | 'RUNNING' | 'NONE'; // 모크에 없으니 optional
  keywords: string[];
  description: string;
  details: string[];
  technical_requirements: string[];
  extracted_at: string; // ISO
};

type Props = {
  job: JobTalentMock;
  onView?: (jobId: number) => void;
  onEdit?: (jobId: number) => void;
  onRetry?: (jobId: number) => void;
};

export default function JobTalentCard({ job, onView, onEdit, onRetry }: Props) {
  const dateLabel = (() => {
    const d = new Date(job.extracted_at);
    if (Number.isNaN(d.getTime())) return '';
    return d.toISOString().slice(0, 10);
  })();

  const status = job.status ?? 'DONE'; // 기본값

  return (
    <div
      className={[
        'w-full rounded-xl bg-white',
        'border border-neutral-200 shadow-[0px_4px_12px_rgba(0,0,0,0.08)]',
      ].join(' ')}
    >
      {/* 헤더(직무명 + 상태) */}
      <div className="flex items-start justify-between px-5 pt-5">
        <div className="text-xs font-medium text-neutral-700">
          {job.job_category_name}
        </div>
        <StatusBadge status={status} />
      </div>

      {/* 본문(연회색 박스) */}
      <div className="px-5 pt-3 pb-5">
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
          {/* description */}
          <div className="text-sm font-semibold text-neutral-900">
            {job.description}
          </div>

          {/* keywords */}
          {job.keywords?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {job.keywords.map((k) => (
                <span
                  key={k}
                  className="rounded-full border border-neutral-200 bg-white px-2 py-1 text-[11px] font-medium text-neutral-700"
                >
                  {k}
                </span>
              ))}
            </div>
          )}

          {/* details */}
          {job.details?.length > 0 && (
            <div className="mt-3 rounded-lg border border-neutral-200 bg-white p-4">
              <div className="text-xs font-semibold text-neutral-900">
                상세 내용
              </div>
              <ul className="mt-2 space-y-1 text-xs leading-5 text-neutral-700">
                {job.details.map((d, i) => (
                  <li key={i}>• {d}</li>
                ))}
              </ul>
            </div>
          )}

          {/* technical requirements */}
          {job.technical_requirements?.length > 0 && (
            <div className="mt-3 rounded-lg border border-neutral-200 bg-white p-4">
              <div className="text-xs font-semibold text-neutral-900">
                기술 요구사항
              </div>
              <ul className="mt-2 space-y-1 text-xs leading-5 text-neutral-700">
                {job.technical_requirements.map((t, i) => (
                  <li key={i}>- {t}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 하단 액션바 */}
          <div className="mt-3 flex items-center justify-between border-t border-neutral-200 pt-3">
            <div className="text-[11px] text-neutral-500">{dateLabel}</div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onView?.(job.id)}
                className="rounded-md px-2 py-1 text-xs hover:bg-neutral-100"
              >
                전체보기
              </button>

              <button
                type="button"
                onClick={() => onEdit?.(job.id)}
                className="rounded-md border border-neutral-200 px-2 py-1 text-xs hover:bg-neutral-100"
              >
                수정
              </button>

              <button
                type="button"
                onClick={() => onRetry?.(job.id)}
                className="rounded-md bg-indigo-600 px-2 py-1 text-xs text-white hover:bg-indigo-700"
              >
                재추출
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
