import ExitIcon from '../../../assets/svgs/icon/ExitIcon.tsx';
import CheckInfoBox from '../info/CheckInfoBox.tsx';
import TalentBadge from './TalentBadge.tsx';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CompanyTalentSectionProps {
  companyId: number;
  onClose: () => void;
}

type OverallTalentResponse = {
  id: number;
  company_id: number;
  company_name: string;
  extracted_at?: string;
  talent_values: {
    overall: {
      keywords: string[];
      description: string;
      details: string[];
      extracted_at?: string;
    };
  };
};

export default function CompanyTalentSection({
  companyId,
  onClose,
}: CompanyTalentSectionProps) {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('access_token');
  const [data, setData] = useState<OverallTalentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const fetchTalent = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(
          `${API_URL}/companies/${companyId}/talent-values`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          }
        );
        const result = await res.json();

        if (!res.ok) {
          console.error('전사 인재상 조회 실패:', result);
          return;
        }

        setData(result);
      } catch (error) {
        console.error('전사 인재상 조회 에러:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTalent();
  }, [API_URL, companyId, token]);

  const overall = data?.talent_values.overall;

  return (
    <div className="inline-flex flex-1 flex-col items-start justify-start gap-5 self-stretch overflow-y-auto px-5 py-7">
      <div className="inline-flex items-start justify-between self-stretch">
        <div className="inline-flex flex-col items-start justify-start gap-2">
          <div className="text-xl leading-7 font-semibold text-black">
            전사 인재상 조회
          </div>
          <div className="text-base leading-6 font-normal text-gray-400">
            기업이 추구하는 핵심 인재상입니다.
          </div>
        </div>

        <button onClick={onClose} className="cursor-pointer">
          <ExitIcon />
        </button>
      </div>

      {isLoading ? (
        <div className="py-10 text-sm text-neutral-500">불러오는 중...</div>
      ) : !overall ? (
        <div className="py-10 text-sm text-neutral-500">
          인재상 정보를 불러오지 못했습니다.
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex w-full flex-col gap-5 self-stretch"
        >
          <div className="flex flex-col items-start justify-start gap-2.5 self-stretch rounded-xl bg-indigo-400/10 px-5 py-3 outline outline-1 outline-offset-[-1px] outline-indigo-400/30">
            <div className="text-sm leading-5 font-semibold text-neutral-600">
              {overall.description}
            </div>

            <div className="inline-flex flex-wrap items-center justify-start gap-3.5">
              {overall.keywords.map((keyword) => (
                <TalentBadge key={keyword} keyword={keyword} />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <div className="text-sm leading-5 font-medium text-neutral-600">
              세부 인재상
            </div>

            {overall.details.map((detail, index) => (
              <CheckInfoBox key={`${detail}-${index}`} title={detail} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
