import { type ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FileModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function FileModal({
  isOpen,
  onClose,
  title,
  children,
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      {/* 모달 컨테이너 */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative"
      >
        {/* 파일 탭 */}
        <div className="absolute -top-6 left-10 h-8 w-40 rounded-t-2xl bg-gray-200 shadow-sm">
          {title && (
            <div className="flex h-full items-center justify-center text-sm font-semibold text-gray-700">
              {title}
            </div>
          )}
        </div>

        {/* 파일 본체 */}
        <div className="h-[420px] w-[720px] rounded-2xl bg-gray-200 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
