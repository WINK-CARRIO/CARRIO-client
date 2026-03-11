import { useEffect, useState } from 'react';
import ExitIcon from '../assets/svgs/icon/ExitIcon.tsx';

type OverallTalentForm = {
  keywords: string;
  description: string;
  details: string;
};

type Props = {
  isOpen: boolean;
  initialValue: OverallTalentForm;
  onClose: () => void;
  onSubmit: (payload: OverallTalentForm) => Promise<boolean>;
};

export default function EditOverallTalentModal({
  isOpen,
  initialValue,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<OverallTalentForm>(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm(initialValue);
      setIsSubmitting(false);
    }
  }, [isOpen, initialValue]);

  if (!isOpen) return null;

  const handleChange = (key: keyof OverallTalentForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.keywords.trim() || !form.description.trim() || !form.details.trim()) {
      alert('키워드/설명/세부 내용을 모두 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      const isSuccess = await onSubmit({
        keywords: form.keywords.trim(),
        description: form.description.trim(),
        details: form.details.trim(),
      });
      if (isSuccess) {
        onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-black">
            전사 인재상 수정
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
              키워드 (콤마 구분)
            </div>
            <input
              value={form.keywords}
              onChange={(e) => handleChange('keywords', e.target.value)}
              placeholder="예: 도전적, 혁신적, 글로벌"
              className="w-full rounded-lg border border-neutral-200 px-4 py-3 outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium text-neutral-700">설명</div>
            <input
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="예: 빠른 실행력을 가진 도전적 인재"
              className="w-full rounded-lg border border-neutral-200 px-4 py-3 outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium text-neutral-700">
              세부 내용 (줄바꿈으로 구분)
            </div>
            <textarea
              value={form.details}
              onChange={(e) => handleChange('details', e.target.value)}
              placeholder="예: 창의적 사고와 혁신을 추구하는 인재"
              className="h-32 w-full resize-none rounded-lg border border-neutral-200 px-4 py-3 outline-none focus:border-indigo-400"
            />
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
            {isSubmitting ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );
}
