import JobListBox from '../info/JobListBox.tsx';
import ExitIcon from '../../../assets/svgs/icon/ExitIcon.tsx';
import { useEffect, useState } from 'react';
import BackIcon from '../../../assets/svgs/icon/BackIcon.tsx';
import CheckInfoBox from '../info/CheckInfoBox.tsx';
import TalentBadge from './TalentBadge.tsx';
import { motion } from 'framer-motion';

interface JobListSectionProps {
  companyId: number;
  companyName: string;
  onClose: () => void;
}

type JobCategory = {
  job_category_id: number;
  job_category_name: string;
  extracted_at: string;
};

type JobCategoriesResponse = {
  company_id: number;
  company_name: string;
  job_categories: JobCategory[];
};

type JobTalentResponse = {
  id: number;
  company_id: number;
  company_name: string;
  job_category_id: number;
  job_category_name: string;
  talent_values: {
    overall: {
      keywords: string[];
      description: string;
      details: string[];
    };
    job_specific: {
      keywords: string[];
      description: string;
      details: string[];
      technical_requirements: string[];
    };
  };
  extracted_at: string;
};

export default function JobListSection({
  companyId,
  companyName,
  onClose,
}: JobListSectionProps) {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('access_token');

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [jobList, setJobList] = useState<JobCategory[]>([]);
  const [selectedTalent, setSelectedTalent] =
    useState<JobTalentResponse | null>(null);

  const [isListLoading, setIsListLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const fetchJobCategories = async () => {
      try {
        setIsListLoading(true);

        const res = await fetch(
          `${API_URL}/companies/${companyId}/job-categories`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          }
        );
        const data: JobCategoriesResponse = await res.json();

        if (!res.ok) {
          console.error('직군 목록 조회 실패:', data);
          setJobList([]);
          return;
        }

        setJobList(data.job_categories ?? []);
      } catch (error) {
        console.error('직군 목록 조회 에러:', error);
        setJobList([]);
      } finally {
        setIsListLoading(false);
      }
    };

    fetchJobCategories();
  }, [API_URL, companyId, token]);

  useEffect(() => {
    if (categoryId === null) {
      setSelectedTalent(null);
      return;
    }

    const fetchJobTalent = async () => {
      try {
        setIsDetailLoading(true);

        const res = await fetch(
          `${API_URL}/companies/${companyId}/job-categories/${categoryId}/talent-values`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          }
        );
        const data: JobTalentResponse = await res.json();

        if (!res.ok) {
          console.error('직무별 인재상 조회 실패:', data);
          setSelectedTalent(null);
          return;
        }

        setSelectedTalent(data);
      } catch (error) {
        console.error('직무별 인재상 조회 에러:', error);
        setSelectedTalent(null);
      } finally {
        setIsDetailLoading(false);
      }
    };

    fetchJobTalent();
  }, [API_URL, companyId, categoryId, token]);

  if (categoryId === null) {
    return (
      <div className="inline-flex flex-1 flex-col items-start justify-start gap-5 self-stretch overflow-y-auto px-5 py-7">
        <div className="inline-flex items-start justify-between self-stretch">
          <div className="inline-flex flex-col items-start justify-start gap-3">
            <div className="justify-start text-xl leading-7 font-semibold text-black">
              인재상 보유 직군 목록
            </div>
            <div className="justify-start text-base leading-6 font-normal text-gray-400">
              {companyName}의 직군을 선택하면 해당 직무별 인재상을 확인할 수
              있습니다.
            </div>
          </div>

          <button onClick={onClose} className="cursor-pointer">
            <ExitIcon />
          </button>
        </div>

        {isListLoading ? (
          <div className="py-10 text-sm text-neutral-500">불러오는 중...</div>
        ) : jobList.length === 0 ? (
          <div className="py-10 text-sm text-neutral-500">
            등록된 직군 인재상이 없습니다.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col gap-3 self-stretch"
          >
            {jobList.map((job) => (
              <JobListBox
                key={job.job_category_id}
                name={job.job_category_name}
                onClick={() => {
                  setCategoryId(job.job_category_id);
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col items-start justify-start gap-5 self-stretch overflow-auto px-5 py-7">
      <div className="inline-flex w-full items-start justify-between">
        <div className="flex items-center justify-start gap-2">
          <button
            onClick={() => setCategoryId(null)}
            className="cursor-pointer"
          >
            <BackIcon />
          </button>

          <div className="justify-start text-base leading-6 font-normal text-neutral-600">
            직군 목록으로 돌아가기
          </div>
        </div>

        <button onClick={onClose} className="cursor-pointer">
          <ExitIcon />
        </button>
      </div>

      {isDetailLoading ? (
        <div className="py-10 text-sm text-neutral-500">불러오는 중...</div>
      ) : !selectedTalent ? (
        <div className="py-10 text-sm text-neutral-500">
          직무별 인재상 정보를 불러오지 못했습니다.
        </div>
      ) : (
        <>
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="justify-start text-xl leading-7 font-semibold text-black">
              {selectedTalent.job_category_name}
            </div>
            <div className="justify-start text-sm leading-5 font-normal text-gray-400">
              직무별 인재상 조회
            </div>
          </div>

          <div className="flex flex-col items-start justify-start gap-2.5 self-stretch rounded-xl bg-indigo-400/10 px-5 py-3 outline outline-1 outline-offset-[-1px] outline-indigo-400/30">
            <div className="justify-start text-sm leading-5 font-semibold text-neutral-600">
              {selectedTalent.talent_values.job_specific.description}
            </div>

            <div className="inline-flex flex-wrap items-center justify-start gap-3.5">
              {selectedTalent.talent_values.job_specific.keywords.map(
                (keyword) => (
                  <TalentBadge key={keyword} keyword={keyword} />
                )
              )}
            </div>
          </div>

          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <div className="justify-start text-sm leading-5 font-medium text-neutral-600">
              직무 핵심 역량
            </div>

            {selectedTalent.talent_values.job_specific.details.map(
              (detail, index) => (
                <CheckInfoBox key={`${detail}-${index}`} title={detail} />
              )
            )}
          </div>

          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <div className="justify-start text-sm leading-5 font-medium text-neutral-600">
              기술 요구사항
            </div>

            {selectedTalent.talent_values.job_specific.technical_requirements.map(
              (requirement, index) => (
                <CheckInfoBox
                  key={`${requirement}-${index}`}
                  title={requirement}
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
