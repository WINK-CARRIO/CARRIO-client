import { useEffect, useState } from 'react';
import ExitIcon from '../assets/svgs/icon/ExitIcon.tsx';
import toast from 'react-hot-toast';

type CompanyForm = {
  name: string;
  industry: string;
  description: string;
  website_url: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CompanyForm) => Promise<boolean>;
};

export default function AddCompanyModal({ isOpen, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<CompanyForm>({
    name: '',
    industry: '',
    description: '',
    website_url: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setForm({
        name: '',
        industry: '',
        description: '',
        website_url: '',
      });
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (key: keyof CompanyForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      toast.error('기업명은 필수입니다.');
      return;
    }

    try {
      setIsSubmitting(true);
      const isSuccess = await onSubmit({
        name: form.name.trim(),
        industry: form.industry.trim(),
        description: form.description.trim(),
        website_url: form.website_url.trim(),
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
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-black">새 기업 추가</div>
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
            <div className="mb-2 text-sm font-medium text-neutral-700">기업명</div>
            <input
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="예: 삼성전자"
              className="w-full rounded-lg border border-neutral-200 px-4 py-3 outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium text-neutral-700">산업군</div>
            <input
              value={form.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
              placeholder="예: 반도체/전자"
              className="w-full rounded-lg border border-neutral-200 px-4 py-3 outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium text-neutral-700">설명</div>
            <textarea
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="기업 설명"
              className="h-24 w-full resize-none rounded-lg border border-neutral-200 px-4 py-3 outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <div className="mb-2 text-sm font-medium text-neutral-700">
              웹사이트 URL
            </div>
            <input
              value={form.website_url}
              onChange={(e) => handleChange('website_url', e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-neutral-200 px-4 py-3 outline-none focus:border-indigo-400"
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
            {isSubmitting ? '추가 중...' : '추가'}
          </button>
        </div>
      </div>
    </div>
  );
}
