import { useEffect } from 'react';

interface FileModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  imageFile?: string;
  occupation?: string;
  idealTalent?: string;
}

export default function CompanyModal({
  isOpen,
  onClose,
  imageFile,
  title,
  occupation,
  idealTalent,
}: FileModalProps) {
  // ESC 키로 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className={`inline-flex h-120 w-200 flex-col overflow-auto rounded-[20px] bg-white shadow-xl [&::-webkit-scrollbar]:hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="h-60 self-stretch object-cover"
          src={`/src/assets/${imageFile}`}
        />

        <div className="flex h-96 flex-col gap-8 p-12">
          <div className="inline-flex items-end gap-3">
            <div className="text-3xl font-semibold text-black">{title}</div>
            <div className="text-lg font-medium text-neutral-600">
              {occupation}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="text-secondary text-lg font-normal">
              {idealTalent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
