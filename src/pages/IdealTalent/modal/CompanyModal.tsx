import { useEffect, useState } from 'react';
import SideBar from './sidebar/SideBar.tsx';
import CompanyDetailSection from './CompanyDetailSection.tsx';
import CompanyTalentSection from './CompanyTalentSection.tsx';
import JobListSection from './JobListSection.tsx';

interface FileModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  imageUrl?: string;
}

export default function CompanyModal({
  isOpen,
  onClose,
  title,
  description,
  imageUrl,
}: FileModalProps) {
  const [activeMenu, setActiveMenu] = useState('company');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />
      <div className="z-10 flex h-[633px] w-[976px] items-start justify-start gap-5 overflow-hidden rounded-xl bg-white">
        <SideBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        {activeMenu === 'company' && (
          <CompanyDetailSection
            title={title}
            description={description}
            imageUrl={imageUrl}
            onClose={onClose}
          />
        )}
        {activeMenu === 'talent' && <CompanyTalentSection onClose={onClose} />}
        {activeMenu === 'job' && <JobListSection onClose={onClose} />}
      </div>
    </div>
  );
}
