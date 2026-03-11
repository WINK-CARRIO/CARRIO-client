import { useEffect, useState } from 'react';
import SideBar from './sidebar/SideBar.tsx';
import CompanyDetailSection from './CompanyDetailSection.tsx';
import CompanyTalentSection from './CompanyTalentSection.tsx';
import JobListSection from './JobListSection.tsx';
import { motion } from 'framer-motion';

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: number;
  companyName: string;
  companyDescription: string;
  companyIndustry: string;
  companyLogoUrl: string;
}

export default function CompanyModal({
  isOpen,
  onClose,
  companyId,
  companyName,
  companyDescription,
  companyIndustry,
  companyLogoUrl,
}: CompanyModalProps) {
  const [activeMenu, setActiveMenu] = useState('company');

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setActiveMenu('company');
    }
  }, [isOpen, companyId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="z-10 flex h-[633px] w-[976px] items-start justify-start gap-5 overflow-hidden rounded-xl bg-white"
      >
        <SideBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

        {activeMenu === 'company' && (
          <CompanyDetailSection
            title={companyName}
            description={companyDescription}
            industry={companyIndustry}
            imageUrl={companyLogoUrl}
            onClose={onClose}
          />
        )}

        {activeMenu === 'talent' && (
          <CompanyTalentSection companyId={companyId} onClose={onClose} />
        )}

        {activeMenu === 'job' && (
          <JobListSection
            companyId={companyId}
            companyName={companyName}
            onClose={onClose}
          />
        )}
      </motion.div>
    </div>
  );
}
