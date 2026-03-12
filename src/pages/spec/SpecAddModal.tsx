import { useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
  type: '자격증' | '프로젝트' | '대외활동';
  onClose: () => void;
  onSave: (data: {
    title: string;
    description: string;
    period: string;
  }) => void;
};

export default function SpecAddModal({ type, onClose, onSave }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [period, setPeriod] = useState('');

  const handleSave = () => {
    if (!title.trim()) {
      toast.error('제목을 입력해주세요.');
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      period: period.trim(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[420px] rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-xl font-semibold">{type} 추가</div>

        <div className="flex flex-col gap-4">
          <input
            className="rounded-lg border px-4 py-2"
            placeholder={type === '자격증' ? '자격증 이름' : '제목'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {type !== '자격증' && (
            <textarea
              className="rounded-lg border px-4 py-2"
              placeholder="설명"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          )}

          <input
            className="rounded-lg border px-4 py-2"
            placeholder={
              type === '자격증'
                ? '취득일 (예: 2025-03)'
                : '기간 (예: 2025.03-2025.06)'
            }
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          />
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            취소
          </button>

          <button
            onClick={handleSave}
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm text-white"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
