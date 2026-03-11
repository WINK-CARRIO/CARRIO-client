import { useEffect, useState } from 'react';
import ExitIcon from '../assets/svgs/icon/ExitIcon.tsx';

type JobForm = {
  name: string;
  description: string;
};

type Props = {
  isOpen: boolean;
  initialValue: JobForm;
  onClose: () => void;
  onSubmit: (payload: JobForm) => Promise<boolean>;
};

export default function EditJobCategoryModal({
  isOpen,
  initialValue,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<JobForm>(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm(initialValue);
      setIsSubmitting(false);
    }
  }, [isOpen, initialValue]);

  if (!isOpen) return null;

  const handleChange = (key: keyof JobForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.description.trim()) return;

    try {
      setIsSubmitting(true);
      const ok = await onSubmit({
        name: form.name.trim(),
        description: form.description.trim(),
      });
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
          <div className="text-xl font-semibold text-black">직군 수정</div>
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
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="예: 데이터 분석"
              className="w-full rounded-lg border border-neutral-200 px-4 py-3 outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium text-neutral-700">
              설명
            </div>
            <input
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="예: 데이터 분석, 머신러닝 등"
              className="w-full rounded-lg border border-neutral-200 px-4 py-3 outline-none focus:border-indigo-400"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50"
            disabled={isSubmitting}
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm text-white hover:bg-indigo-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );
}
