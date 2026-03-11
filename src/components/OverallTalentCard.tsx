// components/OverallTalentCard.tsx
import StatusBadge from './StatusBadge.tsx';

export type OverallTalentMock = {
  // MOCK_OVERALL은 id/company_id가 없으니까 optional로
  id?: number;
  company_id?: number;
  status?: 'DONE' | 'RUNNING' | 'NONE';

  keywords: string[];
  description: string;
  details: string[];
  extracted_at: string; // ISO
};

type Props = {
  overall: OverallTalentMock;
  onView?: (overallId?: number) => void;
  onEdit?: (overallId?: number) => void;
  onRetry?: (overallId?: number) => void;
};

export default function OverallTalentCard({
  overall,
  onView,
  onEdit,
  onRetry,
}: Props) {
  const dateLabel = (() => {
    const d = new Date(overall.extracted_at);
    if (Number.isNaN(d.getTime())) return '';
    return d.toISOString().slice(0, 10);
  })();

  const status = overall.status ?? 'DONE';

  return (
    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
      <div className="flex items-start justify-between">
        <div className="text-xs font-medium text-neutral-700">
          전사 공통 인재상
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="mt-3 rounded-lg border border-neutral-200 bg-white p-4">
        <div className="text-sm font-semibold text-neutral-900">
          {overall.description}
        </div>

        {overall.keywords?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {overall.keywords.map((k) => (
              <span
                key={k}
                className="rounded-full border border-neutral-200 bg-neutral-50 px-2 py-1 text-[11px] font-medium text-neutral-700"
              >
                {k}
              </span>
            ))}
          </div>
        )}

        {overall.details?.length > 0 && (
          <ul className="mt-3 space-y-1 text-xs leading-5 text-neutral-700">
            {overall.details.map((d, i) => (
              <li key={i}>• {d}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-neutral-200 pt-3">
        <div className="text-[11px] text-neutral-500">{dateLabel}</div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onView?.(overall.id)}
            className="rounded-md px-2 py-1 text-xs hover:bg-neutral-100"
          >
            전체보기
          </button>

          <button
            type="button"
            onClick={() => onEdit?.(overall.id)}
            className="rounded-md border border-neutral-200 px-2 py-1 text-xs hover:bg-neutral-100"
          >
            수정
          </button>

          <button
            type="button"
            onClick={() => onRetry?.(overall.id)}
            className="rounded-md bg-indigo-600 px-2 py-1 text-xs text-white hover:bg-indigo-700"
          >
            재추출
          </button>
        </div>
      </div>
    </div>
  );
}
