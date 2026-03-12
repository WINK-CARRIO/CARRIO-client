import { useEffect, useState } from 'react';
import ExitIcon from '../assets/svgs/icon/ExitIcon.tsx';
import toast from 'react-hot-toast';

type JobCategoryOption = {
  job_category_id: number;
  job_category_name: string;
  extracted_at?: string;
};

type Props = {
  isOpen: boolean;
  companyName: string;
  jobCategories: JobCategoryOption[];
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (jobCategoryId: number) => Promise<boolean>;
};

export default function ExtractJobTalentModal({
  isOpen,
  companyName,
  jobCategories,
  isLoading,
  onClose,
  onSubmit,
}: Props) {
  const [jobCategoryId, setJobCategoryId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setJobCategoryId('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const parsed = Number(jobCategoryId);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      toast.error('직군 ID를 숫자로 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      const ok = await onSubmit(parsed);
      if (ok) {
        onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-black">
            직무 인재상 추출 - {companyName}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-neutral-500"
          >
            <ExitIcon />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div>
            <div className="mb-2 text-sm font-medium text-neutral-700">
              직군 ID
            </div>
            <input
              value={jobCategoryId}
              onChange={(e) => setJobCategoryId(e.target.value)}
              placeholder="예: 1"
              className="w-full rounded-lg border border-neutral-200 px-4 py-3 outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium text-neutral-700">
              직군 목록 (클릭 시 ID 입력)
            </div>
            <div className="max-h-40 overflow-auto rounded-lg border border-neutral-200 p-3">
              {isLoading ? (
                <div className="text-sm text-neutral-500">불러오는 중...</div>
              ) : jobCategories.length === 0 ? (
                <div className="text-sm text-neutral-500">
                  불러올 수 있는 직군이 없습니다. ID를 직접 입력하세요.
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {jobCategories.map((job) => (
                    <button
                      key={job.job_category_id}
                      type="button"
                      onClick={() =>
                        setJobCategoryId(String(job.job_category_id))
                      }
                      className="flex items-center justify-between rounded-md border border-neutral-200 px-3 py-2 text-left text-sm hover:bg-neutral-50"
                    >
                      <span>{job.job_category_name}</span>
                      <span className="text-xs text-neutral-500">
                        ID: {job.job_category_id}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50"
            disabled={isSubmitting}
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm text-white hover:bg-indigo-600 disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? '추출 중...' : '추출'}
          </button>
        </div>
      </div>
    </div>
  );
}
