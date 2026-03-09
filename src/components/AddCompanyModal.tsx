import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (payload: { name: string }) => void;
};

export default function AddCompanyModal({ isOpen, onClose, onAdd }: Props) {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    onAdd({ name: trimmed });
    setName('');
  };

  const handleClose = () => {
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-black">새 기업 추가</div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md px-2 py-1 text-sm text-neutral-500 hover:bg-neutral-100"
          >
            닫기
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div>
            <div className="mb-2 text-sm font-medium text-neutral-700">
              기업명
            </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 네이버"
              className="w-full rounded-lg border border-neutral-200 px-4 py-3 outline-none focus:border-indigo-400"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50"
          >
            취소
          </button>
          <button
            type="button"
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
