import ExitIcon from '../../../assets/svgs/icon/ExitIcon.tsx';
import InfoBox from '../info/InfoBox.tsx';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface CompanyDetailSectionProps {
  onClose: () => void;
  title?: string;
  description?: string;
  imageUrl?: string;
}
export default function CompanyDetailSection({
  title,
  description,
  imageUrl,
  onClose,
}: CompanyDetailSectionProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className="inline-flex flex-1 flex-col items-start justify-start gap-5 self-stretch px-5 py-7">
      <div className="inline-flex items-start justify-between self-stretch">
        <div className="inline-flex flex-col items-start justify-start gap-2">
          <div className="justify-start text-xl leading-7 font-semibold text-black">
            기업 상세 조회
          </div>
          <div className="justify-start text-base leading-6 font-normal text-gray-400">
            기업의 기본 정보를 확인하세요.
          </div>
        </div>
        <button onClick={onClose} className="cursor-pointer">
          <ExitIcon />
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex flex-col items-start justify-start gap-5 self-stretch"
      >
        <InfoBox label="기업명">{title}</InfoBox>
        <InfoBox label="기업 소개">{description}</InfoBox>
        <InfoBox label="기업 홈페이지">
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            홈페이지 보러가기
          </a>
        </InfoBox>
      </motion.div>
    </div>
  );
}
