import { useState } from 'react';
import ExitIcon from '../assets/svgs/icon/ExitIcon.tsx';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (job: { job_category_name: string; description: string }) => void;
};

export default function AddJobTalentModal({ isOpen, onClose, onAdd }: Props) {
  const [jobCategoryName, setJobCategoryName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!jobCategoryName.trim() || !description.trim()) return;

    onAdd({
      job_category_name: jobCategoryName.trim(),
      description: description.trim(),
    });

    setJobCategoryName('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-black">새 직군 추가</div>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-neutral-500"
          >
            <ExitIcon />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div>
            <div className="mb-2 text-sm font-medium text-neutral-700">
              직군명
            </div>
            <input
              value={jobCategoryName}
              onChange={(e) => setJobCategoryName(e.target.value)}
              placeholder="예: 프론트엔드 개발"
              className="w-full rounded-lg border border-neutral-200 px-4 py-3 outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium text-neutral-700">
              설명
            </div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="예: 사용자 화면을 구현하고 개선하는 직군"
              className="w-full rounded-lg border border-neutral-200 px-4 py-3 outline-none focus:border-indigo-400"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm text-white hover:bg-indigo-600"
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
}
