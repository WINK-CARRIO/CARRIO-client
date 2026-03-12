import { useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
  onClose: () => void;
  onSave: (skill: string) => void;
};

export default function SkillAddModal({ onClose, onSave }: Props) {
  const [skill, setSkill] = useState('');

  const handleSave = () => {
    const trimmed = skill.trim();

    if (!trimmed) {
      toast.error('기술 스택을 입력해주세요.');
      return;
    }

    onSave(trimmed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[420px] rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-xl font-semibold">기술 스택 추가</div>

        <input
          className="w-full rounded-lg border px-4 py-3"
          placeholder="예: React, Spring Boot, Docker"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
          }}
        />

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm text-white"
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
}
